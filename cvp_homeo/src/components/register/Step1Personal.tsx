"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RegistrationFormData } from "@/lib/types";

interface Step1PersonalProps {
  form: UseFormReturn<RegistrationFormData>;
  onNext: () => void;
}

export function Step1Personal({ form, onNext }: Step1PersonalProps) {
  const {
    register,
    formState: { errors },
    trigger,
  } = form;

  const handleNext = async () => {
    const isValid = await trigger([
      "full_name",
      "email",
      "phone_number",
      "password",
      "confirm_password",
    ]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="full_name" required>
            Full Name
          </Label>
          <Input
            id="full_name"
            placeholder="Dr. Ahmed Khan"
            {...register("full_name")}
            error={errors.full_name?.message}
          />
        </div>

        <div>
          <Label htmlFor="email" required>
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="ahmed.khan@example.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div>
          <Label htmlFor="phone_number" required>
            Phone Number
          </Label>
          <Input
            id="phone_number"
            type="tel"
            placeholder="+92 300 1234567"
            {...register("phone_number")}
            error={errors.phone_number?.message}
          />
        </div>

        <div>
          <Label htmlFor="password" required>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
          />
          <p className="mt-1 text-sm text-gray-500">
            At least 8 characters with uppercase, lowercase, and numbers
          </p>
        </div>

        <div>
          <Label htmlFor="confirm_password" required>
            Confirm Password
          </Label>
          <Input
            id="confirm_password"
            type="password"
            placeholder="••••••••"
            {...register("confirm_password")}
            error={errors.confirm_password?.message}
          />
        </div>
      </div>

      <Button onClick={handleNext} className="w-full" size="lg">
        Continue to Practice Details
      </Button>
    </div>
  );
}

// Made with Bob
