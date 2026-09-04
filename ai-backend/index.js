import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { randomUUID } from "node:crypto";
dotenv.config();

import personalData from "./personal-data.json" with { type: "json" };

/* ────────────────────────────────────────────────
   VALIDACIÓN Y CARGA DE VARIABLES DE ENTORNO
────────────────────────────────────────────────── */

const REQUIRED_ENV = ["MODEL_NAME", "LMSTUDIO_URL", "COOKIE_SECRET"];

const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error("❌ ERROR: Faltan variables en el .env:");
  missing.forEach((v) => console.error(" -", v));
  console.error("El servidor no puede iniciarse sin estas variables.");
  process.exit(1);
}

// Helper: entero de entorno con validación y mínimo (cae al default si no es válido)
const envInt = (name, def, min) => {
  const n = Number.parseInt(process.env[name], 10);
  return Number.isFinite(n) && n >= min ? n : def;
};

const MODEL_NAME = process.env.MODEL_NAME;
const LMSTUDIO_URL = process.env.LMSTUDIO_URL;
const PORT = process.env.PORT || 4000;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const COOKIE_SECURE = process.env.COOKIE_SECURE !== "false"; // true por defecto

// Protección de sobrecarga (huella sobre el modelo local compartido)
const AI_MAX_CONCURRENCY = envInt("AI_MAX_CONCURRENCY", 1, 1);
const AI_MAX_QUEUE = envInt("AI_MAX_QUEUE", 3, 0);
const AI_REQUEST_TIMEOUT_MS = envInt("AI_REQUEST_TIMEOUT_MS", 40000, 1000);
const AI_QUEUE_TIMEOUT_MS = envInt("AI_QUEUE_TIMEOUT_MS", 10000, 0);

// Límite por cliente
const AI_RATE_LIMIT_MAX = envInt("AI_RATE_LIMIT_MAX", 6, 1);
const AI_RATE_LIMIT_WINDOW_MS = envInt("AI_RATE_LIMIT_WINDOW_MS", 60 * 60 * 1000, 1000);

console.log("🔧 Configuración cargada:");
console.log("MODEL_NAME:", MODEL_NAME);
console.log("LMSTUDIO_URL:", LMSTUDIO_URL);
console.log("PORT:", PORT);
console.log("AI_MAX_CONCURRENCY:", AI_MAX_CONCURRENCY);
console.log("AI_MAX_QUEUE:", AI_MAX_QUEUE);
console.log("AI_REQUEST_TIMEOUT_MS:", AI_REQUEST_TIMEOUT_MS);
console.log("AI_QUEUE_TIMEOUT_MS:", AI_QUEUE_TIMEOUT_MS);
console.log("AI_RATE_LIMIT_MAX:", AI_RATE_LIMIT_MAX);
console.log("AI_RATE_LIMIT_WINDOW_MS:", AI_RATE_LIMIT_WINDOW_MS);

/* ────────────────────────────────────────────────
   APP Y MIDDLEWARE (el orden importa)
────────────────────────────────────────────────── */

const app = express();

// 1) CORS primero → hasta las respuestas 429/503 llevan cabeceras CORS.
app.use(
  cors({
    origin: "https://damiancb.com",
    credentials: true,
  })
);
// 2) Cookies firmadas (identidad del cliente para el rate limit).
app.use(cookieParser(COOKIE_SECRET));
// 3) Body JSON.
app.use(express.json());

/* ────────────────────────────────────────────────
   PROTECCIÓN DE SOBRECARGA: semáforo + cola acotada

   Único proceso de un solo hilo → un contador + array
   es correcto y sin condiciones de carrera. Garantiza
   que como máximo AI_MAX_CONCURRENCY peticiones lleguen
   a LM Studio a la vez, sin importar cuántos clientes haya.
────────────────────────────────────────────────── */

class Gate {
  constructor({ maxConcurrency, maxQueue }) {
    this.max = maxConcurrency;
    this.maxQueue = maxQueue;
    this.active = 0; // llamadas a LM Studio en vuelo
    this.queue = []; // waiters: { resolve, reject, timer }
  }

  get running() {
    return this.active;
  }
  get pending() {
    return this.queue.length;
  }

  // Resuelve cuando se tiene un slot; rechaza con .code QUEUE_FULL | QUEUE_TIMEOUT.
  acquire(queueTimeoutMs) {
    if (this.active < this.max) {
      this.active++;
      return Promise.resolve();
    }
    if (this.queue.length >= this.maxQueue) {
      return Promise.reject(
        Object.assign(new Error("busy"), { code: "QUEUE_FULL" })
      );
    }
    return new Promise((resolve, reject) => {
      const waiter = { resolve, reject, timer: null };
      waiter.timer = setTimeout(() => {
        const i = this.queue.indexOf(waiter);
        if (i !== -1) this.queue.splice(i, 1);
        reject(Object.assign(new Error("busy"), { code: "QUEUE_TIMEOUT" }));
      }, queueTimeoutMs);
      this.queue.push(waiter);
    });
  }

  release() {
    const next = this.queue.shift();
    if (next) {
      clearTimeout(next.timer);
      next.resolve(); // traspasa el slot: active no cambia
    } else {
      this.active--;
    }
  }
}

const gate = new Gate({
  maxConcurrency: AI_MAX_CONCURRENCY,
  maxQueue: AI_MAX_QUEUE,
});

/* ────────────────────────────────────────────────
   LÍMITE POR CLIENTE (cookie firmada, 6/hora por defecto)
────────────────────────────────────────────────── */

