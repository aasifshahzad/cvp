# CVP Homeopathy Marketing Website - Implementation Plan

## Project Overview

**Domain:** homeo.casevaultpro.com  
**Location:** `cvp_homeo/` directory  
**Framework:** Next.js 15 (App Router)  
**Target Audience:** Homeopathic doctors (primary) and patients (secondary)  
**Launch Cities:** Karachi, Lahore, Islamabad (Pakistan)

---

## Architecture Overview

```
cvp_homeo/
├── public/                          # Static assets
│   ├── images/                      # Brand images, icons, doctor photos
│   ├── fonts/                       # Playfair Display, Inter
│   └── favicon.ico
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Homepage
│   │   ├── doctors/
│   │   │   ├── page.tsx             # Doctor directory
│   │   │   └── [city]/page.tsx      # City-specific listings
│   │   ├── dr-[slug]/page.tsx       # Doctor profile pages
│   │   ├── register/page.tsx        # Doctor registration
│   │   ├── how-it-works/page.tsx
│   │   ├── for-doctors/page.tsx
│   │   ├── for-patients/page.tsx
│   │   ├── about/page.tsx
│   │   ├── community/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Sticky navigation
│   │   │   ├── Footer.tsx           # Multi-column footer
│   │   │   └── MobileMenu.tsx       # Hamburger menu
│   │   ├── home/
│   │   │   ├── Hero.tsx             # Dual-audience hero
│   │   │   ├── StatsBar.tsx         # Social proof stats
│   │   │   ├── FeaturedDoctors.tsx  # City-tabbed doctors
│   │   │   ├── HowItWorks.tsx       # Dual-track explainer
│   │   │   ├── PlatformFeatures.tsx # 6-feature grid
│   │   │   ├── WebsiteSpotlight.tsx # Doctor website showcase
│   │   │   ├── Community.tsx        # Testimonials + blog
│   │   │   ├── SuccessStories.tsx   # Patient testimonials
│   │   │   ├── CityExplorer.tsx     # City cards
│   │   │   └── FinalCTA.tsx         # Split conversion panel
│   │   ├── doctors/
│   │   │   ├── DoctorCard.tsx       # Reusable doctor card
│   │   │   ├── DoctorGrid.tsx       # Grid layout
│   │   │   ├── SearchBar.tsx        # City + specialty search
│   │   │   ├── FilterSidebar.tsx    # Advanced filters
│   │   │   └── CityTabs.tsx         # City filter tabs
│   │   ├── profile/
│   │   │   ├── ProfileHero.tsx      # Doctor banner + stats
│   │   │   ├── BookingForm.tsx      # Appointment booking
│   │   │   ├── ServicesSection.tsx  # Services grid
│   │   │   ├── AboutSection.tsx     # Doctor bio
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── ContactSection.tsx   # Hours + contact
│   │   │   └── WhatsAppButton.tsx   # Floating button
│   │   ├── register/
│   │   │   ├── RegistrationForm.tsx # Multi-step wrapper
│   │   │   ├── Step1Personal.tsx    # Personal info
│   │   │   ├── Step2Practice.tsx    # Practice details
│   │   │   ├── Step3Review.tsx      # Review + submit
│   │   │   ├── SuccessState.tsx     # Confirmation
│   │   │   ├── ProgressIndicator.tsx
│   │   │   └── ValueSidebar.tsx     # Reinforcement content
│   │   └── ui/                      # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Badge.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── api.ts                   # API client for backend
│   │   ├── types.ts                 # TypeScript types
│   │   ├── utils.ts                 # Utility functions
│   │   └── constants.ts             # App constants
│   ├── styles/
│   │   └── globals.css              # Global styles + Tailwind
│   └── hooks/
│       ├── useDoctor.ts             # Doctor data fetching
│       ├── useBooking.ts            # Booking logic
│       └── useSearch.ts             # Search functionality
├── .env.local                       # Environment variables
├── next.config.js                   # Next.js configuration
├── tailwind.config.ts               # Tailwind + brand tokens
├── tsconfig.json                    # TypeScript config
└── package.json                     # Dependencies
```

---

## Technology Stack

