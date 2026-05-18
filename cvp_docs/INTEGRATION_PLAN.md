# Backend ↔ Dashboard ↔ Homeo Website Integration Plan

**Project:** CVP Homeopathy Platform  
**Date:** May 17, 2026  
**Status:** Planning Phase

---

## Executive Summary

This integration plan addresses the connection between three systems:

1. **FastAPI Backend** - Data layer with authenticated and public APIs
2. **React Dashboard** (Vite + TanStack) - CMS for doctors to manage content
3. **Next.js Homeo Website** - Public-facing marketing and booking site

### Current Status Analysis

✅ **What's Working:**

- Backend has complete public API endpoints for web content
- Dashboard successfully manages all content through authenticated endpoints
- All web-content public endpoints exist and are functional

⚠️ **Critical Gaps Identified:**

1. **🔴 UserRegister OpenAPI Schema Mismatch**: Python model has clinic fields, but generated `openapi.json` is stale and doesn't expose them
2. **API Endpoint Mismatch**: Homeo frontend expects doctor-specific endpoints (`/web-content/hero-section-public/{doctor_id}`), but backend provides global endpoints (`/web-content/hero-section-public`)
3. **Booking Flow Mismatch**: Homeo uses old appointment API pattern, backend has new public booking endpoint
4. **Type System Divergence**: Homeo types don't match backend response models
5. **Missing CORS Configuration**: Homeo dev URL not in allowed origins
6. **Booking Time Selection**: BookingForm has hardcoded time instead of using selected slot

---

## Part 1: Backend API Endpoint Audit

### 1.1 Public Endpoints (No Authentication Required)

#### ✅ Doctor Directory

- `GET /public/doctors` - List all active doctors
- `GET /public/doctors/{doctor_id}` - Get specific doctor info
- **Status:** Fully functional, matches integration guide

#### ✅ Availability & Booking

- `GET /public/availability/{doctor_id}/{check_date}` - Get available slots
- `POST /public/appointments/book-public` - Book appointment
- **Status:** Fully functional, correct implementation

#### ✅ Web Content Public Endpoints

All endpoints exist and are functional:

- `GET /web-content/hero-section-public` - List all hero sections
- `GET /web-content/hero-section-public/{hero_id}` - Get specific hero section
- `GET /web-content/about-doctor-public` - List all about sections
- `GET /web-content/about-doctor-public/{about_doctor_id}` - Get specific about section
- `GET /web-content/services-public` - List all services sections
- `GET /web-content/services-public/{services_id}` - Get specific services section
- `GET /web-content/testimonials-public` - List all testimonials sections
- `GET /web-content/testimonials-public/{testimonials_id}` - Get specific testimonials section
- `GET /web-content/contact-info-public` - List all contact info sections
- `GET /web-content/contact-info-public/{contact_id}` - Get specific contact info

**⚠️ CRITICAL ISSUE:** These endpoints return ALL content globally, not filtered by doctor_id. The integration guide assumes doctor-specific filtering.

#### 🔴 User Registration - CRITICAL ISSUE

- `POST /users/signup` - Doctor/staff registration
- **UserRegister Model Status:** ⚠️ **STALE OPENAPI SCHEMA**
  - Python model class includes: email, password, full_name, phone, role, registration_number, specialization, clinic_name, clinic_address
  - **BUT** generated `openapi.json` only exposes: email, password, full_name, phone
  - **Impact:** Homeo registration form sending `clinic_name`, `specialization`, `clinic_address` will get 422 validation errors
  - **Fix Required:** Regenerate `openapi.json` by running backend once (FastAPI auto-generates schema on startup)

### 1.2 Authenticated Endpoints (JWT Required)

#### Dashboard Content Management

- `POST/PUT/DELETE /web-content/hero-section` - Manage hero sections
- `POST/PUT/DELETE /web-content/about-doctor` - Manage about sections
- `POST/PUT/DELETE /web-content/services` - Manage services
- `POST/PUT/DELETE /web-content/testimonials` - Manage testimonials
- `POST/PUT/DELETE /web-content/contact-info` - Manage contact info
- `PATCH /users/me` - Update doctor profile

**Status:** All functional, dashboard uses these successfully

