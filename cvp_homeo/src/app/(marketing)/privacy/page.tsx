import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | CVP Homeopathy",
    description:
        "Learn how CVP Homeopathy collects, uses, and protects your personal information. Your privacy and data security are our top priorities.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-br from-primary-dark to-primary py-16 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Shield className="h-16 w-16 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-white/90">
                            Last Updated: May 17, 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Introduction */}
                        <div className="mb-12">
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                At CVP Homeopathy (operated by Case Vault Pro), we are committed
                                to protecting your privacy and ensuring the security of your
                                personal information. This Privacy Policy explains how we
                                collect, use, disclose, and safeguard your information when you
                                use our website and services.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                By using our platform, you agree to the collection and use of
                                information in accordance with this policy. If you do not agree
                                with our policies and practices, please do not use our services.
                            </p>
                        </div>

                        {/* Key Principles */}
                        <div className="mb-12 bg-surface rounded-card p-8">
                            <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-6">
                                Our Privacy Principles
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: Lock,
                                        title: "Data Security",
                                        description:
                                            "We use industry-standard encryption and security measures to protect your data",
                                    },
                                    {
                                        icon: Eye,
                                        title: "Transparency",
                                        description:
                                            "We are clear about what data we collect and how we use it",
                                    },
                                    {
                                        icon: Shield,
                                        title: "Your Control",
                                        description:
                                            "You have control over your personal information and can request deletion",
                                    },
                                    {
                                        icon: FileText,
                                        title: "Compliance",
                                        description:
                                            "We comply with applicable data protection laws and regulations",
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <item.icon className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-primary-dark mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-12">
                            {/* Information We Collect */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    1. Information We Collect
                                </h2>
                                <div className="space-y-4 text-gray-700">
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                            1.1 Personal Information
                                        </h3>
                                        <p className="mb-2">
                                            When you register or use our services, we may collect:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-1">
                                            <li>Full name</li>
                                            <li>Email address</li>
                                            <li>Phone number</li>
                                            <li>Date of birth</li>
                                            <li>Gender</li>
                                            <li>City and address</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                            1.2 Medical Information (For Patients)
                                        </h3>
                                        <p className="mb-2">
                                            When you book appointments or receive treatment:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-1">
                                            <li>Medical history</li>
                                            <li>Symptoms and health conditions</li>
                                            <li>Prescriptions and treatment records</li>
                                            <li>Appointment details</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                            1.3 Professional Information (For Doctors)
                                        </h3>
                                        <ul className="list-disc pl-6 space-y-1">
                                            <li>Medical qualifications and certifications</li>
                                            <li>Professional registration numbers</li>
                                            <li>Clinic information</li>
                                            <li>Years of experience and specializations</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-primary-dark mb-2">
                                            1.4 Usage Information
                                        </h3>
                                        <ul className="list-disc pl-6 space-y-1">
                                            <li>IP address and device information</li>
                                            <li>Browser type and version</li>
                                            <li>Pages visited and time spent</li>
                                            <li>Referring website</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* How We Use Information */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    2. How We Use Your Information
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>We use the collected information for:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            <strong>Service Delivery:</strong> To provide and maintain
                                            our platform, facilitate appointments, and enable
                                            doctor-patient interactions
                                        </li>
                                        <li>
                                            <strong>Communication:</strong> To send appointment
                                            confirmations, reminders, and important updates
                                        </li>
                                        <li>
                                            <strong>Improvement:</strong> To analyze usage patterns
                                            and improve our services
                                        </li>
                                        <li>
                                            <strong>Security:</strong> To detect and prevent fraud,
                                            abuse, and security incidents
                                        </li>
                                        <li>
                                            <strong>Legal Compliance:</strong> To comply with legal
                                            obligations and protect our rights
                                        </li>
                                        <li>
                                            <strong>Marketing:</strong> To send promotional materials
                                            (with your consent, which you can withdraw anytime)
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Information Sharing */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    3. Information Sharing and Disclosure
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>We may share your information with:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            <strong>Healthcare Providers:</strong> Your medical
                                            information is shared with the doctors you book
                                            appointments with
                                        </li>
                                        <li>
                                            <strong>Service Providers:</strong> Third-party companies
                                            that help us operate our platform (hosting, analytics,
                                            payment processing)
                                        </li>
                                        <li>
                                            <strong>Legal Requirements:</strong> When required by law
                                            or to protect our rights and safety
                                        </li>
                                        <li>
                                            <strong>Business Transfers:</strong> In case of merger,
                                            acquisition, or sale of assets
                                        </li>
                                    </ul>
                                    <p className="mt-4 font-semibold">
                                        We do NOT sell your personal information to third parties.
                                    </p>
                                </div>
                            </div>

                            {/* Data Security */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    4. Data Security
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>We implement appropriate security measures including:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>SSL/TLS encryption for data transmission</li>
                                        <li>Encrypted storage of sensitive information</li>
                                        <li>Regular security audits and updates</li>
                                        <li>Access controls and authentication</li>
                                        <li>Employee training on data protection</li>
                                    </ul>
                                    <p className="mt-4">
                                        However, no method of transmission over the internet is 100%
                                        secure. While we strive to protect your information, we
                                        cannot guarantee absolute security.
                                    </p>
                                </div>
                            </div>

                            {/* Your Rights */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    5. Your Rights and Choices
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>You have the right to:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            <strong>Access:</strong> Request a copy of your personal
                                            information
                                        </li>
                                        <li>
                                            <strong>Correction:</strong> Update or correct inaccurate
                                            information
                                        </li>
                                        <li>
                                            <strong>Deletion:</strong> Request deletion of your
                                            account and data
                                        </li>
                                        <li>
                                            <strong>Opt-out:</strong> Unsubscribe from marketing
                                            communications
                                        </li>
                                        <li>
                                            <strong>Data Portability:</strong> Request your data in a
                                            portable format
                                        </li>
                                        <li>
                                            <strong>Withdraw Consent:</strong> Withdraw consent for
                                            data processing where applicable
                                        </li>
                                    </ul>
                                    <p className="mt-4">
                                        To exercise these rights, please contact us at{" "}
                                        <a
                                            href="mailto:privacy@casevaultpro.com"
                                            className="text-primary hover:underline"
                                        >
                                            privacy@casevaultpro.com
                                        </a>
                                    </p>
                                </div>
                            </div>

                            {/* Cookies */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    6. Cookies and Tracking Technologies
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>
                                        We use cookies and similar technologies to enhance your
                                        experience:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            <strong>Essential Cookies:</strong> Required for the
                                            website to function
                                        </li>
                                        <li>
                                            <strong>Analytics Cookies:</strong> Help us understand how
                                            you use our site
                                        </li>
                                        <li>
                                            <strong>Preference Cookies:</strong> Remember your
                                            settings and preferences
                                        </li>
                                    </ul>
                                    <p className="mt-4">
                                        You can control cookies through your browser settings.
                                        However, disabling cookies may affect website functionality.
                                    </p>
                                </div>
                            </div>

                            {/* Children's Privacy */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    7. Children's Privacy
                                </h2>
                                <p className="text-gray-700">
                                    Our services are not intended for children under 13 years of
                                    age. We do not knowingly collect personal information from
                                    children. If you are a parent or guardian and believe your
                                    child has provided us with personal information, please contact
                                    us.
                                </p>
                            </div>

                            {/* Data Retention */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    8. Data Retention
                                </h2>
                                <p className="text-gray-700">
                                    We retain your personal information for as long as necessary to
                                    provide our services and comply with legal obligations. Medical
                                    records are retained according to healthcare regulations and
                                    professional standards. You can request deletion of your
                                    account at any time, subject to legal retention requirements.
                                </p>
                            </div>

                            {/* International Transfers */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    9. International Data Transfers
                                </h2>
                                <p className="text-gray-700">
                                    Your information may be transferred to and processed in
                                    countries other than Pakistan. We ensure appropriate safeguards
                                    are in place to protect your information in accordance with
                                    this Privacy Policy.
                                </p>
                            </div>

                            {/* Changes to Policy */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    10. Changes to This Privacy Policy
                                </h2>
                                <p className="text-gray-700">
                                    We may update this Privacy Policy from time to time. We will
                                    notify you of any changes by posting the new Privacy Policy on
                                    this page and updating the "Last Updated" date. We encourage
                                    you to review this Privacy Policy periodically.
                                </p>
                            </div>

                            {/* Contact */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    11. Contact Us
                                </h2>
                                <div className="bg-surface rounded-card p-6">
                                    <p className="text-gray-700 mb-4">
                                        If you have any questions about this Privacy Policy or our
                                        data practices, please contact us:
                                    </p>
                                    <div className="space-y-2 text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-5 w-5 text-primary" />
                                            <a
                                                href="mailto:privacy@casevaultpro.com"
                                                className="text-primary hover:underline"
                                            >
                                                privacy@casevaultpro.com
                                            </a>
                                        </div>
                                        <p>
                                            <strong>Case Vault Pro</strong>
                                            <br />
                                            Karachi, Pakistan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Links */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <p className="text-gray-600 mb-4">Related Documents:</p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/terms"
                                    className="text-primary hover:underline font-medium"
                                >
                                    Terms of Service →
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-primary hover:underline font-medium"
                                >
                                    About Us →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Made with Bob
