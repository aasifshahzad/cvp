import { z } from "zod";

export const registrationSchema = z
  .object({
    // Step 1: Personal Information
    full_name: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(100, "Full name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone_number: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[\d\s\+\-\(\)]+$/, "Please enter a valid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and numbers",
      ),
    confirm_password: z.string(),

    // Step 2: Practice Information
    clinic_name: z
      .string()
      .min(3, "Clinic name must be at least 3 characters")
      .max(100, "Clinic name must be less than 100 characters"),
    city: z.string().min(1, "Please select a city"),
    qualification: z.string().min(1, "Please select your qualification"),
    years_of_experience: z
      .number()
      .min(0, "Years of experience cannot be negative")
      .max(50, "Please enter a valid number of years"),
    specialties: z
      .array(z.string())
      .min(1, "Please select at least one specialty"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegistrationSchema = z.infer<typeof registrationSchema>;

// Made with Bob
