# CASE VAULT PRO

## homeo.casevaultpro.com

# Marketing Website — Complete Product Design Plan

**Sitemap · Page Structure · Branding · UX Flows · Codebase Architecture**

---

**Prepared:** May 2026

**Status:** Ready for Development

---

## ◆ SECTION 1 ◆

## Strategic Overview

### 1.1 Project Identity

This document defines the complete design and development plan for the marketing and booking website operating under homeo.casevaultpro.com. This is the public-facing digital presence for Case Vault Pro's homeopathy vertical — the first domain specialty to launch under the CVP umbrella.

|                          |                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Parent Brand**         | Case Vault Pro (casevaultpro.com)                                                                                   |
| **This Sub-Brand**       | CVP Homeopathy — homeo.casevaultpro.com                                                                             |
| **Core Purpose**         | Market the platform to doctors (primary) and patients (secondary). Drive doctor registrations and patient bookings. |
| **Geography (Launch)**   | Pakistan — Karachi, Lahore, Islamabad (expandable)                                                                  |
| **Registration Flow**    | homeo.casevaultpro.com/register (dedicated page, within unified cvp/ codebase)                                      |
| **Doctor Profile Pages** | homeo.casevaultpro.com/dr-[slug] — lives on marketing site, powered by backend web_content API                      |

### 1.2 Dual Audience Strategy

The website must speak to two very different audiences simultaneously. The navigation and hero section are the critical battleground where this split is managed.

| **DOCTORS (Primary Target)**                                                                   | **PATIENTS (Secondary Target)**                                 |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Goal:** Get them to register on the platform                                                 | **Goal:** Get them to find and book a doctor                    |
| **Pain Point:** Manual records, no digital presence, no online bookings                        | **Pain Point:** Hard to find trusted homeopathic doctors nearby |
| **CTA:** Join as a Doctor → /register                                                          | **CTA:** Find a Doctor → /doctors                               |
| **Value Prop:** Digitalize your practice, get your own website, manage patients from one place | **Value Prop:** Verified doctors, easy booking, natural healing |

---

## ◆ SECTION 2 ◆

## Brand Identity & Visual Direction

### 2.1 Sub-Brand Philosophy

CVP Homeopathy inherits the trustworthiness and professionalism of Case Vault Pro but expresses a warmer, nature-rooted identity. Think of it as: same family, different personality. The parent brand (CVP) is clinical and navy-dark. The homeopathy sub-brand is earthy, green, and healing-forward — while still clearly wearing the CVP badge.

### 2.2 Color Palette

| Role         | Color Name      | Hex     | Usage                                               |
| ------------ | --------------- | ------- | --------------------------------------------------- |
| Primary      | Forest Green    | #2D7A4F | CTAs, headings, active nav, icons                   |
| Primary Dark | Deep Canopy     | #1A3C2E | Hero backgrounds, footer, large headings            |
| Accent       | Warm Gold       | #C9A84C | Badges, highlights, trust signals                   |
| Parent Brand | CVP Navy        | #1B2B4B | Navbar badge 'by Case Vault Pro', footer brand mark |
| Background   | Parchment White | #FAFAF7 | Page background — slightly warm, not pure white     |
| Surface      | Sage Tint       | #E8F5EE | Card backgrounds, section alternators               |

### 2.3 Typography

| Role                      | Font             | Weight / Style                            |
| ------------------------- | ---------------- | ----------------------------------------- |
| Display / Hero Headings   | Playfair Display | 700 Bold — conveys heritage and authority |
| Section Headings (H2, H3) | Inter            | 600 SemiBold — clean, modern              |
| Body Text                 | Inter            | 400 Regular — readable, neutral           |
| UI Labels / Badges        | Inter            | 500 Medium, uppercase letter-spacing      |

### 2.4 Visual Language

- **Imagery:** Real doctors in natural light settings. Herbs, plants, mortar & pestle. Pakistani contexts where possible.
- **Iconography:** Outlined, rounded icons (Lucide or Phosphor). No flat clipart.
- **Illustrations:** Soft, organic shapes as section dividers — leaf curves, gentle waves.
- **Cards:** Rounded corners (12–16px radius), subtle drop shadows, warm white backgrounds.
- **Buttons:** Pill-shaped primary CTAs in Forest Green. Ghost/outline secondary buttons.
- **Photography:** Avoid stock-photo clichés. Prioritize trust — smiling doctors, caring consultations.

---

