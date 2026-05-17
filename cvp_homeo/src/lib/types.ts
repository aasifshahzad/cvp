// Doctor Types
export interface Doctor {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  clinic_name?: string;
  city: string;
  qualification: string;
  years_of_experience: number;
  specialties: string[];
  specialization?: string;
  profile_photo?: string;
  rating?: number;
  slug: string;
  is_approved: boolean;
  created_at: string;
  consultation_fee?: number;
  phone?: string;
  clinic_address?: string;
}

export interface DoctorListParams {
  city?: string;
  specialty?: string;
  skip?: number;
  limit?: number;
  sort_by?: "rating" | "experience" | "created_at";
}

// Appointment Types
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

// Registration Types
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

// Form data with confirm_password for validation
export interface RegistrationFormData extends RegistrationData {
  confirm_password: string;
}

export interface RegistrationResponse {
  id: string;
  email: string;
  full_name: string;
  message: string;
}

// Web Content Types (Old API Pattern - from web-content endpoints)
export interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  credentials: Array<{
    id: number;
    value: string;
    label: string;
  }>;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  image_url?: string;
}

export interface ServicesSectionData {
  id: number;
  title: string;
  services: Service[];
}

export interface AboutDoctor {
  id: number;
  title: string;
  experience_title: string;
  experience_description: string;
  qualifications: Array<{
    id: number;
    qualification_text: string;
  }>;
  specializations: Array<{
    id: number;
    specialization_text: string;
  }>;
}

export interface Testimonial {
  id: number;
  name: string;
  city: string;
  rating: number;
  message: string;
  is_approved: boolean;
}

export interface TestimonialsData {
  id: number;
  title: string;
  testimonials: Testimonial[];
}

export interface ContactInfoData {
  id: number;
  phone_primary: string;
  phone_secondary?: string;
  whatsapp_number?: string;
  email: string;
  clinic_address: string;
  city: string;
  working_hours: string;
}

export interface AvailabilitySlot {
  start: string;
  end: string;
  booked: boolean;
}

export interface AvailabilityResponse {
  date: string;
  available_slots: AvailabilitySlot[];
  doctor: Doctor & {
    consultation_fee?: number;
    specialization?: string;
  };
}

export interface DoctorAvailability {
  id: string;
  doctor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
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
  city: string;
  qualification: string;
  years_of_experience: number;
  specialties: string[];
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
