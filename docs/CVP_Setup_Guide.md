# CVP Project — New Developer Setup Guide

> From zero to running — complete installation steps for cloning and running the project locally.

---

## Prerequisites

Install these tools before cloning the repo. All are required.

| Requirement         | Version / Notes                | Check command      |
| ------------------- | ------------------------------ | ------------------ |
| Git                 | Any recent version             | `git --version`    |
| Python              | 3.12 recommended               | `python --version` |
| uv (Python pkg mgr) | Latest                         | `uv --version`     |
| Node.js             | v18 or higher (use fnm/nvm)    | `node --version`   |
| npm                 | Comes with Node.js             | `npm --version`    |
| PostgreSQL          | v14 or higher, running locally | `psql --version`   |
| VS Code             | Latest (recommended)           | `code --version`   |

> ⚠️ **uv is not pip.** Install it separately. On Windows run:
>
> ```powershell
> powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
> ```

---

## Step 1 — Clone the repository

```bash
git clone https://github.com/aasifshahzad/cvp.git
cd cvp
```

You will see this structure after cloning:

```
cvp/
├── cvp_backend/       ← FastAPI Python backend
├── cvp_frontend/      ← React TypeScript frontend
├── .vscode/           ← VS Code tasks and settings
├── cvp.code-workspace ← Open this in VS Code
├── package.json       ← Root monorepo scripts
└── README.md
```

---

## Step 2 — Open in VS Code as a Workspace

Always open the project using the workspace file — not just the folder. This gives you correct Python interpreter paths and separate Backend / Frontend views in the sidebar.

```bash
code cvp.code-workspace
```

Or in VS Code: **File → Open Workspace from File → select `cvp.code-workspace`**

---

## Step 3 — Configure backend environment

Create the `.env` file inside `cvp_backend/`. This file is **NOT committed to git** — you must create it manually.

**File location:** `cvp/cvp_backend/.env`

```env
PROJECT_NAME=PMS Backend

# Database
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password_here
POSTGRES_DB=pms_db
POSTGRES_PORT=5432

# Security
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000","http://localhost:5173"]

# Email (optional for local dev)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
EMAILS_FROM_EMAIL=noreply@example.com
```

> ⚠️ Replace `your_password_here` with your actual PostgreSQL password.

---

## Step 4 — Install backend dependencies

```bash
cd cvp_backend
uv sync
```

`uv sync` reads `pyproject.toml` and installs all Python dependencies into a local `.venv` folder automatically. This replaces `pip install -r requirements.txt`.

---

## Step 5 — Run database migrations

This creates all the required tables in your PostgreSQL database.

```bash
# Still inside cvp_backend/
uv run alembic upgrade head
```

> ✅ You should see a series of `Running upgrade ...` messages ending without errors.

---

## Step 6 — Start the backend server

```bash
# Still inside cvp_backend/
uv run fastapi dev
```

> ✅ Backend is ready when you see: `Uvicorn running on http://0.0.0.0:8000`

Verify it works: open `http://localhost:8000/docs` in your browser — you should see the Swagger UI.

---

## Step 7 — Configure frontend environment

Create the `.env` file inside `cvp_frontend/`. This file is also **NOT committed to git**.

**File location:** `cvp/cvp_frontend/.env`

```env
VITE_API_URL=http://localhost:8000
```

---

## Step 8 — Install frontend dependencies

```bash
cd ../cvp_frontend
npm install
```

This installs all React, TypeScript, Vite, TanStack, and Tailwind packages from `package.json`.

---

## Step 9 — Generate the API client

This generates fully-typed TypeScript functions from the backend OpenAPI schema. The backend must be running for this step.

```bash
# Backend must be running on http://localhost:8000
npm run generate-client
```

> ✅ Success: 5 files generated in `src/client/`

---

## Step 10 — Start the frontend

```bash
npm run dev
```

> ✅ Frontend is ready when you see: `Local: http://localhost:3000/`

---

## Daily Development Workflow

Once the above steps are done once, your daily workflow is just:

```bash
# Option A — One command from repo root (recommended)
cd cvp
npm run dev

# Option B — VS Code shortcut
# Open cvp.code-workspace → Press Ctrl+Shift+B
```

> 💡 Run `npm run generate-client` (from `cvp_frontend/`) every time backend routes or models change.

---

## Verify Everything is Working

| URL                                  | What you should see                       |
| ------------------------------------ | ----------------------------------------- |
| `http://localhost:3000`              | React frontend — login page               |
| `http://localhost:8000/docs`         | FastAPI Swagger UI — all API endpoints    |
| `http://localhost:8000/redoc`        | ReDoc API documentation                   |
| `http://localhost:8000/openapi.json` | Raw JSON schema (used by generate-client) |

---

## Common Errors & Fixes

### Backend won't start — missing env vars

```
ValidationError: PROJECT_NAME / POSTGRES_SERVER / POSTGRES_USER Field required
```

**Cause:** `cvp_backend/.env` file is missing or empty.  
**Fix:** Create the `.env` file as shown in Step 4.

---

### Frontend shows blank page

```
White screen at http://localhost:3000
```

**Cause:** `VITE_API_URL` missing in `cvp_frontend/.env`, or `routeTree.gen.ts` not generated.  
**Fix:** Create `cvp_frontend/.env` with `VITE_API_URL=http://localhost:8000`, then restart `npm run dev`.

---

### generate-client fails with 500

```
Request failed with status 500: fetch failed
```

**Cause:** Backend is not running or `.env` is misconfigured.  
**Fix:** Start the backend first with `uv run fastapi dev`, then run `generate-client`.

---

### npm vulnerabilities after install

```
N vulnerabilities (X high, Y critical)
```

**Cause:** Outdated packages in dependency tree.  
**Fix:** Run `npm audit fix` first. Then `npm install @hey-api/openapi-ts@0.97.1 --save-dev` for remaining ones.

---

### Port 3000 already in use

```
Error: Port 3000 is already in use
```

**Cause:** Another process is using port 3000.  
**Fix:** Kill the other process or change port in `vite.config.ts` → `server.port` setting.

---

### alembic upgrade fails

```
connection refused / password authentication failed
```

**Cause:** PostgreSQL not running or wrong credentials in `.env`.  
**Fix:** Start the PostgreSQL service and verify `POSTGRES_PASSWORD` in `.env` matches your database password.

---

> For questions, open an issue at [https://github.com/aasifshahzad/cvp/issues](https://github.com/aasifshahzad/cvp/issues)
