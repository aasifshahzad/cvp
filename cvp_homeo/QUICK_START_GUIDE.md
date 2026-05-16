# CVP Homeopathy Website - Quick Start Guide

## Prerequisites

Before starting development, ensure you have:

- **Node.js:** v20.x or higher
- **npm:** v10.x or higher
- **Git:** Latest version
- **Code Editor:** VS Code (recommended)
- **Backend API:** Access to CVP Backend API endpoints

## Initial Setup (30 minutes)

### Step 1: Create Next.js Project

```bash
# Navigate to cvp_homeo directory
cd cvp_homeo

# Create Next.js 15 project with TypeScript and Tailwind
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# Answer prompts:
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Turbopack? No
# ✔ Would you like to customize the import alias? No
```

### Step 2: Install Core Dependencies

```bash
# UI Components (Radix UI)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-separator

# Data Fetching & State Management
npm install @tanstack/react-query @tanstack/react-query-devtools axios

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Animation & UI
npm install framer-motion lucide-react

# Utilities
npm install date-fns clsx tailwind-merge class-variance-authority

# Development Tools
npm install -D @types/node
```

### Step 3: Configure Environment Variables

Create `.env.local` file:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
# or for staging: https://staging-api.casevaultpro.com
# or for production: https://api.casevaultpro.com

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# or for production: https://homeo.casevaultpro.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=
```

### Step 4: Set Up Brand System

Create `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        button: "9999px", // pill shape
      },
    },
  },
  plugins: [],
};

