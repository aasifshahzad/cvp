import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const FEATURES = [
    "Hero banner with your photo and tagline",
    "Professional stats (experience, patients, success rate)",
    "Online appointment booking form",
    "Services & treatments showcase",
    "About doctor section with qualifications",
    "Patient testimonials and reviews",
    "Working hours and contact information",
    "WhatsApp integration for instant contact",
];

export function WebsiteSpotlight() {
    return (
        <section className="py-16 bg-background">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                                Your Own Professional Website — Included
                            </h2>
                            <p className="text-lg text-gray-600">
                                No technical skills needed. Customize your hero, services,
                                testimonials, and booking form — all from your dashboard.
                            </p>
                        </div>

                        {/* Feature Checklist */}
                        <div className="space-y-3">
                            {FEATURES.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                            <Link href="/register">
                                <Button variant="primary" size="lg">
                                    Claim Your Free Clinic Website
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Browser Mockup */}
                    <div className="relative">
                        <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
                            {/* Browser Chrome */}
                            <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b border-gray-200">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>
                                <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
                                    homeo.casevaultpro.com/dr-your-name
                                </div>
                            </div>

                            {/* Website Preview */}
                            <div className="bg-gradient-to-br from-primary-dark to-primary p-8 text-white">
                                <div className="space-y-4">
                                    <div className="w-20 h-20 bg-white/20 rounded-full"></div>
                                    <div className="space-y-2">
                                        <div className="h-6 bg-white/30 rounded w-3/4"></div>
                                        <div className="h-4 bg-white/20 rounded w-1/2"></div>
                                    </div>
                                    <div className="flex space-x-4">
                                        <div className="h-8 bg-accent rounded w-24"></div>
                                        <div className="h-8 bg-white/20 rounded w-24"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Preview */}
                            <div className="p-6 space-y-4 bg-white">
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-3 bg-gray-100 rounded w-full"></div>
                                    <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="h-24 bg-surface rounded"></div>
                                    <div className="h-24 bg-surface rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-4 -right-4 bg-accent text-primary-dark px-6 py-3 rounded-full font-bold shadow-lg">
                            100% Free
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Made with Bob