import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Contact Us | CVP Homeopathy",
    description:
        "Get in touch with CVP Homeopathy. Contact us for support, inquiries, or feedback. We're here to help doctors and patients.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-br from-primary-dark to-primary py-16 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <MessageSquare className="h-16 w-16 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-white/90">
                            We're here to help. Reach out to us for any questions or support.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information & Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-3xl font-playfair font-bold text-primary-dark mb-6">
                                    Get in Touch
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Have questions about our platform? Need technical support? Want
                                    to partner with us? We'd love to hear from you.
                                </p>

                                {/* Contact Cards */}
                                <div className="space-y-6">
                                    {/* Email */}
                                    <div className="bg-surface rounded-card p-6 hover:shadow-card-hover transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Mail className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                                    Email Us
                                                </h3>
                                                <p className="text-gray-600 mb-2">
                                                    For general inquiries and support
                                                </p>
                                                <a
                                                    href="mailto:support@casevaultpro.com"
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    support@casevaultpro.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="bg-surface rounded-card p-6 hover:shadow-card-hover transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Phone className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                                    Call Us
                                                </h3>
                                                <p className="text-gray-600 mb-2">
                                                    Monday to Friday, 9 AM - 6 PM PKT
                                                </p>
                                                <a
                                                    href="tel:+923001234567"
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    +92 300 1234567
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* WhatsApp */}
                                    <div className="bg-surface rounded-card p-6 hover:shadow-card-hover transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MessageSquare className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                                    WhatsApp
                                                </h3>
                                                <p className="text-gray-600 mb-2">
                                                    Quick support via WhatsApp
                                                </p>
                                                <a
                                                    href="https://wa.me/923001234567"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    Chat on WhatsApp →
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Office Location */}
                                    <div className="bg-surface rounded-card p-6 hover:shadow-card-hover transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MapPin className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                                    Office Location
                                                </h3>
                                                <p className="text-gray-600">
                                                    Case Vault Pro
                                                    <br />
                                                    Karachi, Pakistan
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Business Hours */}
                                    <div className="bg-surface rounded-card p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Clock className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                                                    Business Hours
                                                </h3>
                                                <div className="space-y-2 text-gray-600">
                                                    <div className="flex justify-between">
                                                        <span>Monday - Friday:</span>
                                                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Saturday:</span>
                                                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Sunday:</span>
                                                        <span className="font-medium">Closed</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div>
                                <div className="bg-surface rounded-card p-8">
                                    <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-6">
                                        Send Us a Message
                                    </h2>
                                    <form className="space-y-6">
                                        {/* Name */}
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="+92 300 1234567"
                                            />
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label
                                                htmlFor="subject"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Subject *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="doctor">Doctor Registration</option>
                                                <option value="patient">Patient Support</option>
                                                <option value="technical">Technical Issue</option>
                                                <option value="partnership">Partnership Opportunity</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={6}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                                placeholder="Tell us how we can help you..."
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                        >
                                            <Send className="mr-2 h-5 w-5" />
                                            Send Message
                                        </Button>

                                        <p className="text-sm text-gray-500 text-center">
                                            We'll get back to you within 24-48 hours
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-surface">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-playfair font-bold text-primary-dark mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-lg text-gray-600">
                                Quick answers to common questions
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    question: "How do I register as a doctor?",
                                    answer:
                                        'Click on "Join as a Doctor" in the navigation menu or visit the /register page. Fill out the registration form with your qualifications and clinic information. Our team will verify your credentials and approve your account within 24-48 hours.',
                                },
                                {
                                    question: "Is the platform free for doctors?",
                                    answer:
                                        "Yes, registration and basic platform use is currently free for doctors. You get your own professional website, patient management tools, and appointment booking system at no cost.",
                                },
                                {
                                    question: "How do patients book appointments?",
                                    answer:
                                        "Patients can search for doctors by city or specialty, view doctor profiles, and book appointments directly through the platform. They can also contact doctors via phone or WhatsApp.",
                                },
                                {
                                    question: "What if I need technical support?",
                                    answer:
                                        "You can reach our support team via email at support@casevaultpro.com, call us during business hours, or use the contact form on this page. We typically respond within 24 hours.",
                                },
                                {
                                    question: "Can I update my doctor profile information?",
                                    answer:
                                        "Yes, doctors can update their profile information, clinic details, services, and availability anytime through their dashboard after logging in.",
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

            {/* Support Categories */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-playfair font-bold text-primary-dark mb-4">
                                How Can We Help You?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "For Doctors",
                                    description:
                                        "Registration help, profile setup, technical support, and platform features",
                                    link: "/for-doctors",
                                },
                                {
                                    title: "For Patients",
                                    description:
                                        "Finding doctors, booking appointments, account help, and general inquiries",
                                    link: "/for-patients",
                                },
                                {
                                    title: "Technical Support",
                                    description:
                                        "Bug reports, technical issues, website problems, and feature requests",
                                    link: "mailto:support@casevaultpro.com",
                                },
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    className="bg-surface rounded-card p-6 hover:shadow-card-hover transition-shadow group"
                                >
                                    <h3 className="text-xl font-semibold text-primary-dark mb-3 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <span className="text-primary font-medium group-hover:underline">
                                        Learn More →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Made with Bob
