# 🏥 Homeopathic Patient Management System

> A full-stack, domain-specific SaaS clinic management platform built exclusively for homeopathic practitioners.

---

## 📌 What Is This Product?

The **Homeopathic Patient Management System** is a professional-grade, doctor-facing clinic management SaaS. It is **not** a generic EMR adapted for homeopathy — it is purpose-built from the ground up to handle the entire homeopathic clinical workflow, from patient intake through constitutional follow-up.

It covers patient registration, homeopathic case-taking, appointment scheduling, prescription management, medicine stock tracking, follow-up recording, financial management, and reporting — all in one secure, role-based platform.

---

## 🎯 Problem Statement

Generic clinic software fails homeopathic practitioners because it doesn't understand the domain. Specific gaps include:

- ❌ No support for homeopathy-specific case-taking: miasm assessment, modalities, concomitants, or vitality scoring
- ❌ Paper-based records break care continuity across multi-visit constitutional treatment plans
- ❌ No structured way to track follow-up aggravations, ameliorations, or symptom progression
- ❌ Medicine stock management (X, C, LM potencies; globules, drops, diskettes) is absent from general clinic tools
- ❌ Prescription printing, dosage repetition schedules, and dietary restrictions lack domain-specific structure
- ❌ Scattered workflows — registration, scheduling, prescribing, billing — with no unified, role-secured platform

**This platform solves all of the above in one cohesive system.**

---

## ✅ Core Deliverables

| # | Deliverable | Description |
|---|-------------|-------------|
| 1 | **RESTful API** | Comprehensive endpoints for all clinic operations — patients, cases, appointments, prescriptions, and reports |
| 2 | **Structured Data Models** | Purpose-built schemas for patients, cases, medicines, prescriptions, and appointments with full relational integrity |
| 3 | **Auth & Access Control** | OAuth2 token-based authentication with role separation: `doctor`, `staff`, `admin`, `patient` |
| 4 | **Reporting & Analytics** | Patient history, medicine usage, financial summaries, prescription analysis, and expiry alerts |
| 5 | **Homeopathy-Specific Logic** | Miasm assessment, potency tracking (X/C/LM), kingdom classification, modalities, and dosage repetition |
| 6 | **Scalable Architecture** | FastAPI backend with async operations; React + TypeScript + TanStack frontend with OpenAPI client generation |

---

## 🔄 End-to-End Workflow

### Step 1 — User Registration & Login
- Doctors and staff register via `/users/signup` or are added by an admin
- Login via email/password returns an OAuth2 token used for all subsequent requests
- Patients do **not** log in — they are managed entirely by the doctor/staff

### Step 2 — Patient Registration
- New patient added via `POST /patients/`
- Captures: name, DOB, gender, contact details, medical history, and allergies
- Each patient receives a unique ID linked to the treating doctor

### Step 3 — Case Taking
- A case is created per visit via `POST /cases/`
- Records:
  - Chief complaint, duration, onset, location, sensation
  - Modalities and concomitants
  - Mental, general, and physical symptoms
  - Miasm assessment and vitality scoring
- Forms the core **homeopathic case record**

### Step 4 — Appointment Scheduling
- Booked via `POST /appointments/`
- Supports first consultation and follow-up types
- Status lifecycle: `Scheduled → Confirmed → In Progress → Completed`
- Doctors can view today's and upcoming appointments at a glance

### Step 5 — Prescription Management
- Created via `POST /prescriptions/` after case analysis
- Includes medicine selection from master list, potency, dosage, duration
- Attaches dietary restrictions and avoidance instructions
- Prescription is linked to both the case and patient record
- Supports print-ready prescription output

### Step 6 — Medicine Stock Management
- Managed via `/medicines/stock`
- Tracks: potency (X, C, LM), form (globules, pills, drops, diskettes), quantity, batch number, expiry date
- System alerts for **low stock** and **expiring medicines**

### Step 7 — Follow-up Tracking
- Recorded via `POST /followups/`
- Logs: subjective/objective improvement, aggravation, amelioration, new symptoms
- Schedules the next follow-up date
- Builds a full longitudinal case progression record

### Step 8 — Reporting & Analytics
Available under `/reports/`:
- Patient history reports
- Medicine usage summaries
- Appointment statistics
- Prescription analysis
- Financial summary (consultation fees, medicine costs)
- Expiry alerts

### Step 9 — Admin & System Management
- Admin manages users, roles, and verification emails
- Health check and system monitoring endpoints
- Doctor availability and preference configuration

---

## 📋 Services Overview