---

## Part 2: Critical Integration Gaps

### Gap 1: Web Content Endpoint Architecture Mismatch

**Problem:**

- **Homeo expects:** `/web-content/hero-section-public/{doctor_id}` (doctor-specific)
- **Backend provides:** `/web-content/hero-section-public` (global list)

**Current Homeo API calls:**

```typescript
// cvp_homeo/src/lib/api.ts (lines 102-135)
getHero: async (doctorId: string): Promise<HeroSection> => {
  const response = await apiClient.get(
    `/web-content/hero-section-public/${doctorId}`,
  );
  return response.data;
};
```

**Backend reality:**

```python
# cvp_backend/routes/web_content.py (lines 466-479)
@router.get("/hero-section-public", response_model=List[HeroSectionResponse])
def get_all_hero_sections_public(session: SessionDep) -> Any:
    """Get all Hero Sections - PUBLIC (no authentication required)"""
    statement = select(HeroSection)
    hero_sections = session.exec(statement).all()
    return hero_sections
```

**Impact:** 🔴 **BLOCKING** - Homeo cannot fetch doctor-specific content

**Solution: ✅ APPROVED - Option B (Client-Side Filtering)**

Update Homeo to use global endpoints and filter client-side. This matches the current backend architecture where web content is global, not doctor-specific.

```typescript
// Update cvp_homeo/src/lib/api.ts
getHero: async (): Promise<HeroSection[]> => {
  const response = await apiClient.get("/web-content/hero-section-public");
  return response.data;
};
// Then filter client-side: heroes.find(h => h.doctor_id === doctorId)
```

**Rationale:**
- No backend changes required
- Matches current architecture (web content is global)
- Simpler implementation
- The integration guide's assumption of doctor-specific endpoints was incorrect

### Gap 2: Booking Flow API Mismatch

**Problem:**

- **Homeo uses:** `/public/appointments/{doctorId}` (old pattern)
- **Backend provides:** `/public/appointments/book-public` (new pattern)

**Current Homeo code:**

```typescript
// cvp_homeo/src/lib/api.ts (lines 64-72)
create: async (
  doctorId: string,
  data: AppointmentData,
): Promise<Appointment> => {
  const response = await apiClient.post(
    `/public/appointments/${doctorId}`,
    data,
  );
  return response.data;
};
```

**Backend reality:**

```python
# cvp_backend/routes/public.py (line 192)
@router.post("/appointments/book-public", response_model=AppointmentBookingResponse)
def book_appointment_public(session: SessionDep, booking_data: PublicBookingRequest) -> Any:
    # doctor_id is in the request body, not URL path
    pass
```

**Impact:** 🔴 **BLOCKING** - Booking form will fail

**Solution:** Update Homeo API layer to match backend endpoint

### Gap 3: Type System Misalignment

**Problem:** Homeo types don't match backend Pydantic models

**Examples:**

**Homeo expects:**

```typescript
// cvp_homeo/src/lib/types.ts
interface Doctor {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string; // ❌ Backend uses 'phone'
  clinic_name?: string;
  city: string; // ❌ Backend doesn't have city in DoctorPublicInfo
  qualification: string; // ❌ Backend doesn't have this
  years_of_experience: number; // ❌ Backend doesn't have this
  specialties: string[]; // ❌ Backend uses 'specialization' (singular string)
  slug: string; // ❌ Backend doesn't have slug
}
```

**Backend provides:**

```python
# cvp_backend/models/public_models.py
class DoctorPublicInfo(SQLModel):
    id: str
    full_name: str
    specialization: Optional[str] = None
    clinic_name: Optional[str] = None
    consultation_fee: Optional[float] = None
```

**Impact:** 🟡 **HIGH** - Type errors, missing data, UI breaks

**Solution:** Align Homeo types with backend models

### Gap 4: Availability Endpoint Mismatch

**Problem:**

- **Homeo expects:** `/public/availability/{doctorId}` (no date parameter)
- **Backend requires:** `/public/availability/{doctor_id}/{check_date}` (date required)

**Impact:** 🔴 **BLOCKING** - Availability check will fail

**Solution:** Update Homeo to include date parameter

---

## Part 3: Integration Action Plan

