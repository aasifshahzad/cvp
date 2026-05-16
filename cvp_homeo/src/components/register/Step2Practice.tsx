"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { RegistrationFormData } from "@/lib/types";
import { CITIES, QUALIFICATIONS, SPECIALTIES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { X } from "lucide-react";

interface Step2PracticeProps {
  form: UseFormReturn<RegistrationFormData>;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Practice({ form, onNext, onBack }: Step2PracticeProps) {
  const {
    register,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = form;

  const selectedSpecialties = watch("specialties") || [];

  const handleNext = async () => {
    const isValid = await trigger([
      "clinic_name",
      "city",
      "qualification",
      "years_of_experience",
      "specialties",
    ]);
    if (isValid) {
      onNext();
    }
  };

  const toggleSpecialty = (specialty: string) => {
    const current = selectedSpecialties;
    if (current.includes(specialty)) {
      setValue(
        "specialties",
        current.filter((s) => s !== specialty),
      );
    } else {
      setValue("specialties", [...current, specialty]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">
          Practice Information
        </h2>
        <p className="text-gray-600">Tell us about your homeopathic practice</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="clinic_name" required>
            Clinic Name
          </Label>
          <Input
            id="clinic_name"
            placeholder="Khan Homeopathic Clinic"
            {...register("clinic_name")}
            error={errors.clinic_name?.message}
          />
        </div>

        <div>
          <Label htmlFor="city" required>
            City
          </Label>
          <Select id="city" {...register("city")} error={errors.city?.message}>
            <option value="">Select a city</option>
            {CITIES.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="qualification" required>
            Qualification
          </Label>
          <Select
            id="qualification"
            {...register("qualification")}
            error={errors.qualification?.message}
          >
            <option value="">Select qualification</option>
            {QUALIFICATIONS.map((qual) => (
              <option key={qual.value} value={qual.value}>
                {qual.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="years_of_experience" required>
            Years of Experience
          </Label>
          <Input
            id="years_of_experience"
            type="number"
            min="0"
            max="50"
            placeholder="5"
            {...register("years_of_experience", { valueAsNumber: true })}
            error={errors.years_of_experience?.message}
          />
        </div>

        <div>
          <Label required>Specialties</Label>
          <p className="text-sm text-gray-500 mb-3">
            Select all that apply (at least one)
          </p>
          <div className="flex flex-wrap gap-2">
            {SPECIALTIES.map((specialty) => {
              const isSelected = selectedSpecialties.includes(specialty);
              return (
                <button
                  key={specialty}
                  type="button"
                  onClick={() => toggleSpecialty(specialty)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {specialty}
                  {isSelected && <X className="h-3 w-3" />}
                </button>
              );
            })}
          </div>
          {errors.specialties && (
            <p className="mt-2 text-sm text-red-600">
              {errors.specialties.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={onBack} variant="secondary" className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Continue to Review
        </Button>
      </div>
    </div>
  );
}

// Made with Bob