## ◆ SECTION 3 ◆

## Complete Sitemap

### 3.1 URL Structure

All routes live under homeo.casevaultpro.com. The codebase is unified within the cvp/ directory. Doctor profile pages are dynamic routes powered by the backend public API.

| Route            | Page Name                     | Audience | Backend Dependency                          |
| ---------------- | ----------------------------- | -------- | ------------------------------------------- |
| /                | Homepage                      | Both     | GET /public/doctors (featured)              |
| /doctors         | Find a Doctor (Directory)     | Patients | GET /public/doctors?city=&specialty=        |
| /doctors/[city]  | City Listing Page             | Patients | GET /public/doctors?city=karachi            |
| /dr-[slug]       | Doctor Personal Profile Page  | Patients | GET /public/doctors/{id} + web_content API  |
| /register        | Doctor Registration           | Doctors  | POST /users/ (registration + approval flow) |
| /how-it-works    | Platform Explainer            | Both     | Static                                      |
| /about           | About Case Vault Pro / Homeo  | Both     | Static                                      |
| /community       | Community & Blog              | Both     | Static (Phase 1) / CMS (Phase 2)            |
| /for-doctors     | Doctor Value Proposition Page | Doctors  | Static                                      |
| /for-patients    | Patient Guide Page            | Patients | Static                                      |
| /cities          | Cities Landing Hub            | Patients | Static + links to /doctors/[city]           |
| /privacy, /terms | Legal Pages                   | Both     | Static                                      |

---

## ◆ SECTION 4 ◆

## Homepage — Section-by-Section Breakdown

The homepage is the most critical page. It must simultaneously win over a homeopathic doctor browsing to evaluate the platform AND a patient looking for a trusted doctor. Below is the complete section plan in order, with layout, content, and backend integration notes.

### Section 1 — Navigation Bar (Sticky)

| Element               | Detail                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| **Left: Logo**        | CVP Homeopathy leaf-mark logo. Small 'by Case Vault Pro' in CVP Navy underneath.                |
| **Center: Nav Links** | Find a Doctor \| How It Works \| For Doctors \| Community \| About                              |
| **Right: Dual CTAs**  | [Are You a Patient? → /doctors] ghost button + [Join as a Doctor → /register] green pill button |
| **Scroll Behaviour**  | Transparent on hero, white+shadow on scroll. Sticky.                                            |
| **Mobile**            | Hamburger menu. Both CTAs visible at bottom of mobile drawer.                                   |

### Section 2 — Hero

