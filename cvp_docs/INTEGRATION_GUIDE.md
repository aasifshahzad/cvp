# Full Integration Guide: Backend ↔ Dashboard ↔ Homeo Website

**Systems:** FastAPI Backend · React Dashboard (Vite + TanStack) · Next.js Homeo Marketing Site  
**Date:** May 2026

---

## The Real Architecture (corrected mental model)

```
┌─────────────────────────────────────────────────────────────────┐
│                      FastAPI Backend                            │
│                                                                 │
│  ┌─────────────────────┐    ┌────────────────────────────────┐  │
│  │  Authenticated APIs  │    │       Public APIs              │  │
│  │  (JWT required)      │    │       (no auth)                │  │
│  │                      │    │                                │  │
│  │  /users/me (PATCH)   │    │  /public/doctors               │  │
│  │  /web-content/*      │    │  /public/availability/...      │  │
│  │  /appointments/...   │    │  /public/appointments/book-... │  │
│  │  (all clinical APIs) │    │  /web-content/*-public         │  │
│  └──────────┬───────────┘    └───────────────┬────────────────┘  │
│             │                                │                   │
└─────────────┼────────────────────────────────┼───────────────────┘
              │                                │
              ▼                                ▼
   ┌──────────────────┐             ┌─────────────────────┐
   │     Dashboard    │             │    Homeo Website     │
   │  (React/Vite)    │             │   (Next.js)          │
   │                  │             │                      │
   │  Doctor edits:   │             │  Reads & displays:   │
   │  - Profile info  │  same DB ──▶│  - Profile cards     │
   │  - Hero section  │             │  - Hero section      │
   │  - About doctor  │             │  - About section     │
   │  - Services      │             │  - Services          │
   │  - Testimonials  │             │  - Testimonials      │
   │  - Contact info  │             │  - Contact details   │
   │  - Availability  │             │  - Available slots   │
   └──────────────────┘             └─────────────────────┘
```

**Key insight:** The dashboard is the CMS. The homeo site is the display layer. They share the same database through the backend — the doctor edits content in the dashboard, the homeo site reads it via public endpoints. No direct communication between the two frontends.

---

## Part 1 — What the Dashboard Controls

The dashboard has full CRUD over all of these through authenticated endpoints:

| Dashboard Route | Manages | Backend Endpoint Group |
|---|---|---|
| `/settings` → UserInformation | Doctor profile (`full_name`, `specialization`, `clinic_name`, `clinic_address`, `consultation_fee`, `phone`) | `PATCH /users/me` |
| `/web-content/hero-section` | Hero banner, title, subtitle, credentials | `POST/PUT /web-content/hero-section` |
| `/web-content/about-doctor` | Biography, qualifications, specializations | `POST/PUT /web-content/about-doctor` |
| `/web-content/services` | Service cards with icon, image, title, description | `POST/PUT /web-content/services` |
| `/web-content/testimonials` | Patient stories, ratings, approval status | `POST/PUT /web-content/testimonials` |
| `/web-content/contact-info` | Address, phone, hours, WhatsApp | `POST/PUT /web-content/contact-info` |
| `/availability` | Weekly schedule, exceptions | `POST /doctor_availability/` |

**The dashboard already works.** No changes needed to it for the integration. Its job is just to write data. The homeo site reads it.

---

## Part 2 — What the Homeo Site Needs (Public Endpoints Audit)

### ✅ Endpoints that already exist

All `web-content/*-public` endpoints are live with no auth required:

| Homeo Component | Endpoint | Returns |
|---|---|---|
| `Hero.tsx` | `GET /web-content/hero-section-public` | `HeroSectionResponse[]` |
| `AboutSection.tsx` | `GET /web-content/about-doctor-public` | `AboutDoctorResponse[]` |
| `ServicesSection.tsx` | `GET /web-content/services-public` | `ServicesAndTreatmentsResponse[]` |
| `TestimonialsSection.tsx` | `GET /web-content/testimonials-public` | `PatientSuccessStoriesResponse[]` |
| `ContactSection.tsx` + `WhatsAppButton.tsx` | `GET /web-content/contact-info-public` | `ContactInformationResponse[]` |
| `FeaturedDoctors.tsx` + `DoctorCard.tsx` | `GET /public/doctors` | `DoctorPublicInfo[]` |
| `ProfileHero.tsx` | `GET /public/doctors/{doctor_id}` | `DoctorPublicInfo` |
| `BookingSection.tsx` (slot picker) | `GET /public/availability/{doctor_id}/{date}` | `AvailabilityResponse` |
| `BookingForm.tsx` (submit) | `POST /public/appointments/book-public` | `AppointmentBookingResponse` |

