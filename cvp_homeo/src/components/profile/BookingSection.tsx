"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { getAvailability, bookAppointment } from "@/lib/api";
import type { AvailableSlot } from "@/lib/types";

interface BookingSectionProps {
  doctorId: string;
  doctorName: string;
  consultationFee?: number;
}

export function BookingSection({
  doctorId,
  doctorName,
  consultationFee,
}: BookingSectionProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    patient_name: "",
    patient_phone: "",
    patient_gender: "",
    problem_description: "",
  });

  // Fetch available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    } else {
      setAvailableSlots([]);
      setSelectedTime("");
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date: string) => {
    setLoadingSlots(true);
    setError(null);
    try {
      const response = await getAvailability(doctorId, date);
      // Filter out already booked slots
      const available = response.available_slots.filter((slot) => !slot.booked);
      setAvailableSlots(available);

      if (available.length === 0) {
        setError(
          "No available slots for this date. Please select another date.",
        );
      }
    } catch (err: any) {
      console.error("Error fetching availability:", err);
      setError("Failed to load available slots. Please try again.");
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTime) {
      setError("Please select a time slot");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await bookAppointment({
        doctor_id: doctorId,
        full_name: formData.patient_name,
        phone: formData.patient_phone,
        gender: formData.patient_gender as "male" | "female" | "other",
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        reason: formData.problem_description,
      });

      if (result.success) {
        setIsSubmitted(true);
        // Reset form
        setFormData({
          patient_name: "",
          patient_phone: "",
          patient_gender: "",
          problem_description: "",
        });
        setSelectedDate("");
        setSelectedTime("");
      } else {
        setError(result.message || "Failed to book appointment");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setError(err.message || "Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 md:py-32 px-4 bg-surface">
        <div className="container max-w-5xl mx-auto">
          <div className="bg-card p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg border border-border">
            <div className="text-center space-y-6">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <h3 className="text-2xl font-bold text-foreground">
                Appointment Requested!
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your appointment request has been sent to Dr. {doctorName}. You
                will receive a confirmation shortly.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="primary">
                Book Another Appointment
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 md:py-32 px-4 bg-surface">
      <div className="container max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-foreground font-playfair">
          Book an Appointment
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-card p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg border border-border space-y-8"
        >
          {/* Consultation Fee Display */}
          {consultationFee && (
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                Consultation Fee: <strong>Rs. {consultationFee}</strong>
              </span>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Patient Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Patient Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="patient_name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="patient_name"
                  type="text"
                  value={formData.patient_name}
                  onChange={(e) =>
                    setFormData({ ...formData, patient_name: e.target.value })
                  }
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="patient_phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="patient_phone"
                  type="tel"
                  value={formData.patient_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, patient_phone: e.target.value })
                  }
                  required
                  placeholder="03XXXXXXXXX"
                />
              </div>

              <div>
                <Label htmlFor="patient_gender">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Select
                  id="patient_gender"
                  value={formData.patient_gender}
                  onChange={(e) =>
                    setFormData({ ...formData, patient_gender: e.target.value })
                  }
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Appointment Date & Time */}
          <div className="space-y-6 border-t border-border pt-8">
            <h3 className="text-2xl font-semibold text-foreground">
              Appointment Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="appointment_date"
                  className="flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Appointment Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="appointment_date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={format(new Date(), "yyyy-MM-dd")}
                  max={format(addDays(new Date(), 30), "yyyy-MM-dd")}
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="appointment_time"
                  className="flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Available Time Slots <span className="text-red-500">*</span>
                </Label>
                {loadingSlots ? (
                  <div className="flex items-center gap-2 p-3 border border-border rounded-md">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Loading slots...
                    </span>
                  </div>
                ) : selectedDate && availableSlots.length > 0 ? (
                  <Select
                    id="appointment_time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                  >
                    <option value="">Select a time slot</option>
                    {availableSlots.map((slot) => (
                      <option key={slot.start} value={slot.start}>
                        {slot.start} - {slot.end}
                      </option>
                    ))}
                  </Select>
                ) : selectedDate ? (
                  <div className="p-3 border border-border rounded-md text-sm text-muted-foreground">
                    No available slots for this date
                  </div>
                ) : (
                  <div className="p-3 border border-border rounded-md text-sm text-muted-foreground">
                    Please select a date first
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="problem_description">
                Describe Your Problem <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="problem_description"
                value={formData.problem_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    problem_description: e.target.value,
                  })
                }
                rows={5}
                required
                placeholder="Please describe your health concern in detail..."
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting || !selectedTime}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              `Book Appointment with Dr. ${doctorName}`
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}

// Made with Bob
