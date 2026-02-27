# Portfolio — Damián Costa Blanco

Sitio web de portfolio personal con chat de IA integrado, desplegado en [damiancb.com](https://damiancb.com).

## Stack

**Frontend**
- React 19 + React Router 7
- Vite 7
- Tailwind CSS 4

**Backend** (`ai-backend/`)
- Node.js + Express 5
- LM Studio (modelo local `liquid/lfm2-1.2b`)

**Infraestructura**
- Docker + Docker Compose
- Nginx (reverse proxy + SPA serving)

## Desarrollo local

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd ai-backend
# Configurar ai-backend/.env con MODEL_NAME, LMSTUDIO_URL y PORT
node index.js
```

### Full stack con Docker

```bash
docker compose up --build
```

La app queda disponible en `http://localhost:8085`.

## Variables de entorno

Crear `ai-backend/.env`:

```env
MODEL_NAME=liquid/lfm2-1.2b
LMSTUDIO_URL=http://172.19.0.1:1234/v1/chat/completions
PORT=4000
```

> `LMSTUDIO_URL` apunta al host desde dentro del contenedor Docker. Ajustar según el entorno.