| Element             | Detail                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Background**      | Deep Canopy (#1A3C2E) with subtle organic leaf-pattern overlay. Full-width, 80vh height.                                                       |
| **Headline**        | Playfair Display 64px: 'Pakistan's Homeopathic Doctors, Now Digital.' (White)                                                                  |
| **Sub-headline**    | Inter 20px: 'Find a verified homeopathic doctor near you — or bring your practice online with your own digital clinic.' (Sage tint)            |
| **Split CTA Block** | Two equal cards side-by-side:<br>[I'm a Patient] → search bar (city + specialty) → /doctors<br>[I'm a Doctor] → 'Join as a Doctor' → /register |
| **Trust Bar**       | Below CTA: '✓ Verified Doctors ✓ Easy Online Booking ✓ Natural & Holistic Care ✓ Free to Join for Doctors'                                     |

### Section 3 — Social Proof Stats Bar

Full-width sage-tint (#E8F5EE) strip. 4 stats in a row with large numbers and short labels. Animated count-up on scroll.

| Stat      | Label                          |
| --------- | ------------------------------ |
| 500+      | Registered Homeopathic Doctors |
| 3 Cities  | Karachi · Lahore · Islamabad   |
| 10,000+   | Patient Records Managed        |
| 100% Free | For Doctors to Join            |

### Section 4 — Featured Doctors (City-wise)

| Element                        | Detail                                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Heading**                    | 'Find Homeopathic Doctors Near You'                                                                                                                     |
| **City Tabs**                  | Karachi \| Lahore \| Islamabad — active tab filters the doctor cards below. URL updates to /doctors/karachi.                                            |
| **Doctor Cards (Grid: 3 col)** | Profile photo, Name, Degree (BHMS/DHMS etc.), Specialties (tags), Years Experience, Rating stars, City, [Book Appointment] button, [View Profile] link. |
| **Card Hover**                 | Slight lift shadow + green border. Book Appointment CTA appears prominently.                                                                            |
| **Backend**                    | GET /public/doctors?city={selectedCity}&limit=6. Sort by rating or approval date.                                                                       |
| **CTA**                        | 'See All Doctors in {City}' → /doctors/[city]. 'Browse All Cities' → /doctors.                                                                          |

### Section 5 — How It Works (Dual Track)

Two-column layout or tabbed: 'For Patients' and 'For Doctors'. Step-by-step with numbered icons and illustrations.

**FOR PATIENTS**

1. Search for a homeopathic doctor by city or specialty
2. View their profile, qualifications, services, and availability
3. Book an appointment online or via WhatsApp
4. Visit the clinic — your records are ready digitally

**FOR DOCTORS**

1. Register your practice on Case Vault Pro Homeopathy
2. Your profile and personal clinic website go live instantly
3. Patients find you, book appointments, and you manage everything from the dashboard
4. Prescriptions, follow-ups, case records — all digital, all in one place

### Section 6 — Platform Features (For Doctors)

Section background: Deep Canopy (#1A3C2E). White text. Headline: 'Everything a Homeopathic Practice Needs.' 3x2 feature grid with icons.

| Feature                          | Description                                                                                                           |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Your Own Clinic Website**      | Every doctor gets a personalized website at homeo.casevaultpro.com/dr-[name] — fully customizable from the dashboard. |
| **Digital Patient Records**      | Complete case taking, prescriptions, and follow-up history for every patient. No more paper files.                    |
| **Online Appointment Booking**   | Patients book slots based on your live availability. You get notified instantly.                                      |
| **Homeopathic Medicine Catalog** | Searchable database of remedies by kingdom, symptoms, and rubrics. Add your favorites.                                |
| **Finance Tracking**             | Cash book, transactions, and financial summaries — built specifically for clinic use.                                 |
| **Onsite Walk-in Flow**          | Register a walk-in patient, take the case, write the prescription, schedule follow-up — all in one step.              |

### Section 7 — Doctor Personal Website Spotlight

A dedicated visual showcase section proving that every doctor gets their own complete professional website. This is a major differentiator and a strong reason for doctors to sign up.

| Element                          | Detail                                                                                                                                                           |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Headline**                     | 'Your Own Professional Website — Included.'                                                                                                                      |
| **Sub-text**                     | 'No technical skills needed. Customize your hero, services, testimonials, and booking form — all from your dashboard.'                                           |
| **Visual**                       | Browser mockup showing a sample doctor personal page (based on the existing homeo_doctor_personal_page module). Animated section transitions.                    |
| **Customizable Sections Listed** | Hero banner · Stats (patients, experience, success rate) · Book Appointment form · Services & Treatments · About Doctor · Patient Testimonials · Contact & Hours |
| **CTA**                          | 'Claim Your Free Clinic Website' → /register                                                                                                                     |

### Section 8 — Community Section

| Element                | Detail                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Headline**           | 'Join a Growing Community of Homeopathic Practitioners'                                                                         |
| **Phase 1 Content**    | 3 doctor testimonial cards (photo, name, city, quote about the platform). Static content, real doctors.                         |
| **Phase 2 Expansion**  | Community forum, health articles written by doctors on the platform, case discussion threads (anonymized).                      |
| **Blog Preview Cards** | 3 health articles — e.g. 'What is Homeopathy?', 'How to Choose the Right Remedy', 'Homeopathy for Children'. Static MDX or CMS. |
| **CTA**                | 'Read More Articles' → /community. 'Join as a Doctor' → /register.                                                              |

### Section 9 — Patient Success Stories

Testimonial carousel with 3–5 patient quotes. Name, city, doctor visited. Star rating. Background: warm sage (#E8F5EE). This section uses static data at launch, real testimonials added as platform grows.

### Section 10 — City Explorer

Visual city cards — Karachi, Lahore, Islamabad. Each card shows the city skyline/icon, number of doctors available, and links to /doctors/[city]. Designed to reinforce local trust.

### Section 11 — Final Conversion CTA (Split)

Two-panel full-width section. Left panel for doctors (Deep Canopy background): 'Ready to Digitalize Your Practice?' + Join as a Doctor button. Right panel for patients (Forest Green background): 'Looking for a Homeopathic Doctor?' + Find a Doctor button.

### Section 12 — Footer

| Column                  | Content                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------- |
| **Col 1: Brand**        | CVP Homeopathy logo. 'A Case Vault Pro Product.' Tagline. WhatsApp contact link.        |
| **Col 2: For Patients** | Find a Doctor · Karachi Doctors · Lahore Doctors · Islamabad Doctors · Book Appointment |
| **Col 3: For Doctors**  | Join as a Doctor · How It Works · Features · Doctor Dashboard Login                     |
| **Col 4: Company**      | About Us · Community · Privacy Policy · Terms of Service · Contact                      |
| **Bottom Bar**          | © 2026 Case Vault Pro. All rights reserved. \| Built for Homeopathic Practitioners.     |

---

## ◆ SECTION 5 ◆

## Key Page Specifications

### 5.1 /register — Doctor Registration Page

This is the most business-critical page. A doctor who reaches here must be converted. The page should feel professional and trustworthy, not form-heavy.

| Form Step                   | Fields                                                                                                                          | Backend                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **Step 1: Personal Info**   | Full Name, Email, Phone Number, Password, Confirm Password                                                                      | POST /users/                   |
| **Step 2: Practice Info**   | Clinic Name, City (Karachi/Lahore/Islamabad), Qualification (BHMS/DHMS/Other), Years of Experience, Specialties                 | POST /users/ (extended fields) |
| **Step 3: Review & Submit** | Summary of entered details. Agree to Terms checkbox. Submit button.                                                             | Triggers approval workflow     |
| **Success State**           | 'Registration submitted! Our team will review and approve your account within 24 hours. You will receive a confirmation email.' | Email via SMTP templates       |

**Layout:** Left half = multi-step form with progress indicator. Right half = value reinforcement (doctor website preview, feature checklist, testimonial from a doctor). This removes doubt while the form is being filled.

### 5.2 /doctors — Doctor Directory

| Element            | Detail                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Page Header**    | Search bar: 'Find a homeopathic doctor in...' with city dropdown and specialty text search.                         |
| **Filter Sidebar** | City (multi-select), Specialty, Experience Range, Availability (Today / This Week), Gender preference.              |
| **Doctor Cards**   | Same card design as homepage. Sorted by city-relevance then rating.                                                 |
| **Pagination**     | Infinite scroll or numbered pagination. 12 doctors per page.                                                        |
| **Empty State**    | 'No doctors found in this city yet. We're growing! Register as a doctor or check another city.'                     |
| **SEO**            | Dynamic meta: 'Homeopathic Doctors in Karachi \| Book Online \| CVP Homeopathy'. Each city page indexed separately. |
| **Backend**        | GET /public/doctors with query params: city, specialty, skip, limit                                                 |

### 5.3 /dr-[slug] — Doctor Personal Profile Page

This page is generated from the doctor's own web_content configuration set in their dashboard. The backend already has all models: HeroSection, AboutDoctor, Services, Testimonials. The marketing site renders this as a public-facing professional profile.

| Section                     | Content Source                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Hero (Banner + Stats)**   | HeroSection model — background, name, tagline, stats (experience, patients, success rate)              |
| **Book Appointment Form**   | Inline booking: Name, Phone, Gender, Date, Problem Description → POST /public/appointments/{doctor_id} |
| **Services & Treatments**   | Services model — name, description, image                                                              |
| **About Doctor**            | AboutDoctor model — qualifications, specializations, story                                             |
| **Patient Testimonials**    | Testimonials model — patient name, rating, text                                                        |
| **Working Hours & Contact** | DoctorAvailability API + doctor profile contact fields                                                 |
| **WhatsApp Button**         | Sticky floating button — direct WhatsApp contact link if phone number set.                             |

---

## ◆ SECTION 6 ◆

## Critical UX Flows

### 6.1 Doctor Registration Flow

| Step | User Action                                    | System Response                                                        |
| ---- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| 1    | Clicks 'Join as a Doctor' anywhere on homepage | Navigates to /register. Progress indicator shows Step 1 of 3.          |
| 2    | Fills personal info (Step 1)                   | Real-time Zod validation. Email uniqueness check on blur.              |
| 3    | Fills practice info (Step 2)                   | City dropdown pre-populated. Qualification multi-select.               |
| 4    | Reviews and submits (Step 3)                   | POST /users/ called. 201 response → Success state shown.               |
| 5    | Doctor receives email                          | SMTP email: 'Your account is under review. Approval within 24h.'       |
| 6    | Admin approves via CVP Dashboard               | Doctor receives approval email with dashboard login link.              |
| 7    | Doctor logs into dashboard                     | Customizes personal website, sets availability, starts using platform. |

### 6.2 Patient Appointment Booking Flow

| Step | User Action                                                             | System Response                                                                     |
| ---- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1    | Patient visits homepage, clicks 'Are You a Patient?' or uses search bar | Navigates to /doctors or /doctors/[city]                                            |
| 2    | Browses doctor cards, filters by city/specialty                         | GET /public/doctors filtered results                                                |
| 3    | Clicks doctor card → views /dr-[slug]                                   | Full doctor personal profile loaded from web_content API                            |
| 4    | Fills booking form on doctor profile page                               | Checks doctor availability via GET /public/availability/{doctor_id}                 |
| 5    | Submits booking                                                         | POST /public/appointments/{doctor_id}. Confirmation shown with appointment details. |
| 6    | Receives confirmation                                                   | Doctor notified. Patient can save appointment details.                              |

---

## ◆ SECTION 7 ◆

## Codebase Architecture

### 7.1 Unified Directory Structure

As clarified, the entire system lives inside the cvp/ directory. The marketing website for homeo.casevaultpro.com is a separate app within that mono-repo structure, alongside the dashboard and other CVP modules.

**Recommended structure:**

| Path                                          | Purpose                                                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------------------- |
| cvp/                                          | Mono-repo root                                                                          |
| cvp/cvp_backend/                              | FastAPI backend (existing — no changes needed)                                          |
| cvp/cvp_dashboard/                            | React 19 doctor/admin dashboard (existing)                                              |
| cvp/homeo_web/                                | NEW — Marketing & booking website (homeo.casevaultpro.com)                              |
| cvp/homeo_web/src/                            | Source root                                                                             |
| cvp/homeo_web/src/app/                        | Next.js App Router pages                                                                |
| cvp/homeo_web/src/app/page.tsx                | Homepage (/)                                                                            |
| cvp/homeo_web/src/app/doctors/page.tsx        | Doctor directory (/doctors)                                                             |
| cvp/homeo_web/src/app/doctors/[city]/page.tsx | City listing (/doctors/karachi)                                                         |
| cvp/homeo_web/src/app/dr-[slug]/page.tsx      | Doctor personal profile page                                                            |
| cvp/homeo_web/src/app/register/page.tsx       | Doctor registration (/register)                                                         |
| cvp/homeo_web/src/app/how-it-works/page.tsx   | Platform explainer                                                                      |
| cvp/homeo_web/src/app/community/page.tsx      | Community & blog                                                                        |
| cvp/homeo_web/src/components/                 | Shared React components                                                                 |
| cvp/homeo_web/src/components/layout/          | Navbar, Footer, Layout wrapper                                                          |
| cvp/homeo_web/src/components/home/            | Homepage sections (Hero, Stats, DoctorGrid, Features, Community, CTA)                   |
| cvp/homeo_web/src/components/doctors/         | DoctorCard, DoctorFilters, DoctorGrid, CityTabs                                         |
| cvp/homeo_web/src/components/profile/         | Doctor personal page sections (ProfileHero, BookingForm, Services, About, Testimonials) |
| cvp/homeo_web/src/components/register/        | Multi-step registration form (Step1, Step2, Step3, SuccessState)                        |
| cvp/homeo_web/src/lib/api.ts                  | API client — calls CVP Backend public endpoints                                         |
| cvp/homeo_web/src/lib/types.ts                | TypeScript types (shared with dashboard where possible)                                 |
| cvp/homeo_web/src/styles/                     | Global CSS, Tailwind config, brand tokens                                               |

### 7.2 Technology Stack Recommendation

| Layer             | Technology                                     | Reason                                                                                              |
| ----------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Framework**     | Next.js 15 (App Router)                        | SSR/SSG for SEO. Doctor profile pages statically generated at build time. Homepage server-rendered. |
| **Styling**       | Tailwind CSS 4 (matching dashboard)            | Consistent with existing cvp_dashboard setup. Faster development.                                   |
| **UI Components** | Radix UI + custom (matching dashboard)         | Accessibility built-in. Consistent component primitives across both apps.                           |
| **Forms**         | React Hook Form + Zod (matching dashboard)     | Same validation patterns. Types reusable.                                                           |
| **Data Fetching** | Next.js fetch + TanStack Query for client-side | Server components fetch doctor data at request time. Client components handle booking forms.        |
| **Animation**     | Framer Motion                                  | Scroll-triggered animations, count-up stats, page transitions.                                      |
| **SEO**           | Next.js Metadata API                           | Dynamic OG tags per doctor profile page. City pages indexed.                                        |
| **Icons**         | Lucide React (matching dashboard)              | Unified icon system.                                                                                |
| **Fonts**         | next/font — Playfair Display + Inter           | Optimized loading. No layout shift.                                                                 |

### 7.3 Key API Integrations (Public Endpoints Used)

| Endpoint                              | Used By                                                      | Page                         |
| ------------------------------------- | ------------------------------------------------------------ | ---------------------------- |
| GET /public/doctors                   | Doctor directory, city listing, homepage featured            | /doctors, /doctors/[city], / |
| GET /public/doctors/{id}              | Doctor profile data                                          | /dr-[slug]                   |
| GET /public/availability/{doctor_id}  | Available slots for booking form                             | /dr-[slug]                   |
| POST /public/appointments/{doctor_id} | Patient books appointment                                    | /dr-[slug]                   |
| POST /users/                          | Doctor registration                                          | /register                    |
| GET /web_content/{doctor_id}/\*       | Hero, Services, About, Testimonials for doctor personal page | /dr-[slug]                   |

---

## ◆ SECTION 8 ◆

## Phased Development Roadmap

| Phase                     | Scope                                                                                                                                                          | Est. Duration |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Phase 1 — Core Launch** | Homepage · Doctor Directory (/doctors) · City Pages · Doctor Registration (/register) · Doctor Profile Page (/dr-[slug]) · Navbar & Footer · Mobile responsive | 4–6 Weeks     |
| **Phase 2 — Growth**      | Community / Blog section · How It Works page · For Doctors page · For Patients page · Patient testimonials carousel · About page · SEO optimization            | 2–3 Weeks     |
| **Phase 3 — Scale**       | Analytics integration · CMS for blog · More city pages · Doctor profile page A/B testing · Patient account login · Rating & review system                      | Ongoing       |

### Phase 1 Component Build Order

Build in this sequence to unblock booking functionality as fast as possible:

| #   | Component / Page                                              | Priority               |
| --- | ------------------------------------------------------------- | ---------------------- |
| 1   | Project setup: Next.js 15, Tailwind 4, brand tokens, fonts    | BLOCKER                |
| 2   | lib/api.ts — CVP Backend public API client                    | BLOCKER                |
| 3   | Navbar + Footer (layout wrapper)                              | HIGH                   |
| 4   | Doctor Registration Page (/register) — 3-step form            | HIGH                   |
| 5   | Doctor Directory (/doctors) — list + filters                  | HIGH                   |
| 6   | Doctor Profile Page (/dr-[slug]) — personal website rendering | HIGH                   |
| 7   | Homepage — all 12 sections                                    | MEDIUM                 |
| 8   | City pages (/doctors/karachi, /lahore, /islamabad)            | MEDIUM                 |
| 9   | Mobile responsiveness pass                                    | HIGH (before launch)   |
| 10  | SEO metadata, OG tags, sitemap.xml                            | MEDIUM (before launch) |

---

## ◆ SECTION 9 ◆

## Open Decisions & Recommendations

| Decision                            | Options                                                                   | Recommendation                                                                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sub-brand name**                  | Use 'CVP Homeopathy' vs create a distinct name like 'HealPath by CVP'     | Use 'CVP Homeopathy' at launch. Simpler, leverages parent brand trust. Rename later if needed.                                                                      |
| **Doctor profile URL slug**         | /dr-john-smith vs /doctors/john-smith vs /john-smith                      | Use /dr-[slug] — clearly identifies doctor pages, SEO-friendly, avoids conflicts.                                                                                   |
| **Blog / Community Phase 1**        | Static MDX files vs headless CMS (Sanity/Contentful) vs skip              | Static MDX for Phase 1. No external dependency, fast. Move to CMS in Phase 3.                                                                                       |
| **Patient login on marketing site** | Allow patients to log in to see booking history, or keep site public-only | Phase 1: No patient login. Public booking only. Add patient accounts in Phase 3.                                                                                    |
| **Domain for other specialties**    | Same brand identity vs slightly differentiated                            | Establish the design system with homeo.casevaultpro.com first. Future: allopathy.casevaultpro.com uses same system, different accent color (blue instead of green). |

---

## END OF DOCUMENT

**Case Vault Pro — homeo.casevaultpro.com — Marketing Website Design Plan**