| Service | Description | Key Endpoints |
|---------|-------------|---------------|
| Authentication & Users | Login, token management, user CRUD, password reset | `/login/*`, `/users/*` |
| Patient Management | Registration, updating, search, stats | `/patients/*` |
| Case Management | Homeopathic case recording, symptoms, miasm | `/cases/*` |
| Appointment Management | Scheduling, status updates, availability check | `/appointments/*` |
| Prescription Management | Creating prescriptions, linking medicines, printing | `/prescriptions/*` |
| Medicine Master | Homeopathic medicine database (kingdom, symptoms, rubrics) | `/medicines/master/*` |
| Medicine Stock | Doctor's personal stock, potency, expiry tracking | `/medicines/stock/*` |
| Follow-up Tracking | Recording follow-up visits, scheduling next visits | `/followups/*` |
| Doctor Availability | Managing doctor's schedule and exceptions | `/doctor-availability/*` |
| Doctor Preferences | Configuring doctor-specific settings | `/doctor-preferences/*` |
| Finance Management | Financial transactions, fees, and billing | `/finance/*` |
| Enums & Preferences | System enumerations and user preferences | `/enums/*` |
| Onsite Consultation | Managing onsite patient consultations | `/onsite-consultation/*` |
| Onsite Patient | Patient management for onsite visits | `/onsite-patient/*` |
| Reporting & Analytics | Patient history, medicine usage, financial reports | `/reports/*` |
| Web Content | Managing website content and public information | `/web-content/*` |
| Utilities | Email testing, system health, verification | `/utils/*` |

---

## 🧠 Homeopathy-Specific Features

These features differentiate this platform from any generic clinic tool:

- **Miasm Assessment** — recorded per case (Psoric, Sycotic, Syphilitic, Tubercular)
- **Potency Scale Tracking** — X, C, LM, and custom potencies
- **Medicine Kingdom Classification** — Plant, Mineral, Animal
- **Modalities & Concomitants** — structured recording per case
- **Prescription Types** — Constitutional, Classical, Inter Current, Pure Bio Chemic, Mother Tincture, Patent
- **Medicine Forms** — Diskettes, SOM, Blankets, Bio Chemic, Homoeo Tabs, Globules, Dilutions
- **Dosage Repetition** — OD, BD, TDS, Once Weekly, Once in 10 Days, Fortnightly, Monthly
- **Supported Manufacturers** — Schwabe, Reckweg, Lemasar, Dolisos, Kamal, Masood, BM, Kent, Brooks, Waris Shah, Self Packing

---

## 🔐 Security & Access Control

- **Role-based access**: `doctor`, `staff`, `admin`, `patient`
- **OAuth2 token authentication** for all protected endpoints
- **Password encryption** and secure session management
- Sensitive operations require valid, unexpired tokens

---

## 🧑‍⚕️ Doctor's Perspective

- **Dashboard** — Stats on total patients, today's appointments, and low stock alerts
- **Core Workflow** — Register patient → Take case → Prescribe → Schedule follow-up
- **Stock Management** — Full visibility into medicine inventory, potencies, and expiry
- **Case Continuity** — Complete patient history across all visits
- **Prescription Archive** — All past prescriptions stored and retrievable

---

## 👤 Patient's Perspective (Indirect)

Patients do not interact with the platform directly. Their benefit comes through the doctor:

- All case details, prescriptions, and follow-ups are digitally stored
- Doctor has full history for better, more consistent treatment decisions
- Follow-up dates are tracked for continuity of care
- Print-ready prescriptions available for pharmacy or dispensary

---

## 🛠️ Tech Stack

### Backend
| Layer | Technology |
|-------|------------|
| Framework | FastAPI (Python) |
| Auth | OAuth2 / JWT |
| API Style | RESTful |
| Performance | Async / non-blocking |

### Frontend
| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | TanStack Router |
| Data Fetching | TanStack Query |
| Styling | Tailwind CSS |
| API Client | Auto-generated via `openapi-ts` |
| Testing | Playwright (E2E) |

---

## 🚀 Frontend Quick Start

```bash
# Navigate to frontend directory
cd cvp_frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open at: [http://localhost:5173](http://localhost:5173)

### Environment Configuration

Create `cvp_frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

### Available Scripts

```bash
npm run dev              # Start Vite development server
npm run build            # Build production assets
npm run preview          # Preview production build locally
npm run lint             # Run Biome linting and formatting checks
npm run generate-client  # Generate OpenAPI client from backend schema
```

### API Client Generation

```bash
# Ensure backend is running, then:
npm run generate-client
```

Commit generated client files if your API schema has changed.

---

## 📁 Frontend Project Structure

```
cvp_frontend/
├── src/
│   ├── client/        # Generated OpenAPI client and API service wrappers
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── routes/        # App route definitions and page components
│   └── assets/        # Static assets
├── tests/             # End-to-end and integration tests
├── package.json
├── tsconfig.json
├── vite.config.ts
└── openapi-ts.config.ts
```

---

## 🧪 Testing

```bash
# Run all Playwright tests
npx playwright test

# Run in interactive UI mode
npx playwright test --ui
```

> Ensure the backend API is available before running tests (local instance or Docker-based backend).

---

## 📊 Platform Summary

| Attribute | Value |
|-----------|-------|
| Target Users | Homeopathic doctors, clinic staff, admins |
| Patient Interaction | Indirect (doctor-managed records) |
| Architecture | Full-stack SaaS (REST API + React SPA) |
| Auth Model | OAuth2 / token-based, role-separated |
| Service Modules | 17 |
| Workflow Steps | 9 (registration → follow-up) |
| Report Types | 6 |
| Potency Support | X, C, LM and custom |

---

> **This is a professional-grade, specialized practice management system for homeopathic doctors.** It covers the entire workflow from patient intake to follow-up, with deep attention to homeopathic case-taking and medicine management. It is a doctor-facing clinic management tool — not a patient portal — designed for organized, secure, and efficient practice operations.
