"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

export function Hero() {
    return (
        <section className="relative bg-primary-dark text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="container-custom relative py-20 lg:py-32">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight">
                        Pakistan's Homeopathic Doctors, Now Digital
                    </h1>

                    {/* Sub-headline */}
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Find a verified homeopathic doctor near you — or bring your practice
                        online with your own digital clinic.
                    </p>

                    {/* Split CTA Block */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-8">
                        {/* Patient Card */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20 hover:bg-white/15 transition-all">
                            <h3 className="text-xl font-semibold mb-4">I'm a Patient</h3>
                            <p className="text-gray-200 mb-4 text-sm">
                                Find and book appointments with verified homeopathic doctors
                            </p>
                            <Link href="/doctors">
                                <Button variant="primary" className="w-full bg-white text-primary-dark hover:bg-gray-100">
                                    Find a Doctor
                                </Button>
                            </Link>
                        </div>

                        {/* Doctor Card */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20 hover:bg-white/15 transition-all">
                            <h3 className="text-xl font-semibold mb-4">I'm a Doctor</h3>
                            <p className="text-gray-200 mb-4 text-sm">
                                Get your own website and digitalize your practice for free
                            </p>
                            <Link href="/register">
                                <Button variant="primary" className="w-full bg-accent text-primary-dark hover:bg-accent/90">
                                    Join as a Doctor
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Trust Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
                        {[
                            "Verified Doctors",
                            "Easy Online Booking",
                            "Natural & Holistic Care",
                            "Free to Join for Doctors",
                        ].map((item) => (
                            <div key={item} className="flex items-center justify-center space-x-2 text-sm">
                                <Check className="h-4 w-4 text-accent flex-shrink-0" />
                                <span className="text-gray-200">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Made with Bob