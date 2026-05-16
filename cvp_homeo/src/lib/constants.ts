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
  "Autoimmune Disorders",
  "Hormonal Imbalances",
] as const;

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const;

export const SITE_CONFIG = {
  name: "CVP Homeopathy",
  description: "Pakistan's Homeopathic Doctors, Now Digital",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    whatsapp: "https://wa.me/923001234567",
    facebook: "https://facebook.com/cvphomeopathy",
    instagram: "https://instagram.com/cvphomeopathy",
  },
};

export const NAV_LINKS = [
  { href: "/doctors", label: "Find a Doctor" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/for-doctors", label: "For Doctors" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
] as const;

export const FOOTER_LINKS = {
  patients: [
    { href: "/doctors", label: "Find a Doctor" },
    { href: "/doctors/karachi", label: "Karachi Doctors" },
    { href: "/doctors/lahore", label: "Lahore Doctors" },
    { href: "/doctors/islamabad", label: "Islamabad Doctors" },
    { href: "/for-patients", label: "Patient Guide" },
  ],
  doctors: [
    { href: "/register", label: "Join as a Doctor" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/for-doctors", label: "Features" },
    { href: "https://dashboard.casevaultpro.com", label: "Doctor Login" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/community", label: "Community" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

// Made with Bob
