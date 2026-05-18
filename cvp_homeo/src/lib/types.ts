// CVP Homeo - Type Definitions
// Aligned with backend Pydantic models

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

// ── Legacy types (for backward compatibility during migration) ──

export interface Doctor extends DoctorPublicInfo {
  email?: string;
  phone_number?: string;
  phone?: string;
  city?: string;
  qualification?: string;
  years_of_experience?: number;
  specialties?: string[];
  profile_photo?: string;
  rating?: number;
  slug?: string;
  is_approved?: boolean;
  created_at?: string;
  clinic_address?: string;
}

export interface AppointmentData {
  patient_name: string;
  patient_phone: string;
  patient_gender: string;
  appointment_date: string;
  problem_description: string;
}

export interface Appointment {
  id: string;
  doctor_id: string;
  patient_name: string;
  patient_phone: string;
  patient_gender: string;
  appointment_date: string;
  problem_description: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

export interface RegistrationData {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  clinic_name: string;
  city?: string;
  qualification?: string;
  years_of_experience?: number;
  specialties?: string[];
  registration_number?: string;
  specialization?: string;
  clinic_address?: string;
}

export interface RegistrationFormData extends RegistrationData {
  confirm_password: string;
}

export interface RegistrationResponse {
  id: string;
  email: string;
  full_name: string;
  message: string;
}

// Form Types
export interface Step1FormData {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}

export interface Step2FormData {
  clinic_name: string;
  city?: string;
  qualification?: string;
  years_of_experience?: number;
  specialties?: string[];
  registration_number?: string;
  specialization?: string;
  clinic_address?: string;
}

// API Response Types
export interface ApiError {
  detail: string;
  status_code: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

// Made with Bob
