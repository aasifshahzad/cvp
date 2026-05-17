"use client";

import { GraduationCap, Award } from "lucide-react";
import { AboutDoctor } from "@/lib/types";

interface AboutSectionProps {
    data: AboutDoctor;
}

export function AboutSection({ data }: AboutSectionProps) {
    if (!data) return null;

    return (
        <section id="about" className="py-20 md:py-32 px-4 bg-background">
            <div className="container max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-foreground font-playfair">
                    {data.title}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                    <div className="space-y-6">
                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-3">
                                <GraduationCap className="w-7 h-7 text-primary" />
                                Qualifications
                            </h3>
                            <ul className="space-y-3 text-muted-foreground">
                                {data.qualifications.map((qual) => (
                                    <li key={qual.id} className="flex items-start gap-3">
                                        <span className="text-primary mt-1 text-xl">•</span>
                                        <span className="leading-relaxed">
                                            {qual.qualification_text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-3">
                                <Award className="w-7 h-7 text-primary" />
                                Specializations
                            </h3>
                            <ul className="space-y-3 text-muted-foreground">
                                {data.specializations.map((spec) => (
                                    <li key={spec.id} className="flex items-start gap-3">
                                        <span className="text-primary mt-1 text-xl">•</span>
                                        <span className="leading-relaxed">
                                            {spec.specialization_text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-card p-8 md:p-10 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
                            {data.experience_title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">
                            {data.experience_description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Made with Bob