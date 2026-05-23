# Repository Guidelines

## Project Structure & Module Organization
The app is split into a Vite frontend and a small Node backend. Frontend source lives in `src/`: reusable UI in `src/components/`, route sections in `src/sections/<Feature>/`, shared state in `src/context/`, hooks in `src/hooks/`, translations in `src/translations/`, and global styles in `src/styles/`. Static assets go in `public/` or `src/assets/`. The AI API lives in `ai-backend/` with its own `package.json`, `index.js`, and `personal-data.json`. Deployment files are at the repo root: `Dockerfile`, `docker-compose.yml`, and `nginx.conf`.

## Build, Test, and Development Commands
Use the root package for frontend work:

- `npm install`: install frontend dependencies.
- `npm run dev`: start Vite on `http://localhost:5173`.
- `npm run build`: create the production bundle in `dist/`.
- `npm run lint`: run ESLint across `*.js` and `*.jsx`.
- `npm run preview`: serve the production build locally.

For the backend:

- `cd ai-backend && npm install`: install API dependencies.
- `cd ai-backend && node index.js`: start Express on port `4000`.
- `docker compose up --build`: run frontend, backend, and Nginx together on `http://localhost:8085`.

## Coding Style & Naming Conventions
Follow the existing React + ESM style. Use 2-space indentation in JSX blocks, keep components and context providers in PascalCase files such as `Layout.jsx` and `ThemeContext.jsx`, and use descriptive folder names for route sections such as `src/sections/Projects/Projects.jsx`. Keep hooks in `src/hooks/` and export them as focused utilities. Run `npm run lint` before opening a PR; ESLint is the only enforced style tool in this repo.

## Testing Guidelines
There is no automated test suite configured yet. Until one is added, treat `npm run lint` plus manual verification as the minimum gate: check navigation, theme/language toggles, responsive layout, and `/api/chat` behavior. If you add tests, keep them close to the feature using `*.test.jsx` or `*.test.js` naming and document the command in `package.json`.

## Commit & Pull Request Guidelines
Recent commits use short, direct subjects like `update gitignore` and `change name domain`. Keep commits focused, imperative, and limited to one concern. PRs should include a clear summary, note any config or Docker changes, link the related issue when available, and attach screenshots or short recordings for frontend changes.

## Security & Configuration Tips
Do not commit `ai-backend/.env`. Keep `MODEL_NAME`, `LMSTUDIO_URL`, and `PORT` in local environment files only. Treat `ai-backend/personal-data.json` as curated assistant content, not a place for secrets.
