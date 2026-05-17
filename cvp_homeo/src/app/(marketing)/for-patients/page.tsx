import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
    Search,
    Calendar,
    FileText,
    Heart,
    Shield,
    Clock,
    MapPin,
    Star,
    Phone,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
    title: "For Patients - Find Trusted Homeopathic Doctors | CVP Homeopathy",
    description:
        "Learn how to find and book appointments with verified homeopathic doctors in Pakistan. Easy online booking, trusted practitioners, natural healing.",
};

export default function ForPatientsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-dark to-primary py-20 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
                            Your Journey to Natural Healing Starts Here
                        </h1>
                        <p className="text-xl mb-8 text-white/90">
                            Find trusted homeopathic doctors in your city and book
                            appointments online. Safe, natural, and effective healthcare.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/doctors">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="bg-white text-primary hover:bg-white/90"
                                >
                                    Find a Doctor
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/how-it-works">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="text-white border-white hover:bg-white/10"
                                >
                                    How It Works
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Find a Doctor */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-dark mb-4">
                            How to Find Your Doctor
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Finding the right homeopathic doctor is easy with CVP Homeopathy
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Search,
                                step: "1",
                                title: "Search",
                                description:
                                    "Search by city, specialty, or doctor name to find practitioners near you",
                            },
                            {
                                icon: Star,
                                step: "2",
                                title: "Compare",
                                description:
                                    "View profiles, qualifications, experience, and patient reviews",
                            },
                            {
                                icon: Calendar,
                                step: "3",
                                title: "Book",
                                description:
                                    "Choose a convenient time slot and book your appointment online",
                            },
                            {
                                icon: Heart,
                                step: "4",
                                title: "Visit",
                                description:
                                    "Visit the clinic at your scheduled time and start your healing journey",
                            },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="relative inline-block mb-4">
                                    <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto">
                                        <item.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Homeopathy */}
            <section className="py-16 bg-surface">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-dark mb-4">
                            Why Choose Homeopathy?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Natural, safe, and effective treatment for the whole family
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Shield,
                                title: "Safe & Natural",
                                description:
                                    "Homeopathic medicines are made from natural substances and have no side effects",
                            },
                            {
                                icon: Heart,
                                title: "Holistic Approach",
                                description:
                                    "Treats the whole person - mind, body, and spirit - not just symptoms",
                            },
                            {
                                icon: CheckCircle2,
                                title: "Proven Results",
                                description:
                                    "Effective for chronic conditions, allergies, skin diseases, and more",
                            },
                            {
                                icon: Clock,
                                title: "Long-lasting Relief",
                                description:
                                    "Addresses root causes for lasting healing, not temporary symptom relief",
                            },
                            {
                                icon: Heart,
                                title: "Family-Friendly",
                                description:
                                    "Safe for all ages - from infants to elderly, including pregnant women",
                            },
                            {
                                icon: FileText,
                                title: "Personalized Care",
                                description:
                                    "Treatment tailored to your unique symptoms and constitution",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-card p-6 shadow-card hover:shadow-card-hover transition-shadow"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What to Expect */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-dark mb-4">
                                What to Expect at Your First Visit
                            </h2>
                            <p className="text-lg text-gray-600">
                                Understanding the homeopathic consultation process
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    title: "Detailed Case Taking (30-60 minutes)",
                                    description:
                                        "Your doctor will ask detailed questions about your symptoms, medical history, lifestyle, and emotional state. This helps understand you as a whole person.",
                                },
                                {
                                    title: "Physical Examination",
                                    description:
                                        "A general physical examination may be conducted to assess your current health status.",
                                },
                                {
                                    title: "Remedy Selection",
                                    description:
                                        "Based on your unique symptoms and constitution, your doctor will select the most appropriate homeopathic remedy.",
                                },
                                {
                                    title: "Treatment Plan",
                                    description:
                                        "You'll receive a personalized treatment plan with dosage instructions and follow-up schedule.",
                                },
                                {
                                    title: "Follow-up Appointments",
                                    description:
                                        "Regular follow-ups help monitor progress and adjust treatment as needed for optimal results.",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 p-6 bg-surface rounded-card"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Common Conditions Treated */}
            <section className="py-16 bg-surface">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-dark mb-4">
                            Conditions We Treat
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Homeopathy is effective for a wide range of health conditions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            "Skin Diseases",
                            "Allergies & Asthma",
                            "Digestive Disorders",
                            "Respiratory Issues",
                            "Women's Health",
                            "Children's Health",
                            "Mental Health",
                            "Chronic Pain",
                            "Arthritis",
                            "Migraine & Headaches",
                            "Thyroid Disorders",
                            "Hair Loss",
                            "Anxiety & Depression",
                            "Sleep Disorders",
                            "Autoimmune Diseases",
                            "Hormonal Imbalances",
                        ].map((condition, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <CheckCircle2 className="h-6 w-6 text-primary mx-auto mb-2" />
                                <p className="text-gray-700 font-medium">{condition}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cities We Serve */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-dark mb-4">
                            Find Doctors in Your City
                        </h2>
                        <p className="text-lg text-gray-600">
                            Currently serving major cities in Pakistan
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                city: "Karachi",
                                doctors: "150+",
                                link: "/doctors/karachi",
                            },
                            {
                                city: "Lahore",
                                doctors: "120+",
                                link: "/doctors/lahore",
                            },
                            {
                                city: "Islamabad",
                                doctors: "80+",
                                link: "/doctors/islamabad",
                            },
                        ].map((item, index) => (
                            <Link
                                key={index}
                                href={item.link}
                                className="bg-surface rounded-card p-8 text-center hover:shadow-card-hover transition-shadow group"
                            >
                                <MapPin className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-bold text-primary-dark mb-2">
                                    {item.city}
                                </h3>
                                <p className="text-gray-600 mb-4">{item.doctors} Doctors</p>
                                <span className="text-primary font-medium group-hover:underline">
                                    View Doctors →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-surface">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-dark mb-4">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    question: "Is homeopathy safe?",
                                    answer:
                                        "Yes, homeopathic medicines are completely safe with no side effects. They are made from natural substances in highly diluted forms and can be safely used by people of all ages, including infants, pregnant women, and elderly.",
                                },
                                {
                                    question: "How long does homeopathic treatment take?",
                                    answer:
                                        "Treatment duration varies depending on the condition and individual. Acute conditions may improve within days, while chronic conditions may take several weeks to months for complete healing. Your doctor will provide a realistic timeline during consultation.",
                                },
                                {
                                    question: "Can I take homeopathy with other medicines?",
                                    answer:
                                        "Yes, homeopathic medicines can be taken alongside conventional medicines. However, always inform your homeopathic doctor about any other medications you're taking.",
                                },
                                {
                                    question: "How do I book an appointment?",
                                    answer:
                                        "Simply search for doctors in your city, view their profiles, and click 'Book Appointment'. You can also call the clinic directly using the contact information provided on the doctor's profile.",
                                },
                                {
                                    question: "What should I bring to my first appointment?",
                                    answer:
                                        "Bring any previous medical reports, test results, and a list of current medications. Also, be prepared to discuss your symptoms, medical history, and lifestyle in detail.",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-card p-6 shadow-sm"
                                >
                                    <h3 className="text-xl font-semibold text-primary-dark mb-3">
                                        {item.question}
                                    </h3>
                                    <p className="text-gray-600">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                            Ready to Start Your Healing Journey?
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Find a trusted homeopathic doctor near you and book your
                            appointment today
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/doctors">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="bg-white text-primary hover:bg-white/90"
                                >
                                    <Search className="mr-2 h-5 w-5" />
                                    Find a Doctor
                                </Button>
                            </Link>
                            <Link href="/doctors/karachi">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="text-white border-white hover:bg-white/10"
                                >
                                    <MapPin className="mr-2 h-5 w-5" />
                                    Browse by City
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Made with Bob
