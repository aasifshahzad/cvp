import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
    Users,
    BookOpen,
    MessageCircle,
    Heart,
    ArrowRight,
    Calendar,
    User,
} from "lucide-react";

export const metadata = {
    title: "Community | CVP Homeopathy",
    description:
        "Join the CVP Homeopathy community. Read health articles, learn about homeopathy, and connect with practitioners across Pakistan.",
};

const DOCTOR_TESTIMONIALS = [
    {
        name: "Dr. Ahmed Hassan",
        city: "Karachi",
        qualification: "BHMS, 15 years experience",
        image: "/images/doctors/placeholder.jpg",
        quote: "CVP Homeopathy has revolutionized how I manage my practice. The digital tools save me hours every week, and my patients love the online booking system.",
    },
    {
        name: "Dr. Fatima Khan",
        city: "Lahore",
        qualification: "DHMS, 8 years experience",
        image: "/images/doctors/placeholder.jpg",
        quote: "Having my own professional website has been incredible. New patients find me easily, and the platform handles everything from bookings to prescriptions seamlessly.",
    },
    {
        name: "Dr. Imran Ali",
        city: "Islamabad",
        qualification: "BHMS, MD, 20 years experience",
        image: "/images/doctors/placeholder.jpg",
        quote: "The medicine database and patient record system are exactly what homeopaths need. It's clear this platform was built by people who understand our practice.",
    },
];

const BLOG_ARTICLES = [
    {
        title: "What is Homeopathy?",
        excerpt:
            "Discover the principles of homeopathy, how it works, and why millions of people worldwide trust this natural healing system for their health needs.",
        date: "May 15, 2026",
        author: "Dr. Sarah Ahmed",
        category: "Education",
        readTime: "5 min read",
    },
    {
        title: "How to Choose the Right Homeopathic Remedy",
        excerpt:
            "Learn the key factors to consider when selecting a homeopathic remedy, including symptom matching, potency selection, and when to consult a professional.",
        date: "May 10, 2026",
        author: "Dr. Hassan Malik",
        category: "Guide",
        readTime: "7 min read",
    },
    {
        title: "Homeopathy for Children: A Parent's Guide",
        excerpt:
            "Everything parents need to know about using homeopathy for common childhood ailments, from teething troubles to growing pains and behavioral issues.",
        date: "May 5, 2026",
        author: "Dr. Ayesha Khan",
        category: "Family Health",
        readTime: "6 min read",
    },
    {
        title: "Managing Chronic Conditions with Homeopathy",
        excerpt:
            "Explore how homeopathy can help manage chronic conditions like allergies, asthma, arthritis, and digestive disorders through constitutional treatment.",
        date: "April 28, 2026",
        author: "Dr. Imran Siddiqui",
        category: "Treatment",
        readTime: "8 min read",
    },
    {
        title: "The Science Behind Homeopathic Dilutions",
        excerpt:
            "Understanding potentization, the process of dilution and succussion, and what modern research tells us about how homeopathic remedies work.",
        date: "April 20, 2026",
        author: "Dr. Zainab Raza",
        category: "Science",
        readTime: "10 min read",
    },
    {
        title: "Homeopathy and Mental Health",
        excerpt:
            "How homeopathy addresses anxiety, depression, stress, and other mental health concerns through individualized constitutional treatment.",
        date: "April 15, 2026",
        author: "Dr. Kamran Ali",
        category: "Mental Health",
        readTime: "7 min read",
    },
];

const COMMUNITY_STATS = [
    { number: "500+", label: "Registered Doctors" },
    { number: "10,000+", label: "Patients Served" },
    { number: "3", label: "Cities Covered" },
    { number: "50+", label: "Health Articles" },
];

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-primary-dark text-white py-20">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Join Our Growing Community
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                            Connect with homeopathic practitioners, read health articles, and
                            be part of Pakistan's largest homeopathy platform
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="bg-accent text-primary-dark hover:bg-accent/90"
                                >
                                    Join as a Doctor
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/doctors">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="border-white text-white hover:bg-white hover:text-primary-dark"
                                >
                                    Find a Doctor
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Stats */}
            <section className="py-12 bg-surface">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {COMMUNITY_STATS.map((stat, index) => (
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

            {/* Doctor Testimonials */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            What Doctors Are Saying
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Hear from homeopathic practitioners who have transformed their
                            practice with CVP Homeopathy
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {DOCTOR_TESTIMONIALS.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-card shadow-card hover:shadow-card-hover transition-shadow"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center">
                                        <User className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {testimonial.qualification}
                                        </p>
                                        <p className="text-sm text-primary">{testimonial.city}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 italic leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Health Articles & Blog */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            Health Articles & Resources
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Learn about homeopathy, natural healing, and health management from
                            expert practitioners
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_ARTICLES.map((article, index) => (
                            <article
                                key={index}
                                className="bg-surface p-6 rounded-card hover:shadow-card transition-shadow"
                            >
                                <div className="flex items-center gap-2 text-sm text-primary mb-3">
                                    <BookOpen className="h-4 w-4" />
                                    <span className="font-medium">{article.category}</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-600">{article.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span>{article.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{article.date}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-4">
                            More articles coming soon! Join our community to stay updated.
                        </p>
                    </div>
                </div>
            </section>

            {/* Community Features */}
            <section className="py-16 bg-surface">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            Community Features
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            More ways to connect and learn (Coming Soon)
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-card text-center">
                            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Discussion Forum
                            </h3>
                            <p className="text-gray-600">
                                Connect with other practitioners, share experiences, and discuss
                                cases (anonymized)
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-card text-center">
                            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Webinars & Events
                            </h3>
                            <p className="text-gray-600">
                                Attend online seminars, workshops, and continuing education
                                sessions
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-card text-center">
                            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Patient Stories
                            </h3>
                            <p className="text-gray-600">
                                Read inspiring recovery stories and testimonials from patients
                                across Pakistan
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-dark text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Be Part of the Community
                    </h2>
                    <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        Whether you're a doctor or a patient, join Pakistan's largest
                        homeopathy platform today
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-accent text-primary-dark hover:bg-accent/90"
                            >
                                Register as a Doctor
                            </Button>
                        </Link>
                        <Link href="/doctors">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-white text-primary-dark hover:bg-gray-100"
                            >
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