"use client";

import { useState } from "react";
import { Search, FileText, Calendar, Stethoscope, Globe, Users, ClipboardCheck } from "lucide-react";

const PATIENT_STEPS = [
    {
        icon: Search,
        title: "Search for a Doctor",
        description: "Find homeopathic doctors by city or specialty in your area",
    },
    {
        icon: FileText,
        title: "View Profile",
        description: "Check qualifications, services, and patient reviews",
    },
    {
        icon: Calendar,
        title: "Book Appointment",
        description: "Schedule online or contact via WhatsApp instantly",
    },
    {
        icon: Stethoscope,
        title: "Visit Clinic",
        description: "Your records are ready digitally for seamless care",
    },
];

const DOCTOR_STEPS = [
    {
        icon: Users,
        title: "Register Your Practice",
        description: "Sign up on CVP Homeopathy in just 3 simple steps",
    },
    {
        icon: Globe,
        title: "Get Your Website",
        description: "Your profile and clinic website go live instantly",
    },
    {
        icon: Calendar,
        title: "Manage Appointments",
        description: "Patients find you and book appointments online",
    },
    {
        icon: ClipboardCheck,
        title: "Digital Practice",
        description: "Manage prescriptions, follow-ups, and records digitally",
    },
];

export function HowItWorks() {
    const [activeTab, setActiveTab] = useState<"patients" | "doctors">("patients");

    const steps = activeTab === "patients" ? PATIENT_STEPS : DOCTOR_STEPS;

    return (
        <section className="py-16 bg-white">
            <div className="container-custom">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Simple steps to get started, whether you're a patient or a doctor
                    </p>
                </div>

                {/* Tab Selector */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-surface rounded-full p-1">
                        <button
                            onClick={() => setActiveTab("patients")}
                            className={`px-8 py-3 rounded-full font-medium transition-all ${activeTab === "patients"
                                    ? "bg-primary text-white"
                                    : "text-gray-600 hover:text-primary"
                                }`}
                        >
                            For Patients
                        </button>
                        <button
                            onClick={() => setActiveTab("doctors")}
                            className={`px-8 py-3 rounded-full font-medium transition-all ${activeTab === "doctors"
                                    ? "bg-primary text-white"
                                    : "text-gray-600 hover:text-primary"
                                }`}
                        >
                            For Doctors
                        </button>
                    </div>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className="text-center group hover:transform hover:scale-105 transition-all"
                            >
                                {/* Number Badge */}
                                <div className="relative inline-block mb-4">
                                    <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                                        <Icon className="h-10 w-10 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{step.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Made with Bob