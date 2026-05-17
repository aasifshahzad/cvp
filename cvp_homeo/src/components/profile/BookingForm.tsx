"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { api } from "@/lib/api";
import { Calendar, CheckCircle } from "lucide-react";

const bookingSchema = z.object({
    patient_name: z.string().min(2, "Name must be at least 2 characters"),
    patient_phone: z.string().min(10, "Please enter a valid phone number"),
    patient_gender: z.enum(["Male", "Female", "Other"]),
    appointment_date: z.string().min(1, "Please select a date"),
    problem_description: z.string().min(10, "Please describe your problem"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
    doctorId: string;
    doctorName: string;
}

export function BookingForm({ doctorId, doctorName }: BookingFormProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
    });

    const onSubmit = async (data: BookingFormData) => {
        setError(null);
        try {
            await api.appointments.create(doctorId, data);
            setIsSubmitted(true);
            reset();
        } catch (err: any) {
            setError(
                err.response?.data?.detail ||
                "Failed to book appointment. Please try again."
            );
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-card p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Appointment Requested!
                </h3>
                <p className="text-gray-600 mb-4">
                    Your appointment request has been sent to Dr. {doctorName}. You will
                    receive a confirmation shortly.
                </p>
                <Button
                    variant="primary"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4"
                >
                    Book Another Appointment
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-card shadow-card p-6 sticky top-24">
            <div className="flex items-center space-x-2 mb-6">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold text-gray-900">Book Appointment</h3>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="patient_name">Your Name *</Label>
                    <Input
                        id="patient_name"
                        {...register("patient_name")}
                        placeholder="Enter your full name"
                    />
                    {errors.patient_name && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.patient_name.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="patient_phone">Phone Number *</Label>
                    <Input
                        id="patient_phone"
                        {...register("patient_phone")}
                        placeholder="03XX-XXXXXXX"
                    />
                    {errors.patient_phone && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.patient_phone.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="patient_gender">Gender *</Label>
                    <Select id="patient_gender" {...register("patient_gender")}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Select>
                    {errors.patient_gender && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.patient_gender.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="appointment_date">Preferred Date *</Label>
                    <Input
                        id="appointment_date"
                        type="date"
                        {...register("appointment_date")}
                        min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.appointment_date && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.appointment_date.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="problem_description">Describe Your Problem *</Label>
                    <Textarea
                        id="problem_description"
                        {...register("problem_description")}
                        placeholder="Please describe your symptoms or health concerns..."
                        rows={4}
                    />
                    {errors.problem_description && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.problem_description.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Booking..." : "Book Appointment"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                    By booking, you agree to our terms and privacy policy
                </p>
            </form>
        </div>
    );
}

// Made with Bob