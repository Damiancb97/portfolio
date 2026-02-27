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

---

## Desarrollo local (sin Docker)

### Frontend

```bash
npm install
npm run dev        # http://localhost:5173
```

### Backend

```bash
cd ai-backend
# Asegurarse de tener ai-backend/.env configurado
node index.js      # http://localhost:4000
```

> En desarrollo local el frontend llama a `/api/chat`, pero Vite no tiene proxy configurado, así que hay que añadir uno en `vite.config.js` o levantar todo con Docker.

---

## Docker

### Levantar todo

```bash
docker compose up --build        # build + start en foreground
docker compose up --build -d     # build + start en background
```

La app queda disponible en **`http://localhost:8085`**.

### Parar

```bash
docker compose down
```

### Ver logs

```bash
docker compose logs -f           # todos los servicios
docker compose logs -f api       # solo backend
docker compose logs -f web       # solo frontend/nginx
```

### Cómo funciona Docker en este proyecto

```
┌─────────────────────────────────────────────┐
│              Docker Compose                 │
│                                             │
│  ┌─────────────┐      ┌─────────────────┐  │
│  │  portfolio  │      │  portfolio_web  │  │
│  │    _api     │◄─────│  (Nginx :80)    │  │
│  │ (Node :4000)│      │                 │  │
│  └─────────────┘      └────────┬────────┘  │
│         ▲                      │ :8085      │
│         │                      │            │
└─────────┼──────────────────────┼────────────┘
          │                      │
    LM Studio               Navegador
  (host :1234)          http://localhost:8085
```

**`portfolio_web`** — imagen multi-stage:
1. `node:20-alpine` ejecuta `npm run build` → genera `dist/`
2. `nginx:alpine` sirve `dist/` como sitio estático
3. Nginx redirige cualquier ruta a `index.html` (necesario para React Router)
4. Las peticiones a `/api/*` las proxea internamente a `portfolio_api:4000`

**`portfolio_api`** — imagen Node:
1. Instala solo dependencias de producción (`npm ci --omit=dev`)
2. Arranca `node index.js` en el puerto 4000
3. Solo es accesible desde dentro de la red Docker (no expone puerto al host)
4. Se comunica con LM Studio en el host a través de `host.docker.internal` (mapeado en `extra_hosts`)

### Archivos clave de infraestructura

| Archivo | Propósito |
|---|---|
| `docker-compose.yml` | Define los dos servicios y su red |
| `Dockerfile` | Build del frontend (Vite → Nginx) |
| `ai-backend/Dockerfile` | Build del backend (Node) |
| `nginx.conf` | Config de Nginx: SPA fallback + proxy `/api` |
| `ai-backend/.env` | Variables de entorno del backend (no en git) |

---

## Variables de entorno

Crear `ai-backend/.env`:

```env
MODEL_NAME=liquid/lfm2-1.2b
LMSTUDIO_URL=http://172.19.0.1:1234/v1/chat/completions
PORT=4000
```

> `172.19.0.1` es la IP del host desde dentro de la red Docker en Linux. En Mac/Windows usar `host.docker.internal`.