| Layer             | Technology            | Version  | Purpose                               |
| ----------------- | --------------------- | -------- | ------------------------------------- |
| **Framework**     | Next.js               | 15.x     | SSR/SSG, App Router, SEO optimization |
| **Language**      | TypeScript            | 5.x      | Type safety                           |
| **Styling**       | Tailwind CSS          | 4.x      | Utility-first CSS, matches dashboard  |
| **UI Components** | Radix UI              | Latest   | Accessible primitives                 |
| **Forms**         | React Hook Form + Zod | Latest   | Form validation, matches dashboard    |
| **Data Fetching** | TanStack Query        | 5.x      | Client-side data management           |
| **Animation**     | Framer Motion         | Latest   | Scroll animations, transitions        |
| **Icons**         | Lucide React          | Latest   | Consistent with dashboard             |
| **Fonts**         | next/font             | Built-in | Playfair Display + Inter              |

---

## Brand Design System

### Color Palette

```typescript
// tailwind.config.ts
const colors = {
  primary: {
    DEFAULT: "#2D7A4F", // Forest Green
    dark: "#1A3C2E", // Deep Canopy
  },
  accent: {
    DEFAULT: "#C9A84C", // Warm Gold
  },
  parent: {
    DEFAULT: "#1B2B4B", // CVP Navy
  },
  background: {
    DEFAULT: "#FAFAF7", // Parchment White
  },
  surface: {
    DEFAULT: "#E8F5EE", // Sage Tint
  },
};
```

### Typography

```typescript
// Font configuration
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});
```

---

## API Integration

### Backend Endpoints

| Endpoint                                | Method | Purpose                   | Used By                         |
| --------------------------------------- | ------ | ------------------------- | ------------------------------- |
| `/public/doctors`                       | GET    | List doctors with filters | Directory, Homepage, City pages |
| `/public/doctors/{id}`                  | GET    | Get doctor details        | Profile page                    |
| `/public/availability/{doctor_id}`      | GET    | Get available slots       | Booking form                    |
| `/public/appointments/{doctor_id}`      | POST   | Book appointment          | Booking form                    |
| `/users/`                               | POST   | Doctor registration       | Registration page               |
| `/web_content/{doctor_id}/hero`         | GET    | Hero section data         | Profile page                    |
| `/web_content/{doctor_id}/services`     | GET    | Services data             | Profile page                    |
| `/web_content/{doctor_id}/about`        | GET    | About section data        | Profile page                    |
| `/web_content/{doctor_id}/testimonials` | GET    | Testimonials data         | Profile page                    |

### API Client Structure

```typescript
// src/lib/api.ts
export const api = {
  doctors: {
    list: (params: DoctorListParams) => Promise<Doctor[]>,
    getById: (id: string) => Promise<Doctor>,
    getBySlug: (slug: string) => Promise<Doctor>,
  },
  appointments: {
    create: (doctorId: string, data: AppointmentData) => Promise<Appointment>,
    getAvailability: (doctorId: string) => Promise<Availability[]>,
  },
  registration: {
    register: (data: RegistrationData) => Promise<RegistrationResponse>,
  },
  webContent: {
    getHero: (doctorId: string) => Promise<HeroSection>,
    getServices: (doctorId: string) => Promise<Service[]>,
    getAbout: (doctorId: string) => Promise<AboutDoctor>,
    getTestimonials: (doctorId: string) => Promise<Testimonial[]>,
  },
};
```

---

## Phase 1: Core Launch (4-6 Weeks)

### Week 1: Foundation Setup

#### Task 1.1: Project Initialization

```bash
# Create Next.js 15 project
npx create-next-app@latest cvp_homeo --typescript --tailwind --app --src-dir

# Install dependencies
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install react-hook-form @hookform/resolvers zod
npm install framer-motion lucide-react
npm install axios date-fns clsx tailwind-merge class-variance-authority
```

**Deliverables:**

- ✅ Next.js 15 project initialized
- ✅ TypeScript configured
- ✅ All dependencies installed
- ✅ Git repository initialized

#### Task 1.2: Brand System Configuration

**Files to create:**

- `tailwind.config.ts` - Color palette, typography, spacing
- `src/styles/globals.css` - Global styles, CSS variables
- `src/lib/fonts.ts` - Font configuration

**Deliverables:**

- ✅ Color system implemented
- ✅ Typography configured (Playfair Display + Inter)
- ✅ Design tokens defined
- ✅ Utility classes created

#### Task 1.3: API Client Setup

**Files to create:**

- `src/lib/api.ts` - API client with all endpoints
- `src/lib/types.ts` - TypeScript interfaces
- `src/lib/constants.ts` - API URLs, cities, etc.
- `.env.local` - Environment variables

**Deliverables:**

