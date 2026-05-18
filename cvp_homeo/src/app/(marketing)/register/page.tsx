"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationFormData } from "@/lib/types";
import { registrationSchema } from "@/lib/validations";
import { registerDoctor } from "@/lib/api";
import { Step1Personal } from "@/components/register/Step1Personal";
import { Step2Practice } from "@/components/register/Step2Practice";
import { Step3Review } from "@/components/register/Step3Review";
import { SuccessState } from "@/components/register/SuccessState";
import { ProgressIndicator } from "@/components/register/ProgressIndicator";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      clinic_name: "",
      clinic_address: "",
      registration_number: "",
      years_of_experience: 0,
      specialties: [],
    },
    mode: "onBlur",
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const formData = form.getValues();

      // Map form data to backend API format
      await registerDoctor({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone: formData.phone_number,
        registration_number: formData.registration_number || "",
        specialization: (formData.specialties || []).join(", "),
        clinic_name: formData.clinic_name,
        clinic_address: formData.clinic_address || "",
      });

      setIsSubmitted(true);
    } catch (err: any) {
      setError(
        err.message ||
          "Registration failed. Please try again or contact support.",
      );
      console.error("Registration error:", err);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container-custom max-w-2xl">
          <SuccessState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-dark mb-2">
            Join CVP Homeopathy
          </h1>
          <p className="text-lg text-gray-600">
            Get your own professional clinic website and start managing patients
            digitally
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <ProgressIndicator currentStep={currentStep} totalSteps={3} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-card shadow-card p-8">
          {currentStep === 1 && (
            <Step1Personal form={form} onNext={handleNext} />
          )}
          {currentStep === 2 && (
            <Step2Practice
              form={form}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <Step3Review
              form={form}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Already have an account?{" "}
            <a
              href="https://dashboard.casevaultpro.com"
              className="text-primary hover:underline font-medium"
            >
              Log in to Dashboard
            </a>
          </p>
          <p className="mt-2">
            Need help?{" "}
            <a
              href="mailto:support@casevaultpro.com"
              className="text-primary hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
