"use client";

import { useState } from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";

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
    const [formData, setFormData] = useState({
        patient_name: "",
        patient_phone: "",
        patient_gender: "",
        problem_description: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement booking logic
        console.log("Booking submitted:", {
            doctorId,
            selectedDate,
            selectedTime,
            ...formData,
        });
    };

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
                                <Label htmlFor="appointment_date" className="flex items-center gap-2">
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
                                <Label htmlFor="appointment_time" className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Preferred Time <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="appointment_time"
                                    type="time"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    required
                                />
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

                    <Button type="submit" className="w-full" size="lg">
                        Book Appointment with Dr. {doctorName}
                    </Button>
                </form>
            </div>
        </section>
    );
}

// Made with Bob