- ✅ API client functional
- ✅ Type definitions complete
- ✅ Error handling implemented
- ✅ Environment variables configured

### Week 2: Core Layout & Navigation

#### Task 2.1: Layout Components

**Components to build:**

1. `src/components/layout/Navbar.tsx`
   - Sticky positioning
   - Transparent on hero, white on scroll
   - Dual CTAs (Patient/Doctor)
   - Mobile hamburger menu

2. `src/components/layout/Footer.tsx`
   - 4-column layout
   - Brand, Patients, Doctors, Company sections
   - Social links, WhatsApp contact

3. `src/components/layout/MobileMenu.tsx`
   - Slide-in drawer
   - Full navigation
   - CTAs at bottom

**Deliverables:**

- ✅ Navbar with scroll behavior
- ✅ Footer with all links
- ✅ Mobile menu functional
- ✅ Responsive design

#### Task 2.2: Reusable UI Components

**Components to build:**

- `src/components/ui/Button.tsx` - Primary, secondary, ghost variants
- `src/components/ui/Card.tsx` - Rounded, shadowed cards
- `src/components/ui/Input.tsx` - Form inputs
- `src/components/ui/Select.tsx` - Dropdown selects
- `src/components/ui/Badge.tsx` - Tags, labels
- `src/components/ui/SearchBar.tsx` - City + specialty search

**Deliverables:**

- ✅ All UI components built
- ✅ Variants implemented
- ✅ Accessibility ensured
- ✅ Storybook documentation (optional)

### Week 3: Critical Pages

#### Task 3.1: Doctor Registration Page (`/register`)

**Components:**

1. `src/components/register/RegistrationForm.tsx` - Main wrapper
2. `src/components/register/Step1Personal.tsx` - Name, email, phone, password
3. `src/components/register/Step2Practice.tsx` - Clinic, city, qualification
4. `src/components/register/Step3Review.tsx` - Review + submit
5. `src/components/register/SuccessState.tsx` - Confirmation message
6. `src/components/register/ProgressIndicator.tsx` - Step indicator
7. `src/components/register/ValueSidebar.tsx` - Feature highlights

**Features:**

- Multi-step form with validation
- Real-time Zod validation
- Email uniqueness check
- Progress indicator
- Value reinforcement sidebar
- Success state with next steps

**Deliverables:**

- ✅ 3-step registration flow
- ✅ Form validation working
- ✅ API integration complete
- ✅ Success state implemented

#### Task 3.2: Doctor Directory Page (`/doctors`)

**Components:**

1. `src/components/doctors/SearchBar.tsx` - City + specialty search
2. `src/components/doctors/FilterSidebar.tsx` - Advanced filters
3. `src/components/doctors/DoctorCard.tsx` - Individual doctor card
4. `src/components/doctors/DoctorGrid.tsx` - Grid layout
5. `src/app/doctors/page.tsx` - Main page

**Features:**

- Search by city and specialty
- Filter by experience, availability, gender
- Pagination (12 per page)
- Empty state handling
- SEO optimization

**Deliverables:**

- ✅ Search functionality
- ✅ Filters working
- ✅ Doctor cards displaying
- ✅ Pagination implemented

#### Task 3.3: City Listing Pages (`/doctors/[city]`)

**Files:**

- `src/app/doctors/[city]/page.tsx` - Dynamic city page

**Features:**

- Pre-filtered by city
- City-specific meta tags
- Breadcrumb navigation
- "See all cities" link

**Deliverables:**

- ✅ Dynamic routing working
- ✅ City filtering functional
- ✅ SEO metadata per city

### Week 4: Doctor Profile Pages

#### Task 4.1: Doctor Profile Page (`/dr-[slug]`)

**Components:**

1. `src/components/profile/ProfileHero.tsx` - Banner, name, stats
2. `src/components/profile/BookingForm.tsx` - Appointment form
3. `src/components/profile/ServicesSection.tsx` - Services grid
4. `src/components/profile/AboutSection.tsx` - Doctor bio
5. `src/components/profile/TestimonialsSection.tsx` - Patient reviews
6. `src/components/profile/ContactSection.tsx` - Hours, location
7. `src/components/profile/WhatsAppButton.tsx` - Floating button

**Features:**

- Dynamic content from web_content API
- Inline booking form
- Availability checking
- WhatsApp integration
- Responsive design

**Deliverables:**

- ✅ Profile page rendering
- ✅ Booking form functional
- ✅ All sections displaying
- ✅ WhatsApp button working