### ⚠️ Gaps — endpoints that need to be added to the backend

These are features in the homeo design that have no current public endpoint:

#### Gap 1 — Doctor registration (`/register` page)

The homeo site has a multi-step doctor registration form (`Step1Personal`, `Step2Practice`, `Step3Review`). The backend has `POST /users/signup` but the `UserRegister` schema in the OpenAPI spec is missing `clinic_name`, `clinic_address`, and `specialization` — those are in the model class but stripped from the public registration schema. Check `routes/users.py` around line `18853`:

```python
# If UserRegister is missing clinic fields, update it:
class UserRegister(SQLModel):
    email: EmailStr
    password: str
    full_name: str
    phone: Optional[str] = None
    role: UserRole = UserRole.DOCTOR
    registration_number: Optional[str] = None  # medical license
    specialization: Optional[str] = None        # ← add if missing
    clinic_name: Optional[str] = None           # ← add if missing
    clinic_address: Optional[str] = None        # ← add if missing
```

No new endpoint needed — just verify the existing `/users/signup` accepts all the Step2Practice fields.

#### Gap 2 — `StatsBar.tsx` (dynamic stats)

The homeo homepage likely shows stats like "500+ patients treated", "10 years experience". These are currently hardcoded in the component. To make them dynamic, add a public stats endpoint:

```python
# routes/public.py — add this endpoint
@router.get("/stats", tags=["🌍 Public"])
def get_public_stats(session: SessionDep) -> dict:
    """Public clinic statistics for marketing website"""
    from sqlmodel import select, func
    from models import Patient, PatientCase, Appointment
    
    patient_count = session.exec(select(func.count(Patient.id))).one()
    case_count = session.exec(select(func.count(PatientCase.id))).one()
    
    return {
        "total_patients": patient_count,
        "total_cases": case_count,
    }
```

If you prefer static/marketing numbers (e.g. "500+"), keep them hardcoded and skip this endpoint.

#### Gap 3 — `WebsiteSpotlight.tsx`

This component (from the homeo index) likely shows the doctor's public profile link or website preview. It needs the doctor's public ID to construct links. That's already available from `GET /public/doctors` — just grab `id` from the first result.

#### Gap 4 — `HowItWorks.tsx` and `PlatformFeatures.tsx`

These are static marketing content. No backend endpoint needed — keep them hardcoded in the component.

---

## Part 3 — Homeo: Complete `src/lib/api.ts`

Create or replace your existing `api.ts` with this:

```typescript
// src/lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json()
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.detail ?? `POST ${path} → ${res.status}`)
  }
  return res.json()
}

// ── Web content (dashboard-managed, cached 60s) ──────────────────
export const getHeroSections   = () => get<HeroSectionResponse[]>('/web-content/hero-section-public')
export const getAboutDoctor    = () => get<AboutDoctorResponse[]>('/web-content/about-doctor-public')
export const getServices       = () => get<ServicesResponse[]>('/web-content/services-public')
export const getTestimonials   = () => get<TestimonialsResponse[]>('/web-content/testimonials-public')
export const getContactInfo    = () => get<ContactInfoResponse[]>('/web-content/contact-info-public')

// ── Doctor directory ─────────────────────────────────────────────
export const getDoctors        = () => get<DoctorPublicInfo[]>('/public/doctors')
export const getDoctor         = (id: string) => get<DoctorPublicInfo>(`/public/doctors/${id}`)

// ── Booking flow (never cached) ──────────────────────────────────
export const getAvailability   = (doctorId: string, date: string) =>
  get<AvailabilityResponse>(`/public/availability/${doctorId}/${date}`)

export const bookAppointment   = (data: PublicBookingRequest) =>
  post<AppointmentBookingResponse>('/public/appointments/book-public', data)

// ── Doctor registration ──────────────────────────────────────────
export const registerDoctor    = (data: DoctorRegisterRequest) =>
  post<UserPublic>('/users/signup', data)
```

