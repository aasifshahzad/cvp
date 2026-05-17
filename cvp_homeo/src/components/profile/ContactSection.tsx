"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactInfoData, Doctor } from "@/lib/types";

interface ContactSectionProps {
    data: ContactInfoData;
    doctor: Doctor;
}

export function ContactSection({ data, doctor }: ContactSectionProps) {
    if (!data) return null;

    return (
        <section id="contact" className="py-20 md:py-32 px-4 bg-background">
            <div className="container max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-foreground font-playfair">
                    Contact & Location
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
                            <h3 className="text-2xl font-semibold mb-6 text-foreground">
                                Get in Touch
                            </h3>

                            <div className="space-y-4">
                                {/* Primary Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">
                                            Primary Phone
                                        </div>
                                        <a
                                            href={`tel:${data.phone_primary}`}
                                            className="text-foreground font-medium hover:text-primary transition-colors"
                                        >
                                            {data.phone_primary}
                                        </a>
                                    </div>
                                </div>

                                {/* Secondary Phone */}
                                {data.phone_secondary && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">
                                                Secondary Phone
                                            </div>
                                            <a
                                                href={`tel:${data.phone_secondary}`}
                                                className="text-foreground font-medium hover:text-primary transition-colors"
                                            >
                                                {data.phone_secondary}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* WhatsApp */}
                                {data.whatsapp_number && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">
                                                WhatsApp
                                            </div>
                                            <a
                                                href={`https://wa.me/${data.whatsapp_number.replace(/\D/g, "")}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-foreground font-medium hover:text-green-600 transition-colors"
                                            >
                                                {data.whatsapp_number}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">
                                            Email
                                        </div>
                                        <a
                                            href={`mailto:${data.email}`}
                                            className="text-foreground font-medium hover:text-primary transition-colors break-all"
                                        >
                                            {data.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">
                                            Clinic Address
                                        </div>
                                        <p className="text-foreground font-medium">
                                            {data.clinic_address}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1 capitalize">
                                            {data.city}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="space-y-6">
                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
                            <h3 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-3">
                                <Clock className="w-6 h-6 text-primary" />
                                Working Hours
                            </h3>

                            <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                                {data.working_hours}
                            </div>
                        </div>

                        {/* Consultation Fee */}
                        {doctor.consultation_fee && (
                            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 md:p-8 rounded-2xl border border-primary/20">
                                <h3 className="text-xl font-semibold mb-2 text-foreground">
                                    Consultation Fee
                                </h3>
                                <p className="text-3xl font-bold text-primary">
                                    Rs. {doctor.consultation_fee}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Per consultation
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Made with Bob