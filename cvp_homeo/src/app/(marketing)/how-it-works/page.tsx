import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
    Search,
    FileText,
    Calendar,
    Stethoscope,
    Users,
    Globe,
    ClipboardCheck,
    ArrowRight,
} from "lucide-react";

export const metadata = {
    title: "How It Works | CVP Homeopathy",
    description:
        "Learn how CVP Homeopathy works for patients and doctors. Simple steps to find doctors, book appointments, or digitalize your practice.",
};

const PATIENT_STEPS = [
    {
        icon: Search,
        title: "Search for a Doctor",
        description:
            "Browse our directory of verified homeopathic doctors. Filter by city, specialty, or search by name. View detailed profiles with qualifications and patient reviews.",
    },
    {
        icon: FileText,
        title: "View Doctor Profile",
        description:
            "Check the doctor's qualifications, years of experience, specializations, services offered, and read testimonials from other patients.",
    },
    {
        icon: Calendar,
        title: "Book Your Appointment",
        description:
            "Fill out a simple booking form with your details and preferred date. You can also contact the doctor directly via WhatsApp for instant communication.",
    },
    {
        icon: Stethoscope,
        title: "Visit the Clinic",
        description:
            "Attend your appointment at the scheduled time. Your records are digitally managed, ensuring seamless and efficient care.",
    },
];

const DOCTOR_STEPS = [
    {
        icon: Users,
        title: "Register Your Practice",
        description:
            "Sign up in just 3 simple steps. Provide your personal information, practice details, and qualifications. Our team reviews and approves within 24 hours.",
    },
    {
        icon: Globe,
        title: "Get Your Professional Website",
        description:
            "Once approved, your personalized clinic website goes live instantly at homeo.casevaultpro.com/dr-[your-name]. Fully customizable from your dashboard.",
    },
    {
        icon: Calendar,
        title: "Manage Appointments",
        description:
            "Patients can find you and book appointments online. Set your availability, receive notifications, and manage your schedule from one central dashboard.",
    },
    {
        icon: ClipboardCheck,
        title: "Digital Practice Management",
        description:
            "Manage patient records, write prescriptions, schedule follow-ups, track finances, and access a comprehensive homeopathic medicine database—all digitally.",
    },
];

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-primary-dark text-white py-16">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Simple steps to get started, whether you're looking for a doctor or
                        want to digitalize your practice
                    </p>
                </div>
            </section>

            {/* For Patients Section */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            For Patients
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Finding and booking a homeopathic doctor has never been easier
                        </p>
                    </div>

                    <div className="space-y-12">
                        {PATIENT_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row gap-6 items-start"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center">
                                                <Icon className="h-10 w-10 text-primary" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                                                {index + 1}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/doctors">
                            <Button variant="primary" size="lg">
                                Find a Doctor Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* For Doctors Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            For Doctors
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Transform your practice with digital tools designed for homeopaths
                        </p>
                    </div>

                    <div className="space-y-12">
                        {DOCTOR_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row gap-6 items-start"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center">
                                                <Icon className="h-10 w-10 text-primary" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                                                {index + 1}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/register">
                            <Button variant="primary" size="lg">
                                Register Your Practice
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-dark text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        Join hundreds of homeopathic doctors and thousands of patients on
                        CVP Homeopathy
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/doctors">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-white text-primary-dark hover:bg-gray-100"
                            >
                                Find a Doctor
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-accent text-primary-dark hover:bg-accent/90"
                            >
                                Join as a Doctor
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Made with Bob