### Phase 1: Backend Adjustments

#### Task 1.0: Regenerate OpenAPI Schema (CRITICAL)

**Priority:** 🔴 **BLOCKING**
**File:** Auto-generated on backend startup

**Problem:** The `openapi.json` file is stale. The `UserRegister` Pydantic model in Python includes clinic fields, but the generated OpenAPI schema doesn't expose them, causing FastAPI to reject registration requests with those fields.

**Solution:**

1. Start the backend: `cd cvp_backend && uvicorn main:app --reload`
2. The schema auto-regenerates on startup
3. Verify at `http://localhost:8000/docs` that `/users/signup` request body includes:
   - `specialization`
   - `clinic_name`
   - `clinic_address`
4. Test registration endpoint with all fields

**Verification:**

```bash
curl -X POST http://localhost:8000/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123",
    "full_name": "Test Doctor",
    "phone": "1234567890",
    "specialization": "Homeopathy",
    "clinic_name": "Test Clinic",
    "clinic_address": "123 Test St"
  }'
```

Should return 201 Created, not 422 Validation Error.

#### Task 1.1: Stats Bar on Homepage

**Priority:** ✅ APPROVED - Hardcoded (Skip Dynamic Endpoint)
**File:** `cvp_homeo/src/components/home/StatsBar.tsx`

**Decision:** Keep stats hardcoded in the component. No backend endpoint needed.

```typescript
// cvp_homeo/src/components/home/StatsBar.tsx
// Keep existing hardcoded values like "500+ patients treated"
```

**Rationale:**
- Marketing numbers are typically static/aspirational
- No need for real-time database queries
- Simpler implementation
- Can be updated manually when needed

#### Task 1.2: Update CORS Configuration

**Priority:** 🔴 **CRITICAL**
**File:** `cvp_backend/main.py`

```python
# Current CORS (needs update)
allowed_origins = [
    "http://localhost:5173",   # dashboard Vite dev
    # Missing homeo URLs
]

# Updated CORS
allowed_origins = [
    "http://localhost:3000",   # ✅ homeo Next.js dev
    "http://localhost:5173",   # dashboard Vite dev
    "https://yourdomain.com",  # homeo production
    "https://dashboard.yourdomain.com",  # dashboard production
]
```

#### Task 1.3: Testimonial Approval Filtering

**Priority:** ✅ APPROVED - Client-Side Only
**File:** `cvp_homeo/src/components/profile/TestimonialsSection.tsx`

**Decision:** Keep backend simple, filter in Homeo components. No backend changes needed.

```typescript
// cvp_homeo/src/components/profile/TestimonialsSection.tsx
const approved = testimonialSection.testimonials.filter((t) => t.is_approved);
```

**Rationale:**
- Simpler implementation
- No backend changes required
- Avoids SQLModel ORM mutation issues
- Sufficient for current needs

### Phase 2: Homeo Frontend Refactoring

#### Task 2.1: Complete API Layer Rewrite

**Priority:** 🔴 **CRITICAL**
**File:** `cvp_homeo/src/lib/api.ts`

**Replace entire file with:**

```typescript
// cvp_homeo/src/lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail ?? `POST ${path} → ${res.status}`);
  }
  return res.json();
}

// ── Web content (global endpoints, filter client-side) ──────────
export const getHeroSections = () =>
  get<HeroSectionResponse[]>("/web-content/hero-section-public");
export const getAboutDoctor = () =>
  get<AboutDoctorResponse[]>("/web-content/about-doctor-public");
export const getServices = () =>
  get<ServicesResponse[]>("/web-content/services-public");
export const getTestimonials = () =>
  get<TestimonialsResponse[]>("/web-content/testimonials-public");
export const getContactInfo = () =>
  get<ContactInfoResponse[]>("/web-content/contact-info-public");

// ── Doctor directory ─────────────────────────────────────────────
export const getDoctors = () => get<DoctorPublicInfo[]>("/public/doctors");
export const getDoctor = (id: string) =>
  get<DoctorPublicInfo>(`/public/doctors/${id}`);

// ── Booking flow (never cached) ──────────────────────────────────
export const getAvailability = (doctorId: string, date: string) =>
  get<AvailabilityResponse>(`/public/availability/${doctorId}/${date}`);

export const bookAppointment = (data: PublicBookingRequest) =>
  post<AppointmentBookingResponse>("/public/appointments/book-public", data);

// ── Doctor registration ──────────────────────────────────────────
export const registerDoctor = (data: DoctorRegisterRequest) =>
  post<UserPublic>("/users/signup", data);
```

