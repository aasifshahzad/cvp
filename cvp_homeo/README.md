# CVP Homeopathy Marketing Website

Pakistan's Homeopathic Doctors, Now Digital - Marketing and booking website for Case Vault Pro's homeopathy vertical.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the website.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
cvp_homeo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── doctors/            # Doctor directory
│   │   ├── dr-[slug]/          # Doctor profile pages
│   │   ├── register/           # Doctor registration
│   │   └── ...                 # Other pages
│   ├── components/             # React components
│   │   ├── layout/             # Navbar, Footer
│   │   ├── home/               # Homepage sections
│   │   ├── doctors/            # Doctor components
│   │   ├── profile/            # Profile page components
│   │   ├── register/           # Registration components
│   │   └── ui/                 # Reusable UI components
│   ├── lib/                    # Utilities and configurations
│   │   ├── api.ts              # API client
│   │   ├── types.ts            # TypeScript types
│   │   ├── constants.ts        # App constants
│   │   ├── utils.ts            # Utility functions
│   │   └── fonts.ts            # Font configuration
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies
```

## 🎨 Brand Design System

### Colors

- **Primary (Forest Green)**: `#2D7A4F`
- **Primary Dark (Deep Canopy)**: `#1A3C2E`
- **Accent (Warm Gold)**: `#C9A84C`
- **Parent Brand (CVP Navy)**: `#1B2B4B`
- **Background (Parchment White)**: `#FAFAF7`
- **Surface (Sage Tint)**: `#E8F5EE`

### Typography

- **Display/Hero**: Playfair Display (700)
- **Headings**: Inter (600)
- **Body**: Inter (400, 500)

## 🔗 API Integration

The website connects to the CVP Backend API:

- **Development**: `http://localhost:8000`
- **Production**: `https://api.casevaultpro.com`

Configure the API URL in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📄 Key Pages

- `/` - Homepage with dual-audience hero
- `/doctors` - Doctor directory with search and filters
- `/doctors/[city]` - City-specific doctor listings
- `/dr-[slug]` - Individual doctor profile pages
- `/register` - Doctor registration (3-step form)
- `/how-it-works` - Platform explainer
- `/for-doctors` - Doctor value proposition
- `/for-patients` - Patient guide
- `/community` - Community and blog
- `/about` - About CVP Homeopathy

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Data Fetching**: TanStack Query
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 📝 Development Guidelines

### Code Standards

- Use TypeScript strict mode
- Follow Next.js App Router conventions
- Use Tailwind utility classes
- Component files in PascalCase
- Utility files in camelCase

### Git Workflow

- Branch naming: `feature/component-name`, `fix/bug-description`
- Commit messages: `feat:`, `fix:`, `refactor:`, `docs:`
- Pull requests with clear descriptions

## 📚 Documentation

- [Implementation Plan](./IMPLEMENTATION_PLAN.md)
- [Component Architecture](./COMPONENT_ARCHITECTURE.md)
- [Quick Start Guide](./QUICK_START_GUIDE.md)
- [Marketing Website Plan](./CVP_Homeo_Marketing_Website_Plan.md)

## 🚢 Deployment

The website is deployed on Vercel:

- **Production**: `https://homeo.casevaultpro.com`
- **Staging**: Auto-deployed from pull requests

## 📞 Support

For questions or issues:

- Check the documentation files
- Review the implementation plan
- Contact the development team

---

**Built with ❤️ by Case Vault Pro**
