# Frontend Migration Guide

## From Manual API Calls → Generated Client

> For frontend developers migrating from direct `axios`/`fetch` calls to the auto-generated `@hey-api` OpenAPI client.

---

## Table of Contents

1. [What Changed and Why](#1-what-changed-and-why)
2. [Project Structure](#2-project-structure)
3. [Setup & Configuration](#3-setup--configuration)
4. [Migration Patterns — Side by Side](#4-migration-patterns--side-by-side)
   - [GET requests](#41-get-requests)
   - [POST requests](#42-post-requests)
   - [PUT / PATCH requests](#43-put--patch-requests)
   - [DELETE requests](#44-delete-requests)
   - [With TanStack Query](#45-with-tanstack-query)
   - [Authentication](#46-authentication)
   - [Error handling](#47-error-handling)
5. [Finding the Right Function](#5-finding-the-right-function)
6. [TypeScript Benefits](#6-typescript-benefits)
7. [What NOT to Do](#7-what-not-to-do)
8. [Workflow Going Forward](#8-workflow-going-forward)
9. [Quick Reference Cheatsheet](#9-quick-reference-cheatsheet)

---

## 1. What Changed and Why

### Before (old approach)

You wrote API calls by hand — hardcoded URLs, manual types, no compile-time safety:

```ts
// ❌ Old approach
const res = await axios.get("http://localhost:8000/patients/");
const data = res.data; // type: any — no autocomplete, no safety
```

Problems with this:

- **Silent failures** — if the backend renames a field, the frontend breaks at runtime, not compile time
- **Duplicated types** — you wrote TypeScript interfaces manually that duplicated what already existed in FastAPI models
- **Hardcoded URLs** — one typo in a string and it's broken, with no IDE warning
- **Manual auth headers** — you had to remember to pass the token on every request

### After (generated client)

The backend's OpenAPI schema is used to auto-generate typed functions:

```ts
// ✅ New approach
import { PatientsService } from "@/client";
const { data } = await PatientsService.readPatients();
// data is fully typed — IDE autocompletes every field, TypeScript catches mismatches
```

Benefits:

- **Type safety** — response shapes come directly from the backend schema
- **No hardcoded URLs** — each endpoint is a named function
- **Auth handled globally** — token is attached automatically to every request
- **Always in sync** — run `npm run generate-client` after any backend change

---

## 2. Project Structure

After running `npm run generate-client`, the following files are created in `src/client/`:

```
src/client/
├── index.ts          ← re-exports everything — import from here
├── sdk.gen.ts        ← all service functions (PatientsService, CasesService, etc.)
├── types.gen.ts      ← all TypeScript types (Patient, Case, Prescription, etc.)
├── schemas.gen.ts    ← Zod schemas (if configured)
└── @tanstack/        ← TanStack Query hooks (if configured)
```

**Always import from `@/client`** — not from individual files:

```ts
// ✅ Correct
import { PatientsService, type Patient } from "@/client";

// ❌ Avoid — internal paths may change on regeneration
import { PatientsService } from "@/client/sdk.gen";
```

---

## 3. Setup & Configuration

The client is already configured in `main.tsx`. You do not need to set up anything per-component.

```ts
// main.tsx — already configured, do not duplicate this
OpenAPI.BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
OpenAPI.TOKEN = async () => localStorage.getItem("access_token") || "";
```

This means:

- Every request automatically goes to the correct backend URL
- Every request automatically includes the JWT token from localStorage
- You never manually set `Authorization` headers or base URLs in your components

---

## 4. Migration Patterns — Side by Side

### 4.1 GET requests

**Fetching a list:**

```ts
// ❌ Old
const res = await axios.get("/patients/");
const patients = res.data; // any[]

// ✅ New
import { PatientsService } from "@/client";
const { data: patients } = await PatientsService.readPatients();
// patients is Patient[] — fully typed
```

**Fetching a single record by ID:**

```ts
// ❌ Old
const res = await axios.get(`/patients/${id}`);
const patient = res.data;

// ✅ New
const { data: patient } = await PatientsService.readPatient({ patientId: id });
```

**With query parameters:**

```ts
// ❌ Old
const res = await axios.get("/patients/", {
  params: { skip: 0, limit: 20, search: "ali" },
});

// ✅ New
const { data } = await PatientsService.readPatients({
  skip: 0,
  limit: 20,
  search: "ali",
});
// Parameters are typed — IDE tells you what's available
```

---

### 4.2 POST requests

**Creating a new record:**

```ts
// ❌ Old
const res = await axios.post("/patients/", {
  name: "Ahmed Khan",
  dob: "1990-01-01",
  gender: "male",
});
const newPatient = res.data;

// ✅ New
import { PatientsService, type PatientCreate } from "@/client";

const payload: PatientCreate = {
  name: "Ahmed Khan",
  dob: "1990-01-01",
  gender: "male",
};
const { data: newPatient } = await PatientsService.createPatient({
  requestBody: payload,
});
// TypeScript will error if you miss a required field or use the wrong type
```

---

### 4.3 PUT / PATCH requests

```ts
// ❌ Old
const res = await axios.put(`/patients/${id}`, { name: "Updated Name" });

// ✅ New
import { PatientsService, type PatientUpdate } from "@/client";

const { data: updated } = await PatientsService.updatePatient({
  patientId: id,
  requestBody: { name: "Updated Name" },
});
```

---

### 4.4 DELETE requests

```ts
// ❌ Old
await axios.delete(`/patients/${id}`);

// ✅ New
await PatientsService.deletePatient({ patientId: id });
```

---

### 4.5 With TanStack Query

This is how most data fetching should be done in components — not raw `await` calls.

**useQuery (fetching data):**

```ts
// ❌ Old
const { data, isLoading } = useQuery({
  queryKey: ["patients"],
  queryFn: async () => {
    const res = await axios.get("/patients/");
    return res.data;
  },
});

// ✅ New
import { PatientsService } from "@/client";

const { data, isLoading } = useQuery({
  queryKey: ["patients"],
  queryFn: () => PatientsService.readPatients(),
});
// data.data is Patient[] — no manual typing needed
```

**useMutation (creating / updating / deleting):**

```ts
// ❌ Old
const mutation = useMutation({
  mutationFn: async (payload: any) => {
    const res = await axios.post("/patients/", payload);
    return res.data;
  },
});

// ✅ New
import { PatientsService, type PatientCreate } from "@/client";

const mutation = useMutation({
  mutationFn: (payload: PatientCreate) =>
    PatientsService.createPatient({ requestBody: payload }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["patients"] });
  },
});

// Usage in component:
mutation.mutate({ name: "Ahmed Khan", dob: "1990-01-01", gender: "male" });
```

---

### 4.6 Authentication

**Login — getting the token:**

```ts
// ❌ Old
const res = await axios.post("/login/access-token", formData);
localStorage.setItem("access_token", res.data.access_token);

// ✅ New
import { LoginService } from "@/client";

const { data } = await LoginService.loginAccessToken({
  requestBody: { username: email, password },
});
localStorage.setItem("access_token", data.access_token);
```

**All other requests — nothing changes.** The token is attached automatically by the `OpenAPI.TOKEN` configuration in `main.tsx`. You do not add Authorization headers anywhere else.

**Logout:**

```ts
// Same as before — just clear the token
localStorage.removeItem("access_token");
window.location.href = "/login";
```

---

### 4.7 Error handling

**Global error handling** is already set up in `main.tsx` for 401/403. For other errors, handle them per-mutation or per-query:

```ts
// ❌ Old
try {
  const res = await axios.post("/patients/", payload);
} catch (err: any) {
  console.error(err.response?.data?.detail);
}

// ✅ New
import { ApiError } from "@/client";

const mutation = useMutation({
  mutationFn: (payload: PatientCreate) =>
    PatientsService.createPatient({ requestBody: payload }),
  onError: (error) => {
    if (error instanceof ApiError) {
      console.error(error.status); // HTTP status code
      console.error(error.message); // error message
      console.error(error.body); // full error response body
    }
  },
});
```

---

## 5. Finding the Right Function

The generated client organises functions by the backend's route tags. The naming pattern is:

```
{TagName}Service.{operationName}()
```

**Examples:**

| Backend route                  | Tag           | Generated function                          |
| ------------------------------ | ------------- | ------------------------------------------- |
| `GET /patients/`               | Patients      | `PatientsService.readPatients()`            |
| `POST /patients/`              | Patients      | `PatientsService.createPatient()`           |
| `GET /patients/{id}`           | Patients      | `PatientsService.readPatient()`             |
| `POST /cases/`                 | Cases         | `CasesService.createCase()`                 |
| `GET /appointments/`           | Appointments  | `AppointmentsService.readAppointments()`    |
| `POST /prescriptions/`         | Prescriptions | `PrescriptionsService.createPrescription()` |
| `POST /login/access-token`     | Login         | `LoginService.loginAccessToken()`           |
| `GET /reports/patient-history` | Reports       | `ReportsService.getPatientHistory()`        |

**How to discover functions quickly:**

1. Open `src/client/sdk.gen.ts`
2. Search (`Ctrl+F`) for the resource name e.g. `patient`, `case`, `medicine`
3. Or in any component file, type `PatientsService.` and let IDE autocomplete show all available functions

---

## 6. TypeScript Benefits

### Autocomplete on response data

```ts
const { data } = await PatientsService.readPatient({ patientId: id });

data.name; // ✅ string
data.dob; // ✅ string
data.gender; // ✅ "male" | "female" | "other"
data.nonExistent; // ❌ TypeScript error — caught immediately
```

### Required fields enforced on create

```ts
const { data } = await PatientsService.createPatient({
  requestBody: {
    name: "Ahmed",
    // dob missing ← TypeScript error: Property 'dob' is missing
  },
});
```

### Importing types for forms and state

```ts
import type { Patient, PatientCreate, PatientUpdate, Case, Prescription } from "@/client"

// Use in component state
const [patient, setPatient] = useState<Patient | null>(null)

// Use in form handlers
const handleSubmit = (data: PatientCreate) => { ... }
```

---

## 7. What NOT to Do

```ts
// ❌ Don't import axios directly in components anymore
import axios from "axios";

// ❌ Don't hardcode the base URL
const res = await axios.get("http://localhost:8000/patients/");

// ❌ Don't manually set Authorization headers
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// ❌ Don't write manual TypeScript interfaces that duplicate backend models
interface Patient {
  id: string;
  name: string;
  // ...
}

// ❌ Don't import from internal client files
import { PatientsService } from "@/client/sdk.gen";

// ✅ Do all of this instead
import { PatientsService, type Patient } from "@/client";
```

---

## 8. Workflow Going Forward

### When backend adds a new endpoint

```bash
# 1. Backend developer adds new route and model
# 2. You regenerate the client
npm run generate-client   # run from cvp_dashboard/

# 3. New service function is immediately available
import { NewService } from "@/client"
```

### When backend renames a field

```bash
# 1. Backend renames a field e.g. patient_name → full_name
# 2. You regenerate the client
npm run generate-client

# 3. TypeScript shows errors everywhere full_name is used incorrectly
# 4. Fix the errors — the compiler guides you to every affected spot
```

### When to regenerate

| Situation                            | Regenerate? |
| ------------------------------------ | ----------- |
| New backend endpoint added           | ✅ Yes      |
| Backend model field renamed or added | ✅ Yes      |
| Response type changed                | ✅ Yes      |
| Only editing frontend components     | ❌ No       |
| Restarting servers                   | ❌ No       |
| Fixing a frontend bug                | ❌ No       |

---

## 9. Quick Reference Cheatsheet

```ts
import {
  PatientsService,
  CasesService,
  AppointmentsService,
  PrescriptionsService,
  MedicinesService,
  FollowupsService,
  LoginService,
  UsersService,
  ReportsService,
  type Patient,
  type PatientCreate,
  type PatientUpdate,
  type Case,
  type Prescription,
  ApiError,
} from "@/client";

// GET list
const { data } = await PatientsService.readPatients({ skip: 0, limit: 20 });

// GET single
const { data } = await PatientsService.readPatient({ patientId: id });

// POST create
const { data } = await PatientsService.createPatient({ requestBody: payload });

// PUT update
const { data } = await PatientsService.updatePatient({
  patientId: id,
  requestBody: payload,
});

// DELETE
await PatientsService.deletePatient({ patientId: id });

// With TanStack Query
const { data, isLoading, error } = useQuery({
  queryKey: ["patients", filters],
  queryFn: () => PatientsService.readPatients(filters),
});

// With useMutation
const mutation = useMutation({
  mutationFn: (payload: PatientCreate) =>
    PatientsService.createPatient({ requestBody: payload }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
  onError: (error) => {
    if (error instanceof ApiError) console.error(error.body);
  },
});
```

---

> **Remember:** The client is auto-generated. Never edit files inside `src/client/` manually — your changes will be overwritten the next time `npm run generate-client` is run.