#### Task 2.2: Complete Type System Rewrite

**Priority:** 🔴 **CRITICAL**
**File:** `cvp_homeo/src/lib/types.ts`

**Replace entire file with backend-aligned types:**

```typescript
// cvp_homeo/src/lib/types.ts

// ── Web content types (match backend Pydantic models) ──

export interface Credential {
  id?: number;
  label: string;
  value: string;
  order: number;
}

export interface HeroSectionResponse {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  credentials: Credential[];
  created_at: string;
  updated_at: string;
}

export interface Qualification {
  id?: number;
  qualification_text: string;
  order: number;
}

export interface Specialization {
  id?: number;
  specialization_text: string;
  order: number;
}

export interface AboutDoctorResponse {
  id: number;
  title: string;
  experience_title: string;
  experience_description: string;
  qualifications: Qualification[];
  specializations: Specialization[];
  created_at: string;
  updated_at: string;
}

export interface Service {
  id?: number;
  icon: string;
  image_url: string;
  title: string;
  description: string;
  order: number;
}

export interface ServicesResponse {
  id: number;
  title: string;
  services: Service[];
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id?: number;
  name: string;
  city: string;
  rating: number;
  message: string;
  order: number;
  is_approved: boolean;
}

export interface TestimonialsResponse {
  id: number;
  title: string;
  testimonials: Testimonial[];
  created_at: string;
  updated_at: string;
}

export interface ContactInfoResponse {
  id: number;
  title: string;
  address: string;
  city: string;
  phone_primary: string;
  phone_secondary?: string;
  weekdays_hours: string;
  saturday_hours: string;
  sunday_hours: string;
  whatsapp_number: string;
  whatsapp_message: string;
  created_at: string;
  updated_at: string;
}

// ── Doctor & booking types ───────────────────────────────────────

export interface DoctorPublicInfo {
  id: string;
  full_name: string;
  specialization?: string;
  clinic_name?: string;
  consultation_fee?: number;
}

export interface AvailableSlot {
  start: string;
  end: string;
  duration_minutes: number;
  booked: boolean;
}

export interface AvailabilityResponse {
  date: string;
  day_of_week: string;
  available_slots: AvailableSlot[];
  doctor?: DoctorPublicInfo;
  message?: string;
}

export interface PublicBookingRequest {
  doctor_id: string;
  full_name: string;
  phone: string;
  gender?: "male" | "female" | "other" | "child";
  appointment_date: string; // "YYYY-MM-DD"
  appointment_time: string; // "HH:MM"
  reason?: string;
}

export interface AppointmentBookingResponse {
  success: boolean;
  appointment_id?: string;
  message: string;
}

// ── Doctor registration ──────────────────────────────────────────

export interface DoctorRegisterRequest {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  registration_number?: string;
  specialization?: string;
  clinic_name?: string;
  clinic_address?: string;
}

export interface UserPublic {
  id: string;
  full_name: string;
  email?: string;
  role: string;
  specialization?: string;
  clinic_name?: string;
  phone?: string;
  is_active: boolean;
  is_approved: boolean;
}
```

#### Task 2.3: Update Homepage Component

