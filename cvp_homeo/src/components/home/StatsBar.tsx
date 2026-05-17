"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
    value: string;
    label: string;
}

const STATS: Stat[] = [
    { value: "500+", label: "Registered Homeopathic Doctors" },
    { value: "3", label: "Cities: Karachi · Lahore · Islamabad" },
    { value: "10,000+", label: "Patient Records Managed" },
    { value: "100%", label: "Free for Doctors to Join" },
];

export function StatsBar() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="bg-surface py-12">
            <div className="container-custom">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STATS.map((stat, index) => (
                        <div
                            key={index}
                            className={`text-center transition-all duration-700 ${isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm md:text-base text-gray-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Made with Bob