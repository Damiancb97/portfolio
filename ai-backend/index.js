import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import personalData from "./personal-data.json" assert { type: "json" };

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://damiancb.com",
}));


const LMSTUDIO_URL =
  process.env.LMSTUDIO_URL || "http://127.0.0.1:1234/v1/chat/completions";
  

app.post("/api/chat", async (req, res) => {
  console.log("POST /api/chat called with body:", req.body); // <-- logging

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No se envió ningún mensaje." });
    }

    const response = await fetch(LMSTUDIO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "microsoft/phi-4-mini-reasoning",
        messages: [
          {
            role: "system",
            content: `
Eres un asistente que responde exclusivamente acerca del dueño del portfolio.
Si no existe la información, responde: "No tengo esa información".

Información del usuario:
${JSON.stringify(personalData, null, 2)}
            `,
          },
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.3,
      }),
    });

    const json = await response.json();
    console.log("LM Studio response:", json); // <-- logging de la respuesta

    const aiReply = json?.choices?.[0]?.message?.content || "No hay respuesta del modelo";
    res.json({ reply: aiReply });
  } catch (err) {
    console.error("Error connecting to LM Studio:", err);
    res.status(500).json({ reply: "Error: no se pudo conectar con la IA." });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => console.log("AI server running on port", PORT));
