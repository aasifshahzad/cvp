import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
    Globe,
    FileText,
    Calendar,
    DollarSign,
    Database,
    Users,
    CheckCircle,
    ArrowRight,
    Smartphone,
    BarChart,
    Clock,
    Shield,
} from "lucide-react";

export const metadata = {
    title: "For Doctors | CVP Homeopathy",
    description:
        "Transform your homeopathic practice with CVP Homeopathy. Get your own professional website, digital patient records, online bookings, and more—all free to join.",
};

const FEATURES = [
    {
        icon: Globe,
        title: "Your Own Professional Website",
        description:
            "Every doctor gets a personalized website at homeo.casevaultpro.com/dr-[your-name]. Fully customizable from your dashboard with hero section, services, testimonials, and booking form.",
    },
    {
        icon: FileText,
        title: "Digital Patient Records",
        description:
            "Complete case taking, prescriptions, and follow-up history for every patient. No more paper files. Search, filter, and access patient data instantly.",
    },
    {
        icon: Calendar,
        title: "Online Appointment Booking",
        description:
            "Patients book slots based on your live availability. Get instant notifications via email and dashboard. Manage your schedule effortlessly.",
    },
    {
        icon: Database,
        title: "Homeopathic Medicine Catalog",
        description:
            "Searchable database of remedies by kingdom, symptoms, and rubrics. Add your favorite medicines for quick prescription writing.",
    },
    {
        icon: DollarSign,
        title: "Finance Tracking",
        description:
            "Built-in cash book for clinic finances. Track transactions, generate reports, and manage your practice finances in one place.",
    },
    {
        icon: Users,
        title: "Onsite Walk-in Flow",
        description:
            "Register walk-in patients, take cases, write prescriptions, and schedule follow-ups—all in one seamless workflow.",
    },
    {
        icon: Smartphone,
        title: "Mobile Responsive",
        description:
            "Access your dashboard from any device. Your clinic website looks perfect on mobile, tablet, and desktop.",
    },
    {
        icon: BarChart,
        title: "Practice Analytics",
        description:
            "Track patient visits, revenue trends, and practice growth with built-in analytics and reporting tools.",
    },
    {
        icon: Clock,
        title: "Availability Management",
        description:
            "Set your working hours, mark holidays, and manage exceptions. Patients only see available time slots.",
    },
    {
        icon: Shield,
        title: "Secure & Private",
        description:
            "Your data is encrypted and secure. HIPAA-compliant infrastructure ensures patient privacy and data protection.",
    },
];

const BENEFITS = [
    "100% Free to Join - No setup fees, no monthly charges",
    "Professional Online Presence - Stand out from competitors",
    "Save Time - Reduce administrative work by 50%",
    "Grow Your Practice - Get discovered by more patients",
    "Go Paperless - Eco-friendly digital practice",
    "24/7 Availability - Patients can book anytime",
];

const TESTIMONIALS = [
    {
        name: "Dr. Ahmed Hassan",
        city: "Karachi",
        qualification: "BHMS, 15 years experience",
        quote: "CVP Homeopathy transformed my practice. I now manage 40+ patients daily with ease. The digital records and online booking have saved me hours every week.",
    },
    {
        name: "Dr. Fatima Khan",
        city: "Lahore",
        qualification: "DHMS, 8 years experience",
        quote: "Having my own professional website has been a game-changer. New patients find me online, and the booking system works flawlessly. Highly recommended!",
    },
    {
        name: "Dr. Imran Ali",
        city: "Islamabad",
        qualification: "BHMS, MD, 20 years experience",
        quote: "The medicine database and prescription templates save me so much time. The platform is intuitive and designed specifically for homeopaths.",
    },
];

export default function ForDoctorsPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-primary-dark text-white py-20">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Transform Your Homeopathic Practice
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                            Get your own professional website, digital patient records, online
                            bookings, and complete practice management—all in one platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="bg-accent text-primary-dark hover:bg-accent/90"
                                >
                                    Join Free Today
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/how-it-works">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="border-white text-white hover:bg-white hover:text-primary-dark"
                                >
                                    See How It Works
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-surface">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            Why Join CVP Homeopathy?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to run a modern homeopathic practice
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {BENEFITS.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                            >
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 font-medium">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            Complete Practice Management
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            All the tools you need, designed specifically for homeopathic
                            practitioners
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FEATURES.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-card shadow-card hover:shadow-card-hover transition-shadow"
                                >
                                    <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
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

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            Trusted by Homeopaths Across Pakistan
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            See what doctors are saying about CVP Homeopathy
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-surface p-6 rounded-card border-l-4 border-primary"
                            >
                                <p className="text-gray-700 italic mb-4">
                                    "{testimonial.quote}"
                                </p>
                                <div className="border-t border-gray-200 pt-4">
                                    <p className="font-bold text-gray-900">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {testimonial.qualification}
                                    </p>
                                    <p className="text-sm text-primary">{testimonial.city}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-dark text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Digitalize Your Practice?
                    </h2>
                    <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        Join 500+ homeopathic doctors already using CVP Homeopathy. Setup
                        takes less than 5 minutes.
                    </p>
                    <Link href="/register">
                        <Button
                            variant="primary"
                            size="lg"
                            className="bg-accent text-primary-dark hover:bg-accent/90"
                        >
                            Register Your Practice Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <p className="text-sm text-gray-300 mt-4">
                        No credit card required • Approved within 24 hours
                    </p>
                </div>
            </section>
        </main>
    );
}

// Made with Bob