**Priority:** 🔴 **CRITICAL**
**File:** `cvp_homeo/src/app/(marketing)/page.tsx`

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

  const hero = heroes[0]  // Use first hero section
  const aboutDoc = about[0]
  const serviceSection = services[0]
  const testimonialSection = testimonials[0]
  const featuredDoctors = doctors.slice(0, 3)

  return (
    <>
      {hero && <Hero data={hero} />}
      <StatsBar />
      {featuredDoctors.length > 0 && <FeaturedDoctors doctors={featuredDoctors} />}
      {serviceSection && <ServicesSection data={serviceSection} />}
      {aboutDoc && <AboutSection data={aboutDoc} />}
      {testimonialSection && <TestimonialsSection data={testimonialSection} />}
      <HowItWorks />
      <FinalCTA />
    </>
  )
}
```

#### Task 2.4: Update Doctor Profile Page

**Priority:** 🔴 **CRITICAL**
**File:** `cvp_homeo/src/app/doctor/[id]/page.tsx`

```typescript
// Remove doctor-specific web content fetching
// Use global endpoints and filter if needed
const [heroData, servicesData, aboutData, testimonialsData, contactData] =
  await Promise.allSettled([
    getHeroSections(), // Changed from getHero(doctor.id)
    getServices(), // Changed from getServices(doctor.id)
    getAboutDoctor(), // Changed from getAbout(doctor.id)
    getTestimonials(), // Changed from getTestimonials(doctor.id)
    getContactInfo(), // Changed from getContact(doctor.id)
  ]);

// Use first item from each array
const hero = heroData.status === "fulfilled" ? heroData.value[0] : null;
const services =
  servicesData.status === "fulfilled" ? servicesData.value[0] : null;
// ... etc
```

#### Task 2.5: Update BookingForm Component

**Priority:** 🔴 **CRITICAL - BLOCKING**
**File:** `cvp_homeo/src/components/profile/BookingForm.tsx`

**⚠️ CRITICAL ISSUE:** The hardcoded `"09:00"` time will cause booking failures if that slot is already booked.

**Problem:** `BookingForm` and `BookingSection` are separate components. The slot picker in `BookingSection` populates `slots` state, but doesn't pass the selected slot to `BookingForm`.

**Solution:** Lift `selectedSlot` state to a shared parent or pass callback down.

**Option A: Lift State to Parent (Recommended)**

```typescript
// cvp_homeo/src/app/doctor/[id]/page.tsx or BookingSection parent
const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

<BookingSection
  doctorId={doctor.id}
  onSlotSelect={setSelectedSlot}
/>
<BookingForm
  doctorId={doctor.id}
  selectedSlot={selectedSlot}
/>
```

**Option B: Combine Components**
Merge `BookingSection` and `BookingForm` into single component with shared state.

**Updated BookingForm with selectedSlot prop:**

```typescript
interface BookingFormProps {
  doctorId: string;
  doctorName: string;
  selectedSlot: string | null; // ✅ Add this prop
}

const onSubmit = async (data: BookingFormData) => {
  if (!selectedSlot) {
    setError("Please select a time slot first");
    return;
  }

  setError(null);
  try {
    const result = await bookAppointment({
      doctor_id: doctorId,
      full_name: data.patient_name,
      phone: data.patient_phone,
      gender: data.patient_gender.toLowerCase() as "male" | "female" | "other",
      appointment_date: data.appointment_date,
      appointment_time: selectedSlot, // ✅ Use selected slot
      reason: data.problem_description,
    });

    if (result.success) {
      setIsSubmitted(true);
      reset();
    }
  } catch (err: any) {
    setError(err.message || "Failed to book appointment");
  }
};
```

**DO NOT SHIP without resolving this - every booking will attempt 09:00 regardless of user selection.**

#### Task 2.6: Update BookingSection Component

**Priority:** 🔴 **CRITICAL**
**File:** `cvp_homeo/src/components/profile/BookingSection.tsx`

```typescript
const handleDateChange = async (date: string) => {
  setSelectedDate(date);
  const res = await getAvailability(doctorId, date); // Now includes date parameter
  setSlots(res.available_slots.filter((s) => !s.booked));
};
```

#### Task 2.7: Update Registration Page

**Priority:** 🔴 **CRITICAL**
**File:** `cvp_homeo/src/app/(marketing)/register/page.tsx`

```typescript
const handleRegister = async () => {
  try {
    const result = await registerDoctor({
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      phone: formData.phone_number,
      registration_number: formData.registration_number,
      specialization: formData.specialization,
      clinic_name: formData.clinic_name,
      clinic_address: formData.clinic_address,
    });

    // Show success with approval pending message
    showSuccess("Account created! Pending admin approval.");
  } catch (err) {
    showError(err.message);
  }
};
```

### Phase 3: Environment Configuration

#### Task 3.1: Backend Environment

**File:** `cvp_backend/.env`

```env
# Existing config...
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourdomain.com
```

#### Task 3.2: Homeo Environment

**File:** `cvp_homeo/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Task 3.3: Dashboard Environment