---

## Part 4 — Homeo: Complete `src/lib/types.ts`

These are exact mirrors of the backend Pydantic models (taken from the OpenAPI spec):

```typescript
// src/lib/types.ts

// ── Web content types (mirror backend WebContentService.ts from dashboard) ──

export interface Credential { id?: number; label: string; value: string; order: number }
export interface HeroSectionResponse {
  id: number; title: string; subtitle: string; description: string
  credentials: Credential[]; created_at: string; updated_at: string
}

export interface Qualification { id?: number; qualification_text: string; order: number }
export interface Specialization { id?: number; specialization_text: string; order: number }
export interface AboutDoctorResponse {
  id: number; title: string; experience_title: string; experience_description: string
  qualifications: Qualification[]; specializations: Specialization[]
  created_at: string; updated_at: string
}

export interface Service { id?: number; icon: string; image_url: string; title: string; description: string; order: number }
export interface ServicesResponse {
  id: number; title: string; services: Service[]; created_at: string; updated_at: string
}

export interface Testimonial { id?: number; name: string; city: string; rating: number; message: string; order: number; is_approved: boolean }
export interface TestimonialsResponse {
  id: number; title: string; testimonials: Testimonial[]; created_at: string; updated_at: string
}

export interface ContactInfoResponse {
  id: number; title: string; address: string; city: string
  phone_primary: string; phone_secondary?: string
  weekdays_hours: string; saturday_hours: string; sunday_hours: string
  whatsapp_number: string; whatsapp_message: string
  created_at: string; updated_at: string
}

// ── Doctor & booking types ───────────────────────────────────────

export interface DoctorPublicInfo {
  id: string; full_name: string
  specialization?: string; clinic_name?: string; consultation_fee?: number
}

export interface AvailableSlot { start: string; end: string; duration_minutes: number; booked: boolean }
export interface AvailabilityResponse {
  date: string; day_of_week: string
  available_slots: AvailableSlot[]
  doctor?: DoctorPublicInfo; message?: string
}

export interface PublicBookingRequest {
  doctor_id: string; full_name: string; phone: string
  gender?: 'male' | 'female' | 'other' | 'child'
  appointment_date: string  // "YYYY-MM-DD"
  appointment_time: string  // "HH:MM"
  reason?: string
}

export interface AppointmentBookingResponse {
  success: boolean; appointment_id?: string; message: string
}

// ── Doctor registration ──────────────────────────────────────────

export interface DoctorRegisterRequest {
  email: string; password: string; full_name: string
  phone?: string; registration_number?: string
  specialization?: string; clinic_name?: string; clinic_address?: string
}

export interface UserPublic {
  id: string; full_name: string; email?: string; role: string
  specialization?: string; clinic_name?: string; phone?: string
  is_active: boolean; is_approved: boolean
}
```

**Important:** These types are identical to the interfaces in the dashboard's `WebContentService.ts`. Do not duplicate the source of truth — if you ever change a model in the backend, update both `WebContentService.ts` (dashboard) and `types.ts` (homeo) together.

---

## Part 5 — Homeo: Page-by-Page Wiring

### Homepage (`src/app/page.tsx`) — server component

```typescript
import { getHeroSections, getAboutDoctor, getServices, getTestimonials, getDoctors } from '@/lib/api'

export default async function HomePage() {
  const [heroes, about, services, testimonials, doctors] = await Promise.all([
    getHeroSections(),
    getAboutDoctor(),
    getServices(),
    getTestimonials(),
    getDoctors(),
  ])

  const hero     = heroes[0]
  const aboutDoc = about[0]
  const serviceSection = services[0]
  const testimonialSection = testimonials[0]
  const featuredDoctors = doctors.slice(0, 3)

  return (
    <>
      {hero && <Hero data={hero} />}
      <StatsBar />  {/* static or fetch /public/stats */}
      {featuredDoctors.length > 0 && <FeaturedDoctors doctors={featuredDoctors} />}
      {serviceSection && <ServicesSection data={serviceSection} />}
      {aboutDoc && <AboutSection data={aboutDoc} />}
      {testimonialSection && <TestimonialsSection data={testimonialSection} />}
      <HowItWorks />   {/* static */}
      <FinalCTA />     {/* static */}
    </>
  )
}
```