// Asegura una identidad estable ANTES de que el limitador lea la clave.
function ensureClientId(req, res, next) {
  let cid = req.signedCookies?.cid; // las cookies firmadas viven en signedCookies
  if (!cid) {
    cid = randomUUID();
    res.cookie("cid", cid, {
      httpOnly: true, // JS del navegador no puede leerla/manipularla
      signed: true, // a prueba de manipulación
      sameSite: "lax",
      secure: COOKIE_SECURE, // requiere HTTPS (poner COOKIE_SECURE=false para dev local)
      maxAge: 7 * 24 * 60 * 60 * 1000, // sobrevive a la ventana del límite
      path: "/api",
    });
  }
  req.cid = cid;
  next();
}

const chatLimiter = rateLimit({
  windowMs: AI_RATE_LIMIT_WINDOW_MS,
  limit: AI_RATE_LIMIT_MAX,
  standardHeaders: "draft-6", // cabeceras RateLimit-* discretas (el front lee RateLimit-Remaining)
  legacyHeaders: false,
  keyGenerator: (req) => req.cid, // keyeamos por cookie, no por IP
  validate: { trustProxy: false, xForwardedForHeader: false }, // no usamos IP → silenciar avisos
  handler: (req, res) =>
    res.status(429).json({
      reply: "Has alcanzado el límite de preguntas por ahora. Inténtalo más tarde.",
    }),
});

/* ────────────────────────────────────────────────
   ENDPOINT PRINCIPAL
────────────────────────────────────────────────── */

app.post("/api/chat", ensureClientId, chatLimiter, async (req, res) => {
  const { message } = req.body;

  // 1) Validación ANTES de tomar un slot (un 400 no debe consumir capacidad).
  if (!message || typeof message !== "string") {
    return res.status(400).json({
      reply: "Debes enviar un mensaje válido en el campo 'message'.",
    });
  }

  // 2) Adquirir un slot, encolar, o descartar carga (503).
  try {
    await gate.acquire(AI_QUEUE_TIMEOUT_MS);
  } catch (e) {
    console.warn(
      `⏳ Carga descartada (${e.code}) running=${gate.running} pending=${gate.pending}`
    );
    res.set("Retry-After", "10");
    return res.status(503).json({
      reply:
        "El asistente está atendiendo muchas consultas ahora mismo. Prueba de nuevo en unos segundos.",
    });
  }

  // 3) Tenemos un slot → hay que liberarlo SIEMPRE (finally).
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT_MS);

  // Si el cliente se desconecta, aborta y libera el slot cuanto antes.
  let clientGone = false;
  res.on("close", () => {
    if (!res.writableEnded) {
      clientGone = true;
      controller.abort();
    }
  });

  try {
    const response = await fetch(LMSTUDIO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: "system",
            content: `
                    Eres un asistente que actúa como el representante personal del dueño del portfolio.

                    INSTRUCCIONES:
                    - Responde SIEMPRE en el mismo idioma en el que el usuario escribió su pregunta
                    - Responde SIEMPRE en primera persona
                    - Responde como un humano, no como una estructura de datos
                    - Usa únicamente la información proporcionada
                    - Si no puedes responder, di exactamente "No tengo esa información" en el idioma de la pregunta

                    FORMATO:
                    - 1 o 2 frases
                    - Texto natural y continuo

                    EJEMPLOS:

                    Pregunta: ¿Qué tecnologías usas?
                    Respuesta: Trabajo con React, Vite y TailwindCSS en el frontend, y con Node.js, Docker y Linux para desarrollo y despliegue.

                    Pregunta: ¿En qué empresa trabajas actualmente?
                    Respuesta: No tengo esa información

                    Información del usuario:
                    ${JSON.stringify(personalData, null, 2)}
                    `,
          },
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.3,
      }),
      signal: controller.signal,
    });

    // Si LM Studio responde con error (500, 404, etc.)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ LM Studio devolvió un error:");
      console.error(errorText);

      return res.status(500).json({
        reply: "La IA devolvió un error.",
        details: errorText,
      });
    }

    // Asegurar JSON válido
    let data;
    const raw = await response.text();

    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error("❌ LM Studio devolvió algo que NO es JSON:");
      console.error(raw);

      return res.status(500).json({
        reply: "La IA no devolvió un JSON válido.",
        raw,
      });
    }

    const aiReply =
      data?.choices?.[0]?.message?.content ||
      "La IA no envió una respuesta comprendida.";

    return res.json({ reply: aiReply });
  } catch (err) {
    // El cliente ya se fue: no se puede (ni hace falta) escribir la respuesta.
    if (clientGone) return;

    if (err.name === "AbortError" || controller.signal.aborted) {
      console.error("⏱️ Timeout hacia LM Studio");
      return res.status(504).json({
        reply: "La IA tardó demasiado en responder. Inténtalo de nuevo.",
      });
    }

    console.error("🔥 Error interno:", err);
    return res.status(500).json({
      reply: "Error interno del servidor.",
      error: err.message,
    });
  } finally {
    clearTimeout(timer);
    gate.release(); // libera SIEMPRE el slot
  }
});

// Endpoint de salud / observabilidad de la cola
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", running: gate.running, pending: gate.pending });
});

/* ────────────────────────────────────────────────
   INICIO DEL SERVIDOR
────────────────────────────────────────────────── */

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Servidor de IA corriendo en el puerto ${PORT}`)
);