**File:** `cvp_dashboard/.env`

```env
VITE_API_URL=http://localhost:8000
```

---

## Part 4: Data Flow Validation

### 4.1 Doctor Registration Flow

```
User fills registration form
  └─▶ POST /users/signup
        └─▶ Creates User with is_approved=false
              └─▶ SuccessState shows "Pending approval"
                    └─▶ Admin approves via dashboard
                          └─▶ Doctor can login
```

### 4.2 Content Management Flow

```
Doctor logs into dashboard
  └─▶ Edits Hero Section
        └─▶ PUT /web-content/hero-section/{id} (auth required)
              └─▶ Saves to database
                    └─▶ Visitor loads homeo homepage
                          └─▶ GET /web-content/hero-section-public (no auth)
                                └─▶ Hero component renders updated content
                                      (Next.js revalidates cache every 60s)
```

### 4.3 Booking Flow

```
Patient visits doctor profile
  └─▶ GET /public/doctors/{id}
        └─▶ Selects date
              └─▶ GET /public/availability/{id}/{date}
                    └─▶ Selects time slot
                          └─▶ Fills booking form
                                └─▶ POST /public/appointments/book-public
                                      └─▶ Appointment created
                                            └─▶ Shows in doctor's dashboard
```

---

## Part 5: Testing Strategy

### 5.1 Backend API Testing

- [ ] Test all public endpoints without authentication
- [ ] Verify CORS headers for homeo origin
- [ ] Test booking flow end-to-end
- [ ] Verify testimonial filtering by is_approved
- [ ] Test registration with all clinic fields

### 5.2 Frontend Integration Testing

- [ ] Homepage loads all content sections
- [ ] Doctor profile page displays correctly
- [ ] Booking form submits successfully
- [ ] Registration form creates pending account
- [ ] Testimonials show only approved items
- [ ] WhatsApp button generates correct URL

### 5.3 End-to-End Testing

- [ ] Complete doctor registration → approval → login flow
- [ ] Complete patient booking → confirmation flow
- [ ] Dashboard content edit → homeo display update
- [ ] Test with multiple doctors (content isolation)

---

## Part 6: Deployment Checklist

### 6.1 Backend Deployment

- [ ] Update CORS origins for production URLs
- [ ] Verify all public endpoints are accessible
- [ ] Test database migrations
- [ ] Configure environment variables
- [ ] Set up monitoring for public endpoints

### 6.2 Homeo Deployment

- [ ] Set NEXT_PUBLIC_API_URL to production backend
- [ ] Build and test production bundle
- [ ] Verify SSR works with API calls
- [ ] Test caching behavior (60s revalidation)
- [ ] Configure CDN if needed

### 6.3 Dashboard Deployment

- [ ] Set VITE_API_URL to production backend
- [ ] Build and test production bundle
- [ ] Verify authentication flow
- [ ] Test content management features

---

## Part 7: Risk Assessment

### High Risk Items

1. **Type Mismatches** - Could cause runtime errors
   - Mitigation: Complete type rewrite before testing
2. **API Endpoint Changes** - Breaking changes to homeo
   - Mitigation: Update all API calls in single PR
3. **CORS Issues** - Could block all API calls
   - Mitigation: Test CORS immediately after backend update

### Medium Risk Items

1. **Caching Issues** - Stale content on homeo site
   - Mitigation: Set appropriate revalidation times
2. **Testimonial Filtering** - Unapproved testimonials showing
   - Mitigation: Filter client-side until backend updated

### Low Risk Items

1. **Stats Endpoint** - Optional feature
   - Mitigation: Can be added later if needed

---

## Part 8: Timeline Estimate

### Week 1: Backend Updates

- Day 1-2: CORS configuration + optional stats endpoint
- Day 3: Testing all public endpoints
- Day 4-5: Documentation and API testing

### Week 2: Homeo Frontend Refactoring

- Day 1-2: API layer + type system rewrite
- Day 3-4: Component updates (homepage, profile, booking)
- Day 5: Registration flow update