### Week 5-6: Homepage

#### Task 5.1: Homepage Sections

**Components to build (in order):**

1. **Hero Section** (`src/components/home/Hero.tsx`)
   - Deep Canopy background with leaf pattern
   - Dual-audience headline
   - Split CTA cards (Patient/Doctor)
   - Trust bar with checkmarks

2. **Stats Bar** (`src/components/home/StatsBar.tsx`)
   - 4 stats with count-up animation
   - Sage tint background
   - Responsive grid

3. **Featured Doctors** (`src/components/home/FeaturedDoctors.tsx`)
   - City tabs (Karachi, Lahore, Islamabad)
   - 3-column doctor grid
   - "See all" CTAs

4. **How It Works** (`src/components/home/HowItWorks.tsx`)
   - Dual-track (Patients/Doctors)
   - 4 steps each with icons
   - Tabbed or side-by-side layout

5. **Platform Features** (`src/components/home/PlatformFeatures.tsx`)
   - Deep Canopy background
   - 3x2 feature grid with icons
   - White text

6. **Website Spotlight** (`src/components/home/WebsiteSpotlight.tsx`)
   - Browser mockup
   - Animated section transitions
   - Feature list
   - CTA to register

7. **Community Section** (`src/components/home/Community.tsx`)
   - Doctor testimonials (3 cards)
   - Blog preview cards (3 articles)
   - CTAs to community page

8. **Success Stories** (`src/components/home/SuccessStories.tsx`)
   - Patient testimonial carousel
   - Star ratings
   - Sage background

9. **City Explorer** (`src/components/home/CityExplorer.tsx`)
   - 3 city cards
   - Doctor count per city
   - Links to city pages

10. **Final CTA** (`src/components/home/FinalCTA.tsx`)
    - Split panel (Doctor/Patient)
    - Different backgrounds
    - Large CTAs

**Deliverables:**

- ✅ All 12 homepage sections built
- ✅ Animations implemented
- ✅ API integration complete
- ✅ Mobile responsive

---

## Phase 2: Growth Features (2-3 Weeks)

### Week 7: Static Content Pages

#### Task 7.1: Information Pages

**Pages to create:**

1. `/how-it-works` - Platform explainer with visuals
2. `/for-doctors` - Doctor value proposition
3. `/for-patients` - Patient guide
4. `/about` - About CVP Homeopathy
5. `/privacy` - Privacy policy
6. `/terms` - Terms of service

**Deliverables:**

- ✅ All static pages created
- ✅ Content written
- ✅ SEO optimized

#### Task 7.2: Community & Blog

**Components:**

1. `src/app/community/page.tsx` - Community hub
2. `src/components/community/ArticleCard.tsx` - Blog post card
3. `src/components/community/TestimonialCard.tsx` - Doctor testimonial

**Content (Static MDX for Phase 1):**

- "What is Homeopathy?"
- "How to Choose the Right Remedy"
- "Homeopathy for Children"
- 3 doctor testimonials

**Deliverables:**

- ✅ Community page built
- ✅ 3 blog articles written
- ✅ Doctor testimonials added

### Week 8-9: Optimization

#### Task 8.1: SEO Enhancement

**Tasks:**

- Dynamic meta tags for all pages
- Open Graph images
- Structured data (JSON-LD)
- Sitemap.xml generation
- Robots.txt configuration

**Deliverables:**

- ✅ Meta tags on all pages
- ✅ OG images generated
- ✅ Structured data added
- ✅ Sitemap created

#### Task 8.2: Performance Optimization

**Tasks:**

- Image optimization (next/image)
- Code splitting
- Lazy loading
- Font optimization
- Bundle size analysis

**Deliverables:**

- ✅ Lighthouse score >90
- ✅ Images optimized
- ✅ Load time <3s

#### Task 8.3: Mobile Responsiveness Pass

**Tasks:**

- Test all pages on mobile
- Fix layout issues
- Optimize touch targets
- Test forms on mobile

**Deliverables:**

- ✅ All pages mobile-friendly
- ✅ Touch targets >44px
- ✅ Forms work on mobile

---

## Phase 3: Scale & Advanced Features (Ongoing)

### Analytics Integration

- Google Analytics 4
- Conversion tracking
- Heatmaps (Hotjar/Microsoft Clarity)
- A/B testing setup

### Patient Accounts

- Patient login/signup
- Booking history
- Saved doctors
- Profile management

### Rating & Review System

- Patient reviews
- Star ratings
- Review moderation
- Display on doctor profiles

