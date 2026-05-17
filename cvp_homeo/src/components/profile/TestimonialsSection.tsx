"use client";

import { Star, Quote } from "lucide-react";
import { TestimonialsData } from "@/lib/types";

interface TestimonialsSectionProps {
    data: TestimonialsData;
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
    if (!data || !data.testimonials || data.testimonials.length === 0) {
        return null;
    }

    // Filter only approved testimonials
    const approvedTestimonials = data.testimonials.filter((t) => t.is_approved);

    if (approvedTestimonials.length === 0) {
        return null;
    }

    return (
        <section id="testimonials" className="py-20 md:py-32 px-4 bg-surface">
            <div className="container max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-foreground font-playfair">
                    {data.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    {approvedTestimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-card p-6 md:p-8 rounded-2xl shadow-md border border-border relative hover:shadow-xl transition-shadow duration-300 h-full"
                        >
                            <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating
                                                ? "fill-accent text-accent"
                                                : "fill-gray-200 text-gray-200"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Message */}
                            <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                                "{testimonial.message}"
                            </p>

                            {/* Patient Info */}
                            <div className="border-t border-border pt-4">
                                <div className="font-semibold text-foreground text-lg">
                                    {testimonial.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {testimonial.city}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Made with Bob