### Week 3: Integration Testing

- Day 1-2: Unit testing updated components
- Day 3-4: End-to-end integration testing
- Day 5: Bug fixes and refinements

### Week 4: Deployment

- Day 1-2: Staging deployment and testing
- Day 3: Production deployment
- Day 4-5: Monitoring and hotfixes

---

## Part 9: Success Criteria

### Must Have (MVP)

- ✅ Homeo homepage loads with all content sections
- ✅ Doctor profile pages display correctly
- ✅ Booking form successfully creates appointments
- ✅ Registration creates pending doctor accounts
- ✅ Dashboard content updates reflect on homeo site

### Should Have

- ✅ Testimonials filtered by approval status
- ✅ WhatsApp button works correctly
- ✅ Proper error handling on all forms
- ✅ Loading states for async operations

### Nice to Have

- ⭕ Dynamic stats on homepage
- ⭕ Doctor-specific content filtering
- ⭕ Advanced caching strategies
- ⭕ Performance optimizations

---

## Appendix A: Key Files to Modify

### Backend

1. `cvp_backend/main.py` - CORS configuration
2. `cvp_backend/routes/public.py` - Optional stats endpoint
3. `cvp_backend/routes/web_content.py` - Optional testimonial filtering

### Homeo Frontend

1. `cvp_homeo/src/lib/api.ts` - Complete rewrite
2. `cvp_homeo/src/lib/types.ts` - Complete rewrite
3. `cvp_homeo/src/app/(marketing)/page.tsx` - Update API calls
4. `cvp_homeo/src/app/doctor/[id]/page.tsx` - Update API calls
5. `cvp_homeo/src/components/profile/BookingForm.tsx` - Update booking API
6. `cvp_homeo/src/components/profile/BookingSection.tsx` - Update availability API
7. `cvp_homeo/src/app/(marketing)/register/page.tsx` - Update registration API

### Configuration

1. `cvp_backend/.env` - CORS origins
2. `cvp_homeo/.env.local` - API URL
3. `cvp_dashboard/.env` - API URL

## Part 10: Critical Corrections Summary

### 🔴 Critical Error #1: UserRegister OpenAPI Schema
**Original Assessment:** "✅ Includes all required fields"  
**Reality:** Python model has fields, but `openapi.json` is stale and doesn't expose them  
**Impact:** Registration form will get 422 validation errors when sending clinic fields  
**Fix:** Task 1.0 - Regenerate schema by running backend once

### 🔴 Critical Error #2: BookingForm Hardcoded Time
**Original Code:** `appointment_time: "09:00", // TODO: Get from slot picker`  
**Reality:** This is blocking - will cause booking failures if 09:00 slot is booked  
**Impact:** Users cannot book appointments at their selected time  
**Fix:** Task 2.5 updated - Lift `selectedSlot` state to parent component, pass to BookingForm

### 🟡 Correction #3: Testimonial Filtering Approach
**Original Code:** Mutates SQLModel ORM objects in-place  
**Reality:** This will dirty the session or silently fail  
**Impact:** Backend errors or incorrect data returned  
**Fix:** Task 1.3 updated - Use `model_dump()` approach or keep client-side filtering (recommended)

---

---

## Appendix B: API Endpoint Reference

### Public Endpoints (No Auth)

```
GET  /public/doctors
GET  /public/doctors/{doctor_id}
GET  /public/availability/{doctor_id}/{date}
POST /public/appointments/book-public
GET  /web-content/hero-section-public
GET  /web-content/about-doctor-public
GET  /web-content/services-public
GET  /web-content/testimonials-public
GET  /web-content/contact-info-public
POST /users/signup
```

### Authenticated Endpoints (JWT Required)

```
PATCH /users/me
POST  /web-content/hero-section
PUT   /web-content/hero-section/{id}
POST  /web-content/about-doctor
PUT   /web-content/about-doctor/{id}
POST  /web-content/services
PUT   /web-content/services/{id}
POST  /web-content/testimonials
PUT   /web-content/testimonials/{id}
POST  /web-content/contact-info
PUT   /web-content/contact-info/{id}
```

---

**End of Integration Plan**