Use `Promise.all` — parallel fetches, not sequential. All content renders server-side for SEO.

### Doctor profile page (`src/app/doctors/[id]/page.tsx`)

```typescript
import { getDoctor } from '@/lib/api'

export default async function DoctorPage({ params }: { params: { id: string } }) {
  const doctor = await getDoctor(params.id)
  return (
    <>
      <ProfileHero doctor={doctor} />
      <BookingSection doctorId={doctor.id} />  {/* client component */}
    </>
  )
}
```

### `BookingSection.tsx` — client component

```typescript
'use client'
import { useState } from 'react'
import { getAvailability } from '@/lib/api'
import type { AvailableSlot } from '@/lib/types'

export default function BookingSection({ doctorId }: { doctorId: string }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState<AvailableSlot[]>([])

  const handleDateChange = async (date: string) => {
    setSelectedDate(date)
    const res = await getAvailability(doctorId, date)
    // Filter out already-booked slots
    setSlots(res.available_slots.filter(s => !s.booked))
  }

  return (
    <>
      <input type="date" onChange={e => handleDateChange(e.target.value)} />
      {slots.map(slot => (
        <button key={slot.start}>{slot.start} – {slot.end}</button>
      ))}
      <BookingForm doctorId={doctorId} selectedDate={selectedDate} />
    </>
  )
}
```

### `BookingForm.tsx` submit handler (Step3Review → final submit)

```typescript
'use client'
import { bookAppointment } from '@/lib/api'

const handleSubmit = async () => {
  try {
    const result = await bookAppointment({
      doctor_id: doctorId,
      full_name: formData.full_name,
      phone: formData.phone,
      gender: formData.gender,
      appointment_date: selectedDate,          // "2026-05-25"
      appointment_time: selectedSlot.start,    // "09:30"
      reason: formData.reason,
    })
    if (result.success) {
      // show SuccessState
    }
  } catch (err) {
    // show error
  }
}
```

**Date/time format note:** `appointment_date` must be `"YYYY-MM-DD"`. `appointment_time` must be `"HH:MM"` (24-hour). The slot picker returns times in that format already from the backend.

### `ContactSection.tsx` — server component

```typescript
import { getContactInfo } from '@/lib/api'

export default async function ContactSection() {
  const contacts = await getContactInfo()
  const info = contacts[0]
  if (!info) return null

  const waNumber = info.whatsapp_number.replace(/\D/g, '')
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(info.whatsapp_message)}`

  return (
    <section>
      <h2>{info.title}</h2>
      <p>{info.address}, {info.city}</p>
      <p>Weekdays: {info.weekdays_hours}</p>
      <p>Saturday: {info.saturday_hours}</p>
      <p>Sunday: {info.sunday_hours}</p>
      <a href={`tel:${info.phone_primary}`}>{info.phone_primary}</a>
      {info.phone_secondary && <a href={`tel:${info.phone_secondary}`}>{info.phone_secondary}</a>}
      <a href={waUrl} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
    </section>
  )
}
```

### `WhatsAppButton.tsx` — receive contact info as prop

Fetch `getContactInfo()` once in the layout or page and pass down:

```typescript
// layout.tsx
const contacts = await getContactInfo()
const contactInfo = contacts[0]

return (
  <>
    {children}
    {contactInfo && <WhatsAppButton info={contactInfo} />}
  </>
)
```

### Doctor registration (`src/app/register/page.tsx`)

```typescript
'use client'
import { registerDoctor } from '@/lib/api'

