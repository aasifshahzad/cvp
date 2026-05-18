import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDoctor,
  getHeroSections,
  getServices,
  getAboutDoctor,
  getTestimonials,
  getContactInfo,
} from "@/lib/api";
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
    const doctor = await getDoctor(resolvedParams.id);

    return {
      title: `Dr. ${doctor.full_name} - ${doctor.specialization || "Homeopathic Doctor"}`,
      description: `Book an appointment with Dr. ${doctor.full_name}, ${doctor.specialization || "a homeopathic doctor"}. ${doctor.clinic_name ? `Visit ${doctor.clinic_name}.` : ""}`,
      keywords: [
        doctor.full_name,
        "Homeopathic Doctor",
        doctor.specialization || "",
        "Book Appointment",
        "Natural Healing",
        "CVP Homeopathy",
      ].filter(Boolean),
      openGraph: {
        title: `Dr. ${doctor.full_name} - ${doctor.specialization || "Homeopathic Doctor"}`,
        description: `Book an appointment with Dr. ${doctor.full_name}`,
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
    const doctor = await getDoctor(resolvedParams.id);

    if (!doctor) {
      notFound();
    }

    // Fetch all web content sections in parallel (global endpoints)
    const [heroData, servicesData, aboutData, testimonialsData, contactData] =
      await Promise.allSettled([
        getHeroSections(),
        getServices(),
        getAboutDoctor(),
        getTestimonials(),
        getContactInfo(),
      ]);

    // Use first item from each array (global content)
    const hero = heroData.status === "fulfilled" ? heroData.value[0] : null;
    const services =
      servicesData.status === "fulfilled" ? servicesData.value[0] : null;
    const about = aboutData.status === "fulfilled" ? aboutData.value[0] : null;
    const testimonials =
      testimonialsData.status === "fulfilled"
        ? testimonialsData.value[0]
        : null;
    const contact =
      contactData.status === "fulfilled" ? contactData.value[0] : null;

    return (
      <>
        {/* Hero Section */}
        {hero && <ProfileHero data={hero} doctor={doctor} />}

        {/* Booking Section */}
        <BookingSection
          doctorId={doctor.id}
          doctorName={doctor.full_name}
          consultationFee={doctor.consultation_fee}
        />

        {/* Services Section */}
        {services && <ServicesSection data={services} />}

        {/* About Doctor Section */}
        {about && <AboutSection data={about} />}

        {/* Testimonials Section */}
        {testimonials && <TestimonialsSection data={testimonials} />}

        {/* Contact Section */}
        {contact && <ContactSection data={contact} doctor={doctor} />}

        {/* WhatsApp Floating Button */}
        {contact && contact.whatsapp_number && (
          <WhatsAppButton
            phoneNumber={contact.whatsapp_number}
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
