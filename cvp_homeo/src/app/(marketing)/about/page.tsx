import Link from "next/link";
import { Button } from "@/components/ui/Button";

import {
    Target,
    Eye,
    Heart,
    Users,
    Globe,
    Shield,
    Zap,
    Award,
    ArrowRight,
} from "lucide-react";

export const metadata = {
    title: "About Us | CVP Homeopathy",
    description:
        "Learn about CVP Homeopathy - Pakistan's leading platform connecting homeopathic doctors with patients. Our mission, vision, and commitment to natural healthcare.",
};

const VALUES = [
    {
        icon: Heart,
        title: "Patient-Centered Care",
        description:
            "We believe in putting patients first, making quality homeopathic care accessible and convenient for everyone.",
    },
    {
        icon: Shield,
        title: "Trust & Verification",
        description:
            "Every doctor on our platform is verified and approved, ensuring patients receive care from qualified practitioners.",
    },
    {
        icon: Zap,
        title: "Innovation",
        description:
            "We leverage technology to modernize homeopathic practice while preserving the holistic principles of natural healing.",
    },
    {
        icon: Users,
        title: "Community",
        description:
            "Building a supportive community of practitioners and patients who believe in the power of homeopathy.",
    },
];

const FEATURES_IMPACT = [
    {
        icon: Globe,
        title: "Digital Transformation",
        description:
            "Helping homeopathic doctors transition from paper-based practices to modern digital clinics with complete practice management tools.",
    },
    {
        icon: Users,
        title: "Patient Access",
        description:
            "Making it easier for patients to find, connect with, and book appointments with qualified homeopathic doctors in their city.",
    },
    {
        icon: Award,
        title: "Professional Growth",
        description:
            "Empowering doctors with their own professional websites, online presence, and tools to grow their practice.",
    },
];

const STATS = [
    { number: "500+", label: "Registered Doctors" },
    { number: "10,000+", label: "Patients Served" },
    { number: "3", label: "Major Cities" },
    { number: "100%", label: "Free for Doctors" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-primary-dark text-white py-20">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About CVP Homeopathy
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                            Pakistan's leading platform connecting homeopathic doctors with
                            patients, making natural healthcare accessible to everyone.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="bg-white p-8 rounded-card shadow-card">
                            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-6">
                                <Target className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary-dark mb-4">
                                Our Mission
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                To digitalize homeopathic healthcare in Pakistan by providing
                                doctors with modern practice management tools and helping
                                patients easily find and connect with qualified homeopathic
                                practitioners.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-card shadow-card">
                            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-6">
                                <Eye className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary-dark mb-4">
                                Our Vision
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                To become Pakistan's most trusted homeopathy platform, where
                                every homeopathic doctor has a digital presence and every
                                patient can access quality natural healthcare with ease.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-surface">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-8 text-center">
                            Our Story
                        </h2>
                        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                            <p>
                                CVP Homeopathy was born from a simple observation: while
                                homeopathy has been trusted by millions in Pakistan for
                                generations, most homeopathic doctors still rely on paper-based
                                records and lack an online presence.
                            </p>
                            <p>
                                At the same time, patients struggle to find qualified
                                homeopathic doctors in their area, verify their credentials, and
                                book appointments conveniently. This gap between traditional
                                practice and modern expectations inspired us to create a
                                solution.
                            </p>
                            <p>
                                As part of the Case Vault Pro family, we leverage years of
                                experience in healthcare technology to build tools specifically
                                designed for homeopathic practitioners. Our platform respects
                                the holistic principles of homeopathy while bringing the
                                convenience and efficiency of digital technology.
                            </p>
                            <p>
                                Today, we're proud to serve hundreds of homeopathic doctors and
                                thousands of patients across Karachi, Lahore, and Islamabad—and
                                we're just getting started.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {VALUES.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-card shadow-card text-center"
                                >
                                    <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-16 bg-surface">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            What We Do
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            How we're transforming homeopathic healthcare in Pakistan
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {FEATURES_IMPACT.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-card shadow-card"
                                >
                                    <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Part of Case Vault Pro */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                            Part of Case Vault Pro
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            CVP Homeopathy is the first specialty vertical under Case Vault
                            Pro, a comprehensive healthcare technology platform. We bring the
                            same commitment to quality, security, and innovation that has made
                            Case Vault Pro trusted by healthcare professionals across Pakistan.
                        </p>
                        <div className="inline-block bg-surface px-6 py-3 rounded-lg">
                            <p className="text-parent font-semibold text-lg">
                                by Case Vault Pro
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-primary-dark text-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                            Why Choose CVP Homeopathy?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">
                                        Verified Practitioners
                                    </h3>
                                    <p className="text-gray-200">
                                        Every doctor is verified and approved by our team
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">
                                        Easy Online Booking
                                    </h3>
                                    <p className="text-gray-200">
                                        Book appointments 24/7 with just a few clicks
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">
                                        Free for Doctors
                                    </h3>
                                    <p className="text-gray-200">
                                        No setup fees, no monthly charges, completely free
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">
                                        Secure & Private
                                    </h3>
                                    <p className="text-gray-200">
                                        Your data is encrypted and protected at all times
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-surface">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                        Join Us Today
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Whether you're a doctor looking to digitalize your practice or a
                        patient seeking quality homeopathic care, we're here for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button variant="primary" size="lg">
                                Register as a Doctor
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/doctors">
                            <Button variant="secondary" size="lg">
                                Find a Doctor
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Made with Bob