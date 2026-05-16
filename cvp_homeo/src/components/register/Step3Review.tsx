"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RegistrationFormData } from "@/lib/types";
import { CITIES, QUALIFICATIONS } from "@/lib/constants";
import { Check } from "lucide-react";
import { useState } from "react";

interface Step3ReviewProps {
  form: UseFormReturn<RegistrationFormData>;
  onBack: () => void;
  onSubmit: () => Promise<void>;
}

export function Step3Review({ form, onBack, onSubmit }: Step3ReviewProps) {
  const { watch } = form;
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formData = watch();

  const cityLabel = CITIES.find((c) => c.value === formData.city)?.label;
  const qualLabel = QUALIFICATIONS.find(
    (q) => q.value === formData.qualification,
  )?.label;

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">
          Review & Submit
        </h2>
        <p className="text-gray-600">
          Please review your information before submitting
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="text-base text-gray-900">
                  {formData.full_name}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-base text-gray-900">{formData.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="text-base text-gray-900">
                  {formData.phone_number}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practice Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Clinic Name
                </dt>
                <dd className="text-base text-gray-900">
                  {formData.clinic_name}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="text-base text-gray-900">{cityLabel}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Qualification
                </dt>
                <dd className="text-base text-gray-900">{qualLabel}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Experience
                </dt>
                <dd className="text-base text-gray-900">
                  {formData.years_of_experience} years
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-2">
                  Specialties
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {formData.specialties?.map((specialty) => (
                    <Badge key={specialty} variant="primary">
                      {specialty}
                    </Badge>
                  ))}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="bg-surface rounded-lg p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center">
                {agreedToTerms && <Check className="h-3 w-3 text-white" />}
              </div>
            </div>
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . I understand that my account will be reviewed and approved by
              the CVP team within 24 hours.
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onBack}
          variant="secondary"
          className="flex-1"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1"
          disabled={!agreedToTerms || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </Button>
      </div>
    </div>
  );
}

// Made with Bob
