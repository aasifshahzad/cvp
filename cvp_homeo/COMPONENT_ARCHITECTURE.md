# CVP Homeopathy - Component Architecture

## Visual Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                         Root Layout                              │
│  (app/layout.tsx - Fonts, Metadata, Theme Provider)             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Page Layouts                                │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Navbar     │  │   Navbar     │  │   Navbar     │          │
│  │  (Sticky)    │  │  (Sticky)    │  │  (Sticky)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                 │                 │                    │
│         ▼                 ▼                 ▼                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Homepage   │  │   Doctors    │  │  Dr Profile  │          │
│  │   Content    │  │  Directory   │  │    Page      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                 │                 │                    │
│         ▼                 ▼                 ▼                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    Footer    │  │    Footer    │  │    Footer    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Homepage Component Tree

```
HomePage (app/page.tsx)
│
├── Hero
│   ├── Background (Deep Canopy + Leaf Pattern)
│   ├── Headline (Playfair Display)
│   ├── SubHeadline
│   ├── SplitCTABlock
│   │   ├── PatientCard
│   │   │   └── SearchBar (City + Specialty)
│   │   └── DoctorCard
│   │       └── Button → /register
│   └── TrustBar (4 checkmarks)
│
├── StatsBar
│   └── StatCard × 4 (with count-up animation)
│
├── FeaturedDoctors
│   ├── SectionHeading
│   ├── CityTabs (Karachi | Lahore | Islamabad)
│   ├── DoctorGrid
│   │   └── DoctorCard × 6
│   │       ├── ProfilePhoto
│   │       ├── DoctorInfo (Name, Degree, Specialties)
│   │       ├── RatingStars
│   │       └── CTAButtons (Book | View Profile)
│   └── ViewAllCTA
│
├── HowItWorks
│   ├── TabSelector (Patients | Doctors)
│   └── StepGrid
│       └── Step × 4
│           ├── NumberIcon
│           ├── StepTitle
│           └── StepDescription
│
├── PlatformFeatures (Dark Background)
│   ├── SectionHeading
│   └── FeatureGrid (3×2)
│       └── FeatureCard × 6
│           ├── Icon
│           ├── Title
│           └── Description
│
├── WebsiteSpotlight
│   ├── SectionHeading
│   ├── BrowserMockup
│   │   └── AnimatedSections (Hero → Services → Testimonials)
│   ├── FeatureList
│   └── CTAButton → /register
│
├── Community
│   ├── SectionHeading
│   ├── TestimonialGrid
│   │   └── TestimonialCard × 3
│   │       ├── DoctorPhoto
│   │       ├── Quote
│   │       └── DoctorInfo
│   └── BlogPreview
│       └── ArticleCard × 3
│           ├── Image
│           ├── Title
│           └── Excerpt
│
├── SuccessStories (Carousel)
│   └── TestimonialSlide × 5
│       ├── PatientQuote
│       ├── RatingStars
│       └── PatientInfo
│
├── CityExplorer
│   └── CityCard × 3
│       ├── CityIcon/Image
│       ├── CityName
│       ├── DoctorCount
│       └── Link → /doctors/[city]
│
└── FinalCTA (Split Panel)
    ├── DoctorPanel (Left - Deep Canopy)
    │   ├── Headline
    │   └── Button → /register
    └── PatientPanel (Right - Forest Green)
        ├── Headline
        └── Button → /doctors
```

## Doctor Directory Page Component Tree

```
DoctorsPage (app/doctors/page.tsx)
│
├── PageHeader
│   ├── Title
│   └── SearchBar
│       ├── CitySelect
│       └── SpecialtyInput
│
├── ContentLayout (2-column)
│   ├── FilterSidebar (Left - Sticky)
│   │   ├── CityFilter (Multi-select)
│   │   ├── SpecialtyFilter
│   │   ├── ExperienceRange
│   │   ├── AvailabilityFilter
│   │   └── GenderFilter
│   │
│   └── MainContent (Right)
│       ├── ResultsHeader
│       │   ├── ResultCount
│       │   └── SortDropdown
│       ├── DoctorGrid
│       │   └── DoctorCard × 12
│       │       ├── ProfilePhoto
│       │       ├── DoctorInfo
│       │       ├── Specialties (Badges)
│       │       ├── RatingStars
│       │       └── CTAButtons
│       └── Pagination
│           ├── PrevButton
│           ├── PageNumbers
│           └── NextButton
│
└── EmptyState (if no results)
    ├── Icon
    ├── Message
    └── CTAButtons
```

