import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import personalData from "./personal-data.json" assert { type: "json" };

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "https://damiancb.com",
  })
);

/* ────────────────────────────────────────────────
   VALIDACIÓN DE VARIABLES DE ENTORNO
────────────────────────────────────────────────── */

const REQUIRED_ENV = ["MODEL_NAME", "LMSTUDIO_URL"];

const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error("❌ ERROR: Faltan variables en el .env:");
  missing.forEach((v) => console.error(" -", v));
  console.error("El servidor no puede iniciarse sin estas variables.");
  process.exit(1);
}

const MODEL_NAME = process.env.MODEL_NAME;
const LMSTUDIO_URL = process.env.LMSTUDIO_URL;
const PORT = process.env.PORT || 4000;

console.log("🔧 Configuración cargada:");
console.log("MODEL_NAME:", MODEL_NAME);
console.log("LMSTUDIO_URL:", LMSTUDIO_URL);
console.log("PORT:", PORT);

/* ────────────────────────────────────────────────
   ENDPOINT PRINCIPAL
────────────────────────────────────────────────── */

app.post("/api/chat", async (req, res) => {
  console.log("📩 POST /api/chat body:", req.body);

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        reply: "Debes enviar un mensaje válido en el campo 'message'.",
      });
    }

    // Llamada a LM Studio
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
                    - Responde SIEMPRE en primera persona
                    - Responde como un humano, no como una estructura de datos
                    - Usa únicamente la información proporcionada
                    - Si no puedes responder, di exactamente:
                    No tengo esa información

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
                    `
          },
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.3,
      }),
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

    res.json({ reply: aiReply });
  } catch (err) {
    console.error("🔥 Error interno:", err);
    res.status(500).json({
      reply: "Error interno del servidor.",
      error: err.message,
    });
  }
});

/* ────────────────────────────────────────────────
   INICIO DEL SERVIDOR
────────────────────────────────────────────────── */

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Servidor de IA corriendo en el puerto ${PORT}`)
);
