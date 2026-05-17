import axios from "axios";
import type {
  Doctor,
  DoctorListParams,
  AppointmentData,
  Appointment,
  RegistrationData,
  RegistrationResponse,
  HeroSection,
  Service,
  ServicesSectionData,
  AboutDoctor,
  Testimonial,
  TestimonialsData,
  ContactInfoData,
  AvailabilityResponse,
  DoctorAvailability,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new Error(error.response.data.detail || "An error occurred");
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error(error.message);
    }
  },
);

export const api = {
  // Doctor endpoints
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

  // Appointment endpoints
  appointments: {
    create: async (
      doctorId: string,
      data: AppointmentData,
    ): Promise<Appointment> => {
      const response = await apiClient.post(
        `/public/appointments/${doctorId}`,
        data,
      );
      return response.data;
    },

    getAvailability: async (
      doctorId: string,
    ): Promise<DoctorAvailability[]> => {
      const response = await apiClient.get(`/public/availability/${doctorId}`);
      return response.data;
    },
  },

  // Registration endpoint
  registration: {
    register: async (data: RegistrationData): Promise<RegistrationResponse> => {
      const response = await apiClient.post("/users/", data);
      return response.data;
    },

    checkEmailAvailability: async (email: string): Promise<boolean> => {
      try {
        const response = await apiClient.get(`/users/check-email/${email}`);
        return response.data.available;
      } catch {
        return false;
      }
    },
  },

  // Web content endpoints (matching old doctor code API pattern)
  webContent: {
    getHero: async (doctorId: string): Promise<HeroSection> => {
      const response = await apiClient.get(
        `/web-content/hero-section-public/${doctorId}`,
      );
      return response.data;
    },

    getServices: async (doctorId: string): Promise<ServicesSectionData> => {
      const response = await apiClient.get(
        `/web-content/services-public/${doctorId}`,
      );
      return response.data;
    },

    getAbout: async (doctorId: string): Promise<AboutDoctor> => {
      const response = await apiClient.get(
        `/web-content/about-doctor-public/${doctorId}`,
      );
      return response.data;
    },

    getTestimonials: async (doctorId: string): Promise<TestimonialsData> => {
      const response = await apiClient.get(
        `/web-content/testimonials-public/${doctorId}`,
      );
      return response.data;
    },

    getContact: async (doctorId: string): Promise<ContactInfoData> => {
      const response = await apiClient.get(
        `/web-content/contact-info-public/${doctorId}`,
      );
      return response.data;
    },
  },

  // Availability endpoints
  availability: {
    getSlots: async (
      doctorId: string,
      date: string,
    ): Promise<AvailabilityResponse> => {
      const response = await apiClient.get(
        `/public/availability/${doctorId}?date=${date}`,
      );
      return response.data;
    },
  },
};

export default api;

// Made with Bob