## Doctor Profile Page Component Tree

```
DoctorProfilePage (app/dr-[slug]/page.tsx)
│
├── ProfileHero
│   ├── BackgroundImage
│   ├── DoctorInfo
│   │   ├── ProfilePhoto
│   │   ├── Name (H1)
│   │   ├── Qualification
│   │   └── City
│   └── StatsBar
│       ├── YearsExperience
│       ├── PatientsServed
│       └── SuccessRate
│
├── BookingSection (Sticky on Desktop)
│   └── BookingForm
│       ├── PatientName (Input)
│       ├── PatientPhone (Input)
│       ├── Gender (Select)
│       ├── AppointmentDate (DatePicker)
│       ├── ProblemDescription (Textarea)
│       └── SubmitButton
│
├── ServicesSection
│   ├── SectionHeading
│   └── ServiceGrid
│       └── ServiceCard × N
│           ├── ServiceImage
│           ├── ServiceName
│           └── ServiceDescription
│
├── AboutSection
│   ├── SectionHeading
│   ├── DoctorPhoto
│   ├── Biography
│   ├── Qualifications (List)
│   └── Specializations (Badges)
│
├── TestimonialsSection
│   ├── SectionHeading
│   └── TestimonialGrid
│       └── TestimonialCard × N
│           ├── PatientName
│           ├── RatingStars
│           ├── Quote
│           └── Date
│
├── ContactSection
│   ├── WorkingHours
│   │   └── DaySchedule × 7
│   ├── ClinicAddress
│   ├── PhoneNumber
│   └── EmailAddress
│
└── WhatsAppButton (Floating - Bottom Right)
    └── Icon + "Chat on WhatsApp"
```

## Registration Page Component Tree

```
RegistrationPage (app/register/page.tsx)
│
└── RegistrationLayout (2-column)
    ├── FormSection (Left)
    │   ├── ProgressIndicator
    │   │   ├── Step1Indicator (Active/Complete)
    │   │   ├── Step2Indicator
    │   │   └── Step3Indicator
    │   │
    │   └── FormContent (Conditional Render)
    │       ├── Step1Personal (if step === 1)
    │       │   ├── FullName (Input)
    │       │   ├── Email (Input + Validation)
    │       │   ├── PhoneNumber (Input)
    │       │   ├── Password (Input)
    │       │   ├── ConfirmPassword (Input)
    │       │   └── NextButton
    │       │
    │       ├── Step2Practice (if step === 2)
    │       │   ├── ClinicName (Input)
    │       │   ├── City (Select)
    │       │   ├── Qualification (Select)
    │       │   ├── YearsExperience (Number)
    │       │   ├── Specialties (Multi-select)
    │       │   ├── BackButton
    │       │   └── NextButton
    │       │
    │       ├── Step3Review (if step === 3)
    │       │   ├── ReviewSummary
    │       │   │   ├── PersonalInfo
    │       │   │   └── PracticeInfo
    │       │   ├── TermsCheckbox
    │       │   ├── BackButton
    │       │   └── SubmitButton
    │       │
    │       └── SuccessState (if submitted)
    │           ├── SuccessIcon
    │           ├── ConfirmationMessage
    │           ├── NextSteps (List)
    │           └── DashboardButton (Disabled)
    │
    └── ValueSidebar (Right - Sticky)
        ├── WebsitePreview
        │   └── BrowserMockup
        ├── FeatureChecklist
        │   └── Feature × 6
        │       ├── CheckIcon
        │       └── FeatureText
        └── DoctorTestimonial
            ├── DoctorPhoto
            ├── Quote
            └── DoctorInfo
```

## Shared Component Library

### Layout Components

