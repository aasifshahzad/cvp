# Homeopathy Clinic Management Software - Frontend

The frontend is built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [TanStack Query](https://tanstack.com/query), [TanStack Router](https://tanstack.com/router) and [Tailwind CSS](https://tailwindcss.com/).

## Quick Start

From the `cvp_frontend` directory:

```bash
cd f:\2_PROJECTS\B2_CVP\cvp\cvp_frontend
```

1. Install Node (recommended via `fnm` or `nvm`)
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser at:

```text
http://localhost:5173
```

## Node Version Management

The project includes an `.nvmrc` file. If you use `fnm` or `nvm`, install and use the version from that file:

```bash
# If using fnm
fnm install
fnm use

# If using nvm
nvm install
nvm use
```

## Available Scripts

```bash
npm run dev          # Start Vite development server
npm run build        # Build production assets
npm run preview      # Preview the production build locally
npm run lint         # Run Biome linting and formatting checks
npm run generate-client  # Generate OpenAPI client from backend schema
```

## Environment Configuration

The frontend supports `VITE_API_URL` to point to the backend API. Create or update `cvp_frontend/.env` with:

```env
VITE_API_URL=http://localhost:8000
```

If not set, the app will use the default API configuration defined in the frontend code.

## API Client Generation

The frontend uses `openapi-ts` to generate the API client.

### Automatic generation

1. Make sure the backend is running and exposes OpenAPI schema.
2. Run:

```bash
npm run generate-client
```

3. Commit generated client files if your API schema changed.

## Project Structure

* `src/` - Main application source code
* `src/client/` - Generated OpenAPI client and API service wrappers
* `src/components/` - Reusable UI components
* `src/hooks/` - Custom React hooks
* `src/routes/` - App route definitions and page components
* `src/assets/` - Static assets
* `tests/` - End-to-end and integration tests

## Playwright Testing

To run Playwright tests, ensure the backend API is available. This can be a local backend instance or a Docker-based backend.

```bash
npx playwright test
```

To run tests in interactive UI mode:

```bash
npx playwright test --ui
```

## Notes

* This README targets the frontend code inside the `cvp_frontend` folder.
* Local development with `npm run dev` is the recommended workflow.
* If you need to use a remote backend, set `VITE_API_URL` in `.env`.

## Useful Files

* `package.json` - frontend dependencies and scripts
* `tsconfig.json` / `tsconfig.build.json` - TypeScript configuration
* `vite.config.ts` - Vite build and dev server config
* `openapi-ts.config.ts` - OpenAPI client generation config
* `.env` and `.env.production` - environment-specific frontend settings