// On final Step3Review submit:
const handleRegister = async () => {
  try {
    const result = await registerDoctor({
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      phone: formData.phone,
      registration_number: formData.registration_number,
      specialization: formData.specialization,
      clinic_name: formData.clinic_name,
      clinic_address: formData.clinic_address,
    })
    // Show SuccessState — account is pending admin approval
    showSuccess()
  } catch (err) {
    showError(err.message)
  }
}
```

**Critical:** After `POST /users/signup`, the account gets `is_approved: false`. The `SuccessState` component must say "Your account is pending admin approval" — not "You're live!" The admin approves via the dashboard's pending approvals section.

---

## Part 6 — Backend CORS Update

Add the homeo dev URL to `main.py`:

```python
allowed_origins = [
    "http://localhost:3000",   # homeo Next.js dev
    "http://localhost:3001",   # dashboard dev (if different port)
    "http://localhost:5173",   # dashboard Vite dev (current)
    "https://yourdomain.com",  # homeo production
    "https://dashboard.yourdomain.com",  # dashboard production
]
```

---

## Part 7 — Environment Variables

### Homeo (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Dashboard (`.env`):
```env
VITE_API_URL=http://localhost:8000
```

For the dashboard, find where `OpenAPI.BASE` is set (likely `src/client/core/OpenAPI.ts`) and ensure it reads from the env var.

---

## Part 8 — Data Flow Cheat Sheet

```
Doctor opens dashboard
  └─▶ Edits "About Doctor" section
        └─▶ PUT /web-content/about-doctor/{id}  (auth required)
              └─▶ Saves to DB
                    └─▶ Visitor loads homeo website
                          └─▶ GET /web-content/about-doctor-public  (no auth)
                                └─▶ AboutSection.tsx renders updated content
                                      (Next.js revalidates cache every 60s)

Doctor edits Settings → specialization, consultation_fee
  └─▶ PATCH /users/me  (auth required)
        └─▶ Saves to User table
              └─▶ Visitor loads /doctors page
                    └─▶ GET /public/doctors  (no auth)
                          └─▶ DoctorCard.tsx shows updated specialization/fee

Patient visits doctor profile page
  └─▶ GET /public/doctors/{id}
        GET /public/availability/{id}/{date}
              └─▶ BookingSection shows available slots (booked: false filtered out)
                    └─▶ Patient fills BookingForm
                          └─▶ POST /public/appointments/book-public
                                └─▶ Appointment appears in doctor's dashboard
```

---

## Part 9 — Testimonial Approval Flow

The dashboard has an `is_approved` field on each testimonial. The homeo site should only display approved ones:

```typescript
// TestimonialsSection.tsx
const approved = testimonialSection.testimonials.filter(t => t.is_approved)
```

The backend returns all testimonials regardless of approval in the public endpoint currently. If you want to enforce filtering server-side, add a query param to the backend:

```python
# routes/web_content.py
@router.get("/testimonials-public", ...)
def get_all_testimonials_public(session: SessionDep, approved_only: bool = True):
    statement = select(PatientSuccessStories)
    # filter testimonials by is_approved inside the response
    ...
```

Until then, filter client-side as shown above.

---

## Part 10 — What NOT to Do

| Temptation | Why not |
|---|---|
| Calling `WebContentService` from the homeo site | It uses authenticated dashboard endpoints — they'll 401. Use the `*-public` endpoints instead. |
| Sharing the dashboard auth token with the homeo site | Tokens are for doctors only. Public visitors have no token. |
| Fetching availability in a server component | Availability changes constantly — must be a client component with `cache: 'no-store'`. |
| Using `window.location.reload()` after booking | Breaks state. Show `SuccessState` component in-place. |
| Skipping `Promise.all` on the homepage | Sequential fetches make the page slow. Always parallelize static content fetches. |

---

## Summary: Integration Checklist

**Backend (no new endpoints needed except optionally `/public/stats`):**
- [ ] Verify `UserRegister` model includes `specialization`, `clinic_name`, `clinic_address`
- [ ] Add homeo URLs to CORS `allowed_origins`
- [ ] (Optional) Add `GET /public/stats` for dynamic homepage stats

**Homeo site:**
- [ ] Create `.env.local` with `NEXT_PUBLIC_API_URL`
- [ ] Create `src/lib/api.ts` (from Part 3)
- [ ] Create `src/lib/types.ts` (from Part 4)
- [ ] Wire `Homepage` with `Promise.all` server fetches
- [ ] Wire `ContactSection` + `WhatsAppButton` with `getContactInfo()`
- [ ] Wire `BookingSection` as client component with date-change handler
- [ ] Wire `BookingForm` submit with `bookAppointment()`
- [ ] Wire `/register` page with `registerDoctor()`
- [ ] Filter testimonials by `is_approved`
- [ ] `SuccessState` after registration says "pending approval"

**Dashboard (no changes needed):**
- The dashboard already writes to all the right endpoints.
- Its web-content management is the CMS for the homeo site.
- Ensure doctors fill in all profile fields (`specialization`, `clinic_name`, `consultation_fee`) in Settings — these drive the doctor cards on the homeo site.
