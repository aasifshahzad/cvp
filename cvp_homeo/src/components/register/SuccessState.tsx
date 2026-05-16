"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SuccessState() {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-primary-dark">
          Registration Submitted!
        </h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Thank you for joining CVP Homeopathy. Your account is under review.
        </p>
      </div>

      <div className="bg-surface rounded-lg p-6 max-w-md mx-auto text-left">
        <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
        <ol className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
              1
            </span>
            <span>
              Our team will review your registration details within 24 hours
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
              2
            </span>
            <span>
              You'll receive an email confirmation once your account is approved
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
              3
            </span>
            <span>
              Log in to your dashboard and start customizing your clinic website
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
              4
            </span>
            <span>
              Your profile will go live and patients can start booking
              appointments
            </span>
          </li>
        </ol>
      </div>

      <div className="space-y-3">
        <Button
          onClick={() => (window.location.href = "/")}
          variant="primary"
          size="lg"
        >
          Return to Homepage
        </Button>
        <p className="text-sm text-gray-500">
          Questions? Contact us at{" "}
          <a
            href="mailto:support@casevaultpro.com"
            className="text-primary hover:underline"
          >
            support@casevaultpro.com
          </a>
        </p>
      </div>
    </div>
  );
}

// Made with Bob