### CMS Integration

- Headless CMS (Sanity/Contentful)
- Blog management
- Content editing
- Media library

---

## Development Guidelines

### Code Standards

1. **TypeScript**
   - Strict mode enabled
   - No `any` types
   - Proper interface definitions

2. **Component Structure**

   ```typescript
   // Component template
   interface ComponentProps {
     // Props definition
   }

   export function Component({ prop }: ComponentProps) {
     // Component logic
     return (
       // JSX
     )
   }
   ```

3. **File Naming**
   - Components: PascalCase (e.g., `DoctorCard.tsx`)
   - Utilities: camelCase (e.g., `formatDate.ts`)
   - Pages: lowercase (e.g., `page.tsx`)

4. **CSS Classes**
   - Use Tailwind utilities
   - Custom classes in globals.css
   - Component-specific styles via CSS modules if needed

### Git Workflow

1. **Branch Naming**
   - `feature/component-name`
   - `fix/bug-description`
   - `refactor/area-name`

2. **Commit Messages**
   - `feat: Add doctor registration form`
   - `fix: Resolve mobile menu issue`
   - `refactor: Improve API client structure`

3. **Pull Requests**
   - Clear description
   - Screenshots for UI changes
   - Link to related issues

### Testing Strategy

1. **Unit Tests**
   - Utility functions
   - API client methods
   - Form validation

2. **Integration Tests**
   - API integration
   - Form submissions
   - Navigation flows

3. **E2E Tests**
   - Critical user journeys
   - Registration flow
   - Booking flow

---

## Deployment Strategy

### Environment Setup

1. **Development**
   - Local Next.js dev server
   - Backend API on localhost or staging

2. **Staging**
   - Vercel preview deployment
   - Staging backend API
   - Test data

3. **Production**
   - Vercel production deployment
   - Production backend API
   - Real data

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.casevaultpro.com
NEXT_PUBLIC_SITE_URL=https://homeo.casevaultpro.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] SEO metadata verified
- [ ] Performance tested (Lighthouse)
- [ ] Mobile responsiveness verified
- [ ] Forms tested
- [ ] Analytics tracking verified
- [ ] Error handling tested
- [ ] 404 page created
- [ ] Sitemap generated

---

## Success Metrics

### Phase 1 Launch Goals

- **Doctor Registrations:** 50+ in first month
- **Patient Bookings:** 100+ in first month
- **Page Load Time:** <3 seconds
- **Mobile Traffic:** >60% of total
- **Bounce Rate:** <50%

### SEO Goals

- **Organic Traffic:** 1000+ visits/month by month 3
- **Keyword Rankings:** Top 10 for "homeopathic doctor [city]"
- **Backlinks:** 20+ quality backlinks by month 6

### User Experience Goals

- **Registration Completion Rate:** >70%
- **Booking Completion Rate:** >80%
- **Mobile Usability Score:** >90
- **Accessibility Score:** >95

---

## Risk Mitigation

### Technical Risks

| Risk           | Impact | Mitigation                                     |
| -------------- | ------ | ---------------------------------------------- |
| API downtime   | High   | Implement error boundaries, fallback UI        |
| Slow page load | Medium | Optimize images, code splitting, CDN           |
| Mobile issues  | High   | Test early and often, responsive design        |
| SEO problems   | Medium | Follow Next.js best practices, structured data |

### Business Risks

| Risk                 | Impact | Mitigation                                             |
| -------------------- | ------ | ------------------------------------------------------ |
| Low doctor signups   | High   | Strong value proposition, testimonials                 |
| Low patient bookings | High   | Featured doctors, easy booking flow                    |
| Competition          | Medium | Unique features (personal websites)                    |
| Trust issues         | High   | Verification badges, testimonials, professional design |

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Confirm API endpoints** are ready
3. **Gather assets** (logos, images, content)
4. **Set up development environment**
5. **Begin Phase 1, Week 1 tasks**

---

## Questions for Clarification

1. **Backend API:** Are all public endpoints documented and ready?
2. **Content:** Who will provide doctor testimonials and blog articles?
3. **Images:** Do we have professional photos of doctors and clinics?
4. **Domain:** Is homeo.casevaultpro.com DNS configured?
5. **Analytics:** Which analytics platform should we use?
6. **Email:** Is SMTP configured for registration confirmations?

---

**Document Version:** 1.0  
**Last Updated:** 2026-05-16  
**Status:** Ready for Implementation
