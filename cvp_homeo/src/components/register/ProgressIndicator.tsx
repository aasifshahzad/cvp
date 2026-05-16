"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Practice Details" },
    { number: 3, label: "Review & Submit" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                  currentStep > step.number
                    ? "bg-primary text-white"
                    : currentStep === step.number
                      ? "bg-primary text-white ring-4 ring-primary/20"
                      : "bg-gray-200 text-gray-500",
                )}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  currentStep >= step.number ? "text-primary" : "text-gray-500",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 -mt-8">
                <div
                  className={cn(
                    "h-full transition-colors",
                    currentStep > step.number ? "bg-primary" : "bg-gray-200",
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Made with Bob
