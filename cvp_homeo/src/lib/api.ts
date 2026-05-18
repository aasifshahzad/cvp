// CVP Homeo - API Client
// Aligned with backend FastAPI endpoints

import type {
  HeroSectionResponse,
  AboutDoctorResponse,
  ServicesResponse,
  TestimonialsResponse,
  ContactInfoResponse,
  DoctorPublicInfo,
  AvailabilityResponse,
  PublicBookingRequest,
  AppointmentBookingResponse,
  DoctorRegisterRequest,
  UserPublic,
} from "./types";

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

// ── Type imports (for convenience) ───────────────────────────────
export type {
  HeroSectionResponse,
  AboutDoctorResponse,
  ServicesResponse,
  TestimonialsResponse,
  ContactInfoResponse,
  DoctorPublicInfo,
  AvailabilityResponse,
  PublicBookingRequest,
  AppointmentBookingResponse,
  DoctorRegisterRequest,
  UserPublic,
} from "./types";

// Made with Bob
