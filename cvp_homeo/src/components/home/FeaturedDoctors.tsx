"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Button } from "@/components/ui/Button";
import { Doctor } from "@/lib/types";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

const CITIES = ["karachi", "lahore", "islamabad"];

export function FeaturedDoctors() {
    const [selectedCity, setSelectedCity] = useState("karachi");
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, [selectedCity]);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const data = await api.doctors.list({
                city: selectedCity,
                limit: 6,
            });
            setDoctors(data);
        } catch (error) {
            console.error("Error fetching featured doctors:", error);
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 bg-background">
            <div className="container-custom">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                        Find Homeopathic Doctors Near You
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Browse verified homeopathic doctors in major cities across Pakistan
                    </p>
                </div>

                {/* City Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-surface rounded-full p-1">
                        {CITIES.map((city) => (
                            <button
                                key={city}
                                onClick={() => setSelectedCity(city)}
                                className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${selectedCity === city
                                        ? "bg-primary text-white"
                                        : "text-gray-600 hover:text-primary"
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}

                {/* Doctor Grid */}
                {!loading && doctors.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {doctors.map((doctor) => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && doctors.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">
                            No doctors found in {selectedCity} yet.
                        </p>
                        <p className="text-sm text-gray-500">
                            We're growing! Check back soon or try another city.
                        </p>
                    </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link href={`/doctors/${selectedCity}`}>
                        <Button variant="primary">
                            See All Doctors in {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
                        </Button>
                    </Link>
                    <Link href="/doctors">
                        <Button variant="secondary">Browse All Cities</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

// Made with Bob