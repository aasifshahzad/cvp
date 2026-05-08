# CVP Project — Complete Command Reference

> All commands, shortcuts, and URLs used across the backend, frontend, security auditing, VS Code task runner, and monorepo setup.

---

## ⚙️ Backend — Python / FastAPI / UV

| Command | What it does |
|---------|--------------|
| `uv sync` | Installs all Python dependencies from `pyproject.toml` into the virtual environment. Run after pulling new backend changes. |
| `.venv\Scripts\activate.bat` | Activates the Python virtual environment on Windows. Required before running backend commands manually. |
| `uv run fastapi dev` | Starts FastAPI dev server with hot reload. Backend runs at `http://localhost:8000`. |
| `uv run fastapi dev --port 8001` | Starts backend on a custom port if 8000 is already in use. |
| `uv add <package>` | Adds a new Python package and updates `pyproject.toml` automatically. |
| `uv remove <package>` | Removes a Python package from the project. |
| `uv run alembic upgrade head` | Runs all pending database migrations. Run after pulling changes that include new models. |
| `uv run alembic revision --autogenerate -m "msg"` | Creates a new migration file based on model changes. |

---

## 🖥️ Frontend — React / Vite / npm

| Command | What it does |
|---------|--------------|
| `npm install` | Installs all frontend dependencies from `package.json`. Run once after cloning or pulling changes. |
| `npm run dev` | Starts Vite dev server with hot reload. Frontend runs at `http://localhost:3000`. |
| `npm run build` | Compiles and bundles frontend for production. Output goes to `dist/` folder. |
| `npm run preview` | Serves the production build locally to test before deploying. Runs at `http://localhost:4173`. |
| `npm run lint` | Runs Biome linting and formatting checks across all frontend files. |
| `npm run generate-client` | Generates TypeScript API client from backend OpenAPI schema. Run whenever backend routes or models change. **Requires backend running.** |
| `npm install <package>` | Adds a new runtime dependency to the frontend project. |
| `npm install <package> --save-dev` | Adds a new development-only dependency (build tools, type packages, etc.). |
| `npm uninstall <package>` | Removes a package from the project. |

---

## 🛡️ Security — npm audit

| Command | What it does |
|---------|--------------|
| `npm audit` | Scans all installed packages for known vulnerabilities. Shows severity and affected packages. |
| `npm audit fix` | Automatically fixes vulnerabilities that don't require breaking changes. ✅ Safe to run anytime. |
| `npm audit fix --force` | Fixes all vulnerabilities including major version upgrades. ⚠️ May break things — test afterward. |
| `npm list <package>` | Shows the installed version of a specific package and its position in the dependency tree. |

---

## 💻 VS Code — Keyboard Shortcuts

| Shortcut | What it does |
|----------|--------------|
| `Ctrl + Shift + B` | Runs the default build task — starts both backend and frontend and opens the browser. |
| `Ctrl + Shift + P` | Opens the Command Palette — main way to access all VS Code commands. |
| `Ctrl + Shift + P` → `Tasks: Run Task` | Shows all available tasks — Start Backend, Start Frontend, Generate API Client, Restart tasks. |
| `Ctrl + Shift + G` | Custom shortcut to run Generate API Client instantly (if configured in `keybindings.json`). |
| `F5` | Opens Run and Debug panel — launch frontend or API docs in Chrome via `launch.json`. |
| `` Ctrl + ` `` | Toggles the integrated terminal. Use tabs to switch between Backend and Frontend output. |
| `Ctrl + C` (in terminal) | Stops the currently running process in that terminal tab. |
| `Ctrl + Shift + X` | Opens the Extensions panel to install or manage VS Code extensions. |

---

## 🏠 Root Monorepo — package.json Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` *(from root)* | Starts both backend and frontend together using concurrently. Color-coded output in a single terminal. |
| `npm run dev:backend` | Starts only the backend server from the root folder. |
| `npm run dev:frontend` | Starts only the frontend server from the root folder. |
| `npm run generate-client` *(from root)* | Runs API client generator from root level — no need to `cd` into the frontend folder. |

---

## 🌐 Important URLs

| URL | What you see |
|-----|--------------|
| `http://localhost:3000` | Frontend React application — your main development URL. |
| `http://localhost:8000/docs` | FastAPI Swagger UI — interactive API docs. Test all endpoints directly in the browser. |
| `http://localhost:8000/redoc` | ReDoc API documentation — cleaner read-only view of all endpoints and schemas. |
| `http://localhost:8000/openapi.json` | Raw OpenAPI schema JSON — what the client generator reads to produce `src/client/` files. |

---

> **Tip:** Run `npm run generate-client` whenever backend routes or models change. Keep `.env` files in both `cvp_backend/` and `cvp_frontend/` for correct local configuration.
