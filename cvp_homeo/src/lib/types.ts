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
  profile_photo?: string;
  rating?: number;
  slug: string;
  is_approved: boolean;
  created_at: string;
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

// Web Content Types
export interface HeroSection {
  id: string;
  doctor_id: string;
  background_image?: string;
  tagline?: string;
  years_experience?: number;
  patients_served?: number;
  success_rate?: number;
}

export interface Service {
  id: string;
  doctor_id: string;
  name: string;
  description: string;
  image?: string;
  order: number;
}

export interface AboutDoctor {
  id: string;
  doctor_id: string;
  biography: string;
  qualifications: string[];
  specializations: string[];
  photo?: string;
}

export interface Testimonial {
  id: string;
  doctor_id: string;
  patient_name: string;
  rating: number;
  text: string;
  date: string;
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