export default config;
```

Create `src/lib/fonts.ts`:

```typescript
import { Playfair_Display, Inter } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
```

Update `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { playfair, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CVP Homeopathy - Pakistan's Homeopathic Doctors, Now Digital",
  description: "Find verified homeopathic doctors in Karachi, Lahore, and Islamabad. Book appointments online or bring your practice digital.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

Update `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: #2d7a4f;
    --primary-dark: #1a3c2e;
    --accent: #c9a84c;
    --parent: #1b2b4b;
    --background: #fafaf7;
    --surface: #e8f5ee;
  }

  body {
    @apply bg-background text-gray-900 font-inter;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-playfair font-bold;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-button font-medium transition-colors;
  }

  .btn-secondary {
    @apply border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-button font-medium transition-colors;
  }

  .card {
    @apply bg-white rounded-card shadow-md p-6;
  }
}
```

### Step 5: Create API Client

Create `src/lib/api.ts`:

```typescript
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface Doctor {
  id: string;
  full_name: string;
  email: string;
  clinic_name?: string;
  city: string;
  qualification: string;
  years_of_experience: number;
  specialties: string[];
  profile_photo?: string;
  rating?: number;
  slug: string;
}

export interface DoctorListParams {
  city?: string;
  specialty?: string;
  skip?: number;
  limit?: number;
}

export interface AppointmentData {
  patient_name: string;
  patient_phone: string;
  patient_gender: string;
  appointment_date: string;
  problem_description: string;
}

export interface RegistrationData {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  clinic_name: string;
  city: string;
  qualification: string;
  years_of_experience: number;
  specialties: string[];
}

// API Methods
export const api = {
  doctors: {
    list: async (params: DoctorListParams = {}): Promise<Doctor[]> => {
      const response = await apiClient.get("/public/doctors", { params });
      return response.data;
    },

    getById: async (id: string): Promise<Doctor> => {
      const response = await apiClient.get(`/public/doctors/${id}`);
      return response.data;
    },

    getBySlug: async (slug: string): Promise<Doctor> => {
      const response = await apiClient.get(`/public/doctors/slug/${slug}`);
      return response.data;
    },
  },

  appointments: {
    create: async (doctorId: string, data: AppointmentData) => {
      const response = await apiClient.post(
        `/public/appointments/${doctorId}`,
        data,
      );
      return response.data;
    },

    getAvailability: async (doctorId: string) => {
      const response = await apiClient.get(`/public/availability/${doctorId}`);
      return response.data;
    },
  },

  registration: {
    register: async (data: RegistrationData) => {
      const response = await apiClient.post("/users/", data);
      return response.data;
    },
  },

  webContent: {
    getHero: async (doctorId: string) => {
      const response = await apiClient.get(`/web_content/${doctorId}/hero`);
      return response.data;
    },

    getServices: async (doctorId: string) => {
      const response = await apiClient.get(`/web_content/${doctorId}/services`);
      return response.data;
    },

    getAbout: async (doctorId: string) => {
      const response = await apiClient.get(`/web_content/${doctorId}/about`);
      return response.data;
    },

    getTestimonials: async (doctorId: string) => {
      const response = await apiClient.get(
        `/web_content/${doctorId}/testimonials`,
      );
      return response.data;
    },
  },
};
```

Create `src/lib/constants.ts`:

```typescript
export const CITIES = [
  { value: "karachi", label: "Karachi" },
  { value: "lahore", label: "Lahore" },
  { value: "islamabad", label: "Islamabad" },
] as const;

export const QUALIFICATIONS = [
  { value: "BHMS", label: "BHMS" },
  { value: "DHMS", label: "DHMS" },
  { value: "MD", label: "MD (Homeopathy)" },
  { value: "Other", label: "Other" },
] as const;

export const SPECIALTIES = [
  "Skin Diseases",
  "Respiratory Issues",
  "Digestive Disorders",
  "Women's Health",
  "Children's Health",
  "Mental Health",
  "Chronic Pain",
  "Allergies",
] as const;
```

### Step 6: Create First Component (Button)

Create `src/components/ui/Button.tsx`:

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-primary-dark text-white',
        secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
        ghost: 'hover:bg-surface text-primary',
      },
      size: {
        default: 'px-6 py-3 text-base',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg',
      },
      rounded: {
        default: 'rounded-md',
        pill: 'rounded-button',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      rounded: 'pill',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

Create `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 7: Test Setup

Update `src/app/page.tsx`:

```typescript
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl text-primary-dark">
          CVP Homeopathy
        </h1>
        <p className="text-xl text-gray-600">
          Pakistan's Homeopathic Doctors, Now Digital
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary">Find a Doctor</Button>
          <Button variant="secondary">Join as a Doctor</Button>
        </div>
      </div>
    </main>
  );
}
```

### Step 8: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - you should see the test page with styled buttons!

## Project Structure Created

```
cvp_homeo/
├── .env.local                    ✅ Environment variables
├── .gitignore                    ✅ Git ignore file
├── next.config.js                ✅ Next.js config
├── package.json                  ✅ Dependencies
├── tailwind.config.ts            ✅ Tailwind + brand tokens
├── tsconfig.json                 ✅ TypeScript config
├── public/                       ✅ Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx            ✅ Root layout with fonts
│   │   ├── page.tsx              ✅ Test homepage
│   │   └── globals.css           ✅ Global styles
│   ├── components/
│   │   └── ui/
│   │       └── Button.tsx        ✅ First component
│   └── lib/
│       ├── api.ts                ✅ API client
│       ├── constants.ts          ✅ App constants
│       ├── fonts.ts              ✅ Font configuration
│       └── utils.ts              ✅ Utility functions
└── IMPLEMENTATION_PLAN.md        ✅ This guide
```

## Next Steps

Now that the foundation is set up, proceed with:

1. **Week 1, Task 1.2:** Build remaining UI components (Card, Input, Select, etc.)
2. **Week 2, Task 2.1:** Create Navbar and Footer components
3. **Week 3, Task 3.1:** Build the doctor registration page

Refer to `IMPLEMENTATION_PLAN.md` for detailed task breakdown.

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Type checking
npx tsc --noEmit         # Check TypeScript errors

# Testing (after setup)
npm run test             # Run tests
npm run test:e2e         # Run E2E tests
```

## Troubleshooting

### Issue: Fonts not loading

**Solution:** Ensure `fonts.ts` is imported in `layout.tsx` and CSS variables are set in `globals.css`

### Issue: API calls failing

**Solution:** Check `.env.local` has correct `NEXT_PUBLIC_API_URL` and backend is running

### Issue: Tailwind classes not working

**Solution:** Verify `tailwind.config.ts` content paths include your component directories

### Issue: TypeScript errors

**Solution:** Run `npm install @types/node` and ensure `tsconfig.json` is properly configured

## Resources

- **Next.js 15 Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Radix UI:** https://www.radix-ui.com/
- **React Hook Form:** https://react-hook-form.com/
- **TanStack Query:** https://tanstack.com/query/latest

## Support

For questions or issues:

1. Check `IMPLEMENTATION_PLAN.md` for detailed guidance
2. Review the original design plan in `CVP_Homeo_Marketing_Website_Plan.md`
3. Consult the CVP Backend API documentation
4. Contact the development team

---

**Setup Time:** ~30 minutes  
**Status:** Ready to start building components  
**Next Task:** Build remaining UI components (Week 1, Task 1.2)
