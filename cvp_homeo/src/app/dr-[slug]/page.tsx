"use client";

import { use, useState, useEffect } from "react";
import { Doctor } from "@/lib/types";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import {
  MapPin,
  Briefcase,
  Star,
  Phone,
  Mail,
  Clock,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}

export default function DoctorProfilePage({ params }: ProfilePageProps) {
  const { slug } = use(params);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Booking form state
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDoctor();
  }, [slug]);

  const fetchDoctor = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.doctors.getBySlug(slug);
      setDoctor(data);
    } catch (err: any) {
      setError("Doctor not found");
      console.error("Error fetching doctor:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor) return;

    setSubmitting(true);
    try {
      await api.appointments.create(doctor.id, {
        patient_name: patientName,
        patient_phone: patientPhone,
        patient_gender: patientGender,
        appointment_date: appointmentDate,
        problem_description: problemDescription,
      });
      setBookingSuccess(true);
      // Reset form
      setPatientName("");
      setPatientPhone("");
      setPatientGender("");
      setAppointmentDate("");
      setProblemDescription("");
    } catch (err: any) {
      alert(
        "Failed to book appointment. Please try again or contact the doctor directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Doctor Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The doctor profile you're looking for doesn't exist.
          </p>
          <Link href="/doctors">
            <Button>Browse All Doctors</Button>
          </Link>
        </div>
      </div>
    );
  }

  const rating = doctor.rating || 0;
  const fullStars = Math.floor(rating);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary-dark text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                {doctor.profile_photo ? (
                  <img
                    src={doctor.profile_photo}
                    alt={doctor.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl font-bold">
                    {doctor.full_name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{doctor.full_name}</h1>
              <p className="text-xl opacity-90 mb-4">{doctor.qualification}</p>

              <div className="flex flex-wrap gap-4 text-sm opacity-90 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="capitalize">{doctor.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{doctor.years_of_experience} years experience</span>
                </div>
                {rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span>{rating.toFixed(1)} rating</span>
                  </div>
                )}
              </div>

              {/* Specialties */}
              {doctor.specialties && doctor.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties.map((specialty) => (
                    <Badge
                      key={specialty}
                      variant="accent"
                      className="bg-white/20 text-white border-0"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About {doctor.full_name}
              </h2>
              {doctor.clinic_name && (
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Clinic:</span>{" "}
                  {doctor.clinic_name}
                </p>
              )}
              <p className="text-gray-700">
                {doctor.full_name} is a qualified homeopathic practitioner with{" "}
                {doctor.years_of_experience} years of experience in treating
                various conditions using natural and holistic approaches.
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-3">
                {doctor.phone_number && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="h-5 w-5 text-primary" />
                    <a
                      href={`tel:${doctor.phone_number}`}
                      className="hover:text-primary"
                    >
                      {doctor.phone_number}
                    </a>
                  </div>
                )}
                {doctor.email && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="h-5 w-5 text-primary" />
                    <a
                      href={`mailto:${doctor.email}`}
                      className="hover:text-primary"
                    >
                      {doctor.email}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="capitalize">{doctor.city}, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Book Appointment
              </h2>

              {bookingSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-green-600 mb-3">
                    <svg
                      className="h-12 w-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Appointment Requested!
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    The doctor will contact you shortly to confirm your
                    appointment.
                  </p>
                  <Button
                    onClick={() => setBookingSuccess(false)}
                    variant="secondary"
                    className="w-full"
                  >
                    Book Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <Label htmlFor="patient_name" required>
                      Your Name
                    </Label>
                    <Input
                      id="patient_name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="patient_phone" required>
                      Phone Number
                    </Label>
                    <Input
                      id="patient_phone"
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="patient_gender" required>
                      Gender
                    </Label>
                    <Select
                      id="patient_gender"
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="appointment_date" required>
                      Preferred Date
                    </Label>
                    <Input
                      id="appointment_date"
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="problem_description">
                      Describe Your Problem
                    </Label>
                    <Textarea
                      id="problem_description"
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      rows={4}
                      placeholder="Brief description of your health concern..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? "Booking..." : "Book Appointment"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    The doctor will contact you to confirm the appointment
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
