import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Scale, AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service | CVP Homeopathy",
    description:
        "Read the terms and conditions for using CVP Homeopathy platform. Understand your rights and responsibilities as a user.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-br from-primary-dark to-primary py-16 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Scale className="h-16 w-16 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                            Terms of Service
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
                                Welcome to CVP Homeopathy, operated by Case Vault Pro. These
                                Terms of Service ("Terms") govern your access to and use of our
                                website, platform, and services. By accessing or using our
                                services, you agree to be bound by these Terms.
                            </p>
                            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
                                <div className="flex gap-3">
                                    <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                                    <p className="text-gray-700">
                                        <strong>Important:</strong> Please read these Terms
                                        carefully before using our services. If you do not agree
                                        with these Terms, you must not use our platform.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Key Points */}
                        <div className="mb-12 bg-surface rounded-card p-8">
                            <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-6">
                                Key Points
                            </h2>
                            <div className="space-y-3">
                                {[
                                    "You must be 18 years or older to use our services",
                                    "Doctors must have valid medical qualifications",
                                    "You are responsible for maintaining account security",
                                    "Medical information shared is confidential",
                                    "We are a platform connecting doctors and patients, not a healthcare provider",
                                ].map((point, index) => (
                                    <div key={index} className="flex gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-12">
                            {/* Acceptance of Terms */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    1. Acceptance of Terms
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>
                                        By creating an account, accessing, or using CVP Homeopathy,
                                        you acknowledge that you have read, understood, and agree to
                                        be bound by these Terms and our Privacy Policy. These Terms
                                        apply to all users, including doctors, patients, and
                                        visitors.
                                    </p>
                                    <p>
                                        We reserve the right to modify these Terms at any time. We
                                        will notify you of any material changes by posting the new
                                        Terms on this page. Your continued use of the platform after
                                        such changes constitutes acceptance of the modified Terms.
                                    </p>
                                </div>
                            </div>

                            {/* Eligibility */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    2. Eligibility
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>To use our services, you must:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Be at least 18 years of age</li>
                                        <li>
                                            Have the legal capacity to enter into binding contracts
                                        </li>
                                        <li>
                                            Not be prohibited from using our services under applicable
                                            laws
                                        </li>
                                        <li>
                                            Provide accurate and complete registration information
                                        </li>
                                    </ul>
                                    <p className="mt-4">
                                        <strong>For Doctors:</strong> You must hold valid medical
                                        qualifications recognized in Pakistan and be legally
                                        authorized to practice homeopathy.
                                    </p>
                                </div>
                            </div>

                            {/* Account Registration */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    3. Account Registration and Security
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <h3 className="text-xl font-semibold text-primary-dark">
                                        3.1 Account Creation
                                    </h3>
                                    <p>
                                        You must create an account to access certain features. You
                                        agree to:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Provide accurate, current, and complete information</li>
                                        <li>Maintain and update your information</li>
                                        <li>Keep your password secure and confidential</li>
                                        <li>
                                            Notify us immediately of any unauthorized access or
                                            security breach
                                        </li>
                                    </ul>

                                    <h3 className="text-xl font-semibold text-primary-dark mt-4">
                                        3.2 Account Responsibility
                                    </h3>
                                    <p>
                                        You are responsible for all activities that occur under your
                                        account. We are not liable for any loss or damage arising
                                        from your failure to maintain account security.
                                    </p>

                                    <h3 className="text-xl font-semibold text-primary-dark mt-4">
                                        3.3 Doctor Verification
                                    </h3>
                                    <p>
                                        Doctor accounts are subject to verification. We reserve the
                                        right to request additional documentation to verify
                                        credentials and may suspend or terminate accounts that fail
                                        verification.
                                    </p>
                                </div>
                            </div>

                            {/* Use of Services */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    4. Use of Services
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <h3 className="text-xl font-semibold text-primary-dark">
                                        4.1 Platform Purpose
                                    </h3>
                                    <p>
                                        CVP Homeopathy is a platform that connects patients with
                                        homeopathic doctors. We facilitate:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Doctor profile listings and search</li>
                                        <li>Appointment booking and management</li>
                                        <li>Digital record keeping for doctors</li>
                                        <li>Communication between doctors and patients</li>
                                    </ul>

                                    <h3 className="text-xl font-semibold text-primary-dark mt-4">
                                        4.2 Not a Healthcare Provider
                                    </h3>
                                    <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
                                        <p className="font-semibold mb-2">Important Disclaimer:</p>
                                        <p>
                                            CVP Homeopathy is NOT a healthcare provider. We do not
                                            provide medical advice, diagnosis, or treatment. All
                                            medical services are provided by independent healthcare
                                            professionals. We are not responsible for the quality,
                                            safety, or legality of services provided by doctors on our
                                            platform.
                                        </p>
                                    </div>

                                    <h3 className="text-xl font-semibold text-primary-dark mt-4">
                                        4.3 Prohibited Uses
                                    </h3>
                                    <p>You agree NOT to:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>
                                            Use the platform for any illegal or unauthorized purpose
                                        </li>
                                        <li>
                                            Impersonate any person or entity or misrepresent your
                                            affiliation
                                        </li>
                                        <li>
                                            Upload or transmit viruses, malware, or harmful code
                                        </li>
                                        <li>
                                            Interfere with or disrupt the platform's operation
                                        </li>
                                        <li>
                                            Scrape, harvest, or collect user information without
                                            consent
                                        </li>
                                        <li>
                                            Post false, misleading, or fraudulent information
                                        </li>
                                        <li>Violate any applicable laws or regulations</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Doctor Responsibilities */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    5. Doctor Responsibilities
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>If you are a doctor using our platform, you agree to:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            Maintain valid medical licenses and professional
                                            registrations
                                        </li>
                                        <li>
                                            Provide accurate information about qualifications and
                                            experience
                                        </li>
                                        <li>
                                            Comply with all applicable medical laws and ethical
                                            standards
                                        </li>
                                        <li>
                                            Maintain patient confidentiality and data protection
                                        </li>
                                        <li>
                                            Provide professional and ethical medical services
                                        </li>
                                        <li>
                                            Honor appointments and maintain professional conduct
                                        </li>
                                        <li>
                                            Keep your profile information current and accurate
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Patient Responsibilities */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    6. Patient Responsibilities
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>If you are a patient using our platform, you agree to:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            Provide accurate medical information to your doctor
                                        </li>
                                        <li>Honor scheduled appointments or cancel in advance</li>
                                        <li>
                                            Follow your doctor's instructions and treatment plans
                                        </li>
                                        <li>
                                            Respect doctor's time and professional boundaries
                                        </li>
                                        <li>
                                            Pay applicable fees for consultations and services
                                        </li>
                                        <li>
                                            Not use the platform for emergency medical situations
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Intellectual Property */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    7. Intellectual Property Rights
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>
                                        All content on CVP Homeopathy, including text, graphics,
                                        logos, images, software, and design, is the property of Case
                                        Vault Pro or its licensors and is protected by copyright,
                                        trademark, and other intellectual property laws.
                                    </p>
                                    <p>You may not:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>
                                            Copy, modify, distribute, or reproduce any content without
                                            permission
                                        </li>
                                        <li>Use our trademarks or branding without authorization</li>
                                        <li>
                                            Create derivative works based on our platform or content
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Payment Terms */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    8. Payment and Fees
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>
                                        <strong>For Doctors:</strong> Registration and basic
                                        platform use is currently free. We reserve the right to
                                        introduce subscription fees or transaction fees in the
                                        future with advance notice.
                                    </p>
                                    <p>
                                        <strong>For Patients:</strong> Consultation fees are set by
                                        individual doctors. Payment is made directly to the doctor
                                        at the clinic unless otherwise specified.
                                    </p>
                                    <p>
                                        All fees are non-refundable unless otherwise stated or
                                        required by law.
                                    </p>
                                </div>
                            </div>

                            {/* Cancellation Policy */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    9. Cancellation and Refund Policy
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>
                                        <strong>Appointment Cancellations:</strong> Patients should
                                        cancel appointments at least 24 hours in advance. Doctors
                                        may set their own cancellation policies.
                                    </p>
                                    <p>
                                        <strong>Account Termination:</strong> You may terminate your
                                        account at any time through your account settings or by
                                        contacting us.
                                    </p>
                                </div>
                            </div>

                            {/* Disclaimers */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    10. Disclaimers and Limitations of Liability
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
                                        <p className="font-semibold mb-2">
                                            IMPORTANT LEGAL NOTICE:
                                        </p>
                                        <p className="mb-2">
                                            THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE"
                                            WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                                        </p>
                                        <p>
                                            WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED,
                                            ERROR-FREE, OR FREE FROM VIRUSES OR OTHER HARMFUL
                                            COMPONENTS.
                                        </p>
                                    </div>

                                    <p className="mt-4">
                                        <strong>Medical Disclaimer:</strong> We are not responsible
                                        for:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>
                                            The quality, safety, or legality of medical services
                                            provided by doctors
                                        </li>
                                        <li>
                                            Medical advice, diagnosis, or treatment provided by
                                            doctors
                                        </li>
                                        <li>
                                            Outcomes of medical consultations or treatments
                                        </li>
                                        <li>
                                            Disputes between doctors and patients
                                        </li>
                                    </ul>

                                    <p className="mt-4">
                                        <strong>Limitation of Liability:</strong> To the maximum
                                        extent permitted by law, Case Vault Pro shall not be liable
                                        for any indirect, incidental, special, consequential, or
                                        punitive damages arising from your use of the platform.
                                    </p>
                                </div>
                            </div>

                            {/* Indemnification */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    11. Indemnification
                                </h2>
                                <p className="text-gray-700">
                                    You agree to indemnify, defend, and hold harmless Case Vault
                                    Pro, its officers, directors, employees, and agents from any
                                    claims, damages, losses, liabilities, and expenses (including
                                    legal fees) arising from:
                                </p>
                                <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                                    <li>Your use of the platform</li>
                                    <li>Your violation of these Terms</li>
                                    <li>Your violation of any rights of another party</li>
                                    <li>
                                        Medical services provided or received through the platform
                                    </li>
                                </ul>
                            </div>

                            {/* Termination */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    12. Termination
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>
                                        We reserve the right to suspend or terminate your account
                                        and access to the platform at any time, without notice, for:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Violation of these Terms</li>
                                        <li>Fraudulent or illegal activity</li>
                                        <li>Providing false information</li>
                                        <li>Abusive or inappropriate behavior</li>
                                        <li>Any other reason at our sole discretion</li>
                                    </ul>
                                    <p className="mt-4">
                                        Upon termination, your right to use the platform will
                                        immediately cease. We may retain certain information as
                                        required by law or for legitimate business purposes.
                                    </p>
                                </div>
                            </div>

                            {/* Governing Law */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    13. Governing Law and Dispute Resolution
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>
                                        These Terms shall be governed by and construed in accordance
                                        with the laws of Pakistan, without regard to conflict of law
                                        principles.
                                    </p>
                                    <p>
                                        Any disputes arising from these Terms or your use of the
                                        platform shall be resolved through:
                                    </p>
                                    <ol className="list-decimal pl-6 space-y-1">
                                        <li>Good faith negotiations between the parties</li>
                                        <li>
                                            Mediation, if negotiations fail
                                        </li>
                                        <li>
                                            Arbitration or courts in Karachi, Pakistan, as a last
                                            resort
                                        </li>
                                    </ol>
                                </div>
                            </div>

                            {/* General Provisions */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    14. General Provisions
                                </h2>
                                <div className="space-y-3 text-gray-700">
                                    <p>
                                        <strong>Entire Agreement:</strong> These Terms constitute
                                        the entire agreement between you and Case Vault Pro regarding
                                        the platform.
                                    </p>
                                    <p>
                                        <strong>Severability:</strong> If any provision is found
                                        invalid, the remaining provisions will remain in effect.
                                    </p>
                                    <p>
                                        <strong>Waiver:</strong> Our failure to enforce any right or
                                        provision does not constitute a waiver of that right.
                                    </p>
                                    <p>
                                        <strong>Assignment:</strong> You may not assign these Terms
                                        without our consent. We may assign these Terms without
                                        restriction.
                                    </p>
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <h2 className="text-2xl font-playfair font-bold text-primary-dark mb-4">
                                    15. Contact Information
                                </h2>
                                <div className="bg-surface rounded-card p-6">
                                    <p className="text-gray-700 mb-4">
                                        If you have questions about these Terms, please contact us:
                                    </p>
                                    <div className="space-y-2 text-gray-700">
                                        <p>
                                            <strong>Email:</strong>{" "}
                                            <a
                                                href="mailto:legal@casevaultpro.com"
                                                className="text-primary hover:underline"
                                            >
                                                legal@casevaultpro.com
                                            </a>
                                        </p>
                                        <p>
                                            <strong>Case Vault Pro</strong>
                                            <br />
                                            Karachi, Pakistan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Acknowledgment */}
                        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-card p-6">
                            <div className="flex gap-3">
                                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-gray-700 font-semibold mb-2">
                                        By using CVP Homeopathy, you acknowledge that:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                        <li>You have read and understood these Terms</li>
                                        <li>You agree to be bound by these Terms</li>
                                        <li>
                                            You understand the disclaimers and limitations of
                                            liability
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Related Links */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <p className="text-gray-600 mb-4">Related Documents:</p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/privacy"
                                    className="text-primary hover:underline font-medium"
                                >
                                    Privacy Policy →
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