```
components/layout/
├── Navbar.tsx
│   ├── Logo
│   ├── NavLinks (Desktop)
│   ├── DualCTAs
│   └── MobileMenuButton
│
├── Footer.tsx
│   ├── BrandColumn
│   ├── PatientsColumn
│   ├── DoctorsColumn
│   ├── CompanyColumn
│   └── BottomBar
│
└── MobileMenu.tsx
    ├── MenuOverlay
    ├── MenuDrawer
    │   ├── CloseButton
    │   ├── NavLinks
    │   └── CTAButtons
    └── Backdrop
```

### UI Components

```
components/ui/
├── Button.tsx (variants: primary, secondary, ghost)
├── Card.tsx (variants: default, elevated, bordered)
├── Input.tsx (types: text, email, tel, password)
├── Select.tsx (single, multi-select)
├── Badge.tsx (colors: primary, accent, gray)
├── SearchBar.tsx
├── DatePicker.tsx
├── Textarea.tsx
├── Checkbox.tsx
├── RadioGroup.tsx
├── Tabs.tsx
├── Dialog.tsx
├── Dropdown.tsx
└── Skeleton.tsx (loading states)
```

### Doctor Components

```
components/doctors/
├── DoctorCard.tsx
│   ├── ProfilePhoto
│   ├── DoctorInfo
│   ├── SpecialtyBadges
│   ├── RatingStars
│   └── CTAButtons
│
├── DoctorGrid.tsx
│   └── DoctorCard × N (responsive grid)
│
├── SearchBar.tsx
│   ├── CitySelect
│   └── SpecialtyInput
│
├── FilterSidebar.tsx
│   ├── FilterSection × N
│   └── ClearFiltersButton
│
└── CityTabs.tsx
    └── Tab × 3 (Karachi, Lahore, Islamabad)
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interaction                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    React Component                           │
│  (useState, useEffect, useForm, etc.)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  TanStack Query Hook                         │
│  (useQuery, useMutation, caching, refetching)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Client (lib/api.ts)                   │
│  (axios instance, error handling, interceptors)              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  CVP Backend API                             │
│  (FastAPI endpoints, database, business logic)               │
└─────────────────────────────────────────────────────────────┘
```

## State Management Strategy

### Server State (TanStack Query)

- Doctor listings
- Doctor profiles
- Appointment availability
- Web content (hero, services, testimonials)

### Client State (React useState/useReducer)

- Form inputs
- UI state (modals, dropdowns, tabs)
- Filter selections
- Search queries

### URL State (Next.js Router)

- Current page
- Search parameters
- Filter parameters
- City selection

## Responsive Breakpoints

```typescript
// tailwind.config.ts
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

### Component Behavior by Breakpoint

| Component      | Mobile (<768px) | Tablet (768-1024px) | Desktop (>1024px) |
| -------------- | --------------- | ------------------- | ----------------- |
| Navbar         | Hamburger menu  | Full nav + CTAs     | Full nav + CTAs   |
| Hero CTAs      | Stacked         | Side-by-side        | Side-by-side      |
| Doctor Grid    | 1 column        | 2 columns           | 3 columns         |
| Filter Sidebar | Bottom sheet    | Collapsible         | Always visible    |
| Registration   | Full width      | 60/40 split         | 50/50 split       |
| Footer         | Stacked         | 2×2 grid            | 4 columns         |

## Performance Optimization Strategy

### Image Optimization

- Use `next/image` for all images
- Lazy load below-fold images
- Serve WebP format with fallbacks
- Responsive image sizes

### Code Splitting

- Dynamic imports for heavy components
- Route-based code splitting (automatic with App Router)
- Lazy load modals and dialogs

### Caching Strategy

- Static pages: ISR with 1-hour revalidation
- Doctor profiles: ISR with 5-minute revalidation
- Doctor directory: Client-side caching with TanStack Query
- API responses: 5-minute stale time

### Bundle Size Targets

- First Load JS: <100KB
- Total Page Weight: <500KB
- Lighthouse Performance: >90

---

**Document Version:** 1.0  
**Last Updated:** 2026-05-16  
**Purpose:** Component architecture reference for development team
