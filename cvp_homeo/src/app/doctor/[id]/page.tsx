import { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { BookingSection } from "@/components/profile/BookingSection";
import { ServicesSection } from "@/components/profile/ServicesSection";
import { AboutSection } from "@/components/profile/AboutSection";
import { TestimonialsSection } from "@/components/profile/TestimonialsSection";
import { ContactSection } from "@/components/profile/ContactSection";
import { WhatsAppButton } from "@/components/profile/WhatsAppButton";

interface PageProps {
    params?: Promise<{
        id: string;
    }>;
    searchParams?: Promise<any>;
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    try {
        const resolvedParams = await params!;
        const doctor = await api.doctors.getById(resolvedParams.id);

        return {
            title: `Dr. ${doctor.full_name} - ${doctor.specialization || "Homeopathic Doctor"} in ${doctor.city}`,
            description: `Book an appointment with Dr. ${doctor.full_name}, an experienced ${doctor.specialization || "homeopathic"} doctor in ${doctor.city}. ${doctor.years_of_experience}+ years of experience.`,
            keywords: [
                doctor.full_name,
                "Homeopathic Doctor",
                doctor.city,
                doctor.specialization || "",
                "Book Appointment",
                "Natural Healing",
                "CVP Homeopathy",
            ].filter(Boolean),
            openGraph: {
                title: `Dr. ${doctor.full_name} - ${doctor.specialization || "Homeopathic Doctor"}`,
                description: `Book an appointment with Dr. ${doctor.full_name} in ${doctor.city}`,
                type: "profile",
            },
        };
    } catch (error) {
        return {
            title: "Doctor Profile - CVP Homeopathy",
            description: "Find and book appointments with homeopathic doctors",
        };
    }
}

export default async function DoctorProfilePage({ params }: PageProps) {
    try {
        // Fetch doctor basic info
        const resolvedParams = await params!;
        console.log("Fetching doctor with ID:", resolvedParams.id);
        const doctor = await api.doctors.getById(resolvedParams.id);

        if (!doctor) {
            notFound();
        }

        console.log("Doctor fetched:", doctor.full_name);

        // Fetch all web content sections in parallel
        console.log("Fetching web content for doctor ID:", doctor.id);
        const [heroData, servicesData, aboutData, testimonialsData, contactData] =
            await Promise.allSettled([
                api.webContent.getHero(doctor.id),
                api.webContent.getServices(doctor.id),
                api.webContent.getAbout(doctor.id),
                api.webContent.getTestimonials(doctor.id),
                api.webContent.getContact(doctor.id),
            ]);

        // Log results
        console.log("Hero data:", heroData.status);
        console.log("Services data:", servicesData.status);
        console.log("About data:", aboutData.status);
        console.log("Testimonials data:", testimonialsData.status);
        console.log("Contact data:", contactData.status);

        return (
            <>
                {/* Hero Section */}
                {heroData.status === "fulfilled" && (
                    <ProfileHero data={heroData.value} doctor={doctor} />
                )}

                {/* Booking Section */}
                <BookingSection
                    doctorId={doctor.id}
                    doctorName={doctor.full_name}
                    consultationFee={doctor.consultation_fee}
                />

                {/* Services Section */}
                {servicesData.status === "fulfilled" && (
                    <ServicesSection data={servicesData.value} />
                )}

                {/* About Doctor Section */}
                {aboutData.status === "fulfilled" && (
                    <AboutSection data={aboutData.value} />
                )}

                {/* Testimonials Section */}
                {testimonialsData.status === "fulfilled" && (
                    <TestimonialsSection data={testimonialsData.value} />
                )}

                {/* Contact Section */}
                {contactData.status === "fulfilled" && (
                    <ContactSection data={contactData.value} doctor={doctor} />
                )}

                {/* WhatsApp Floating Button */}
                {contactData.status === "fulfilled" &&
                    contactData.value.whatsapp_number && (
                        <WhatsAppButton
                            phoneNumber={contactData.value.whatsapp_number}
                            doctorName={doctor.full_name}
                        />
                    )}
            </>
        );
    } catch (error) {
        console.error("Error loading doctor profile:", error);
        notFound();
    }
}

// Made with Bob