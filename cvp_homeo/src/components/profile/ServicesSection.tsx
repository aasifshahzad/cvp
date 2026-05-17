"use client";

import Image from "next/image";
import { ServicesSectionData } from "@/lib/types";

interface ServicesSectionProps {
    data: ServicesSectionData;
}

export function ServicesSection({ data }: ServicesSectionProps) {
    if (!data || !data.services || data.services.length === 0) {
        return null;
    }

    return (
        <section id="services" className="py-20 md:py-32 px-4 bg-surface">
            <div className="container max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-foreground font-playfair">
                    {data.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {data.services.map((service) => (
                        <div
                            key={service.id}
                            className="group bg-card rounded-2xl shadow-md border border-border hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col"
                        >
                            {/* Image Container */}
                            {service.image_url && (
                                <div className="relative w-full h-48 overflow-hidden">
                                    <Image
                                        src={service.image_url}
                                        alt={service.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            )}

                            {/* Content Container */}
                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-sm md:text-base flex-grow">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Made with Bob