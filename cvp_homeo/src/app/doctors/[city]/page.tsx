"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { SearchBar } from "@/components/doctors/SearchBar";
import { Doctor } from "@/lib/types";
import { api } from "@/lib/api";
import { CITIES } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export default function CityPage({ params }: CityPageProps) {
  const { city } = use(params);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState("");

  const cityLabel = CITIES.find((c) => c.value === city)?.label || city;

  useEffect(() => {
    fetchDoctors();
  }, [city, specialty]);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: any = { city };
      if (specialty) params.specialty = specialty;

      const data = await api.doctors.list(params);
      setDoctors(data);
    } catch (err: any) {
      setError("Failed to load doctors. Please try again.");
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newCity: string, newSpecialty: string) => {
    if (newCity && newCity !== city) {
      // Redirect to different city page
      window.location.href = `/doctors/${newCity}${newSpecialty ? `?specialty=${newSpecialty}` : ""}`;
    } else {
      setSpecialty(newSpecialty);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          {" / "}
          <Link href="/doctors" className="hover:text-primary">
            Doctors
          </Link>
          {" / "}
          <span className="text-gray-900 font-medium capitalize">
            {cityLabel}
          </span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-dark mb-3">
            Homeopathic Doctors in {cityLabel}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find and book appointments with verified homeopathic doctors in{" "}
            {cityLabel}. Get natural, holistic care from experienced
            practitioners.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            initialCity={city}
            initialSpecialty={specialty}
          />
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? (
              "Searching..."
            ) : (
              <>
                Found <span className="font-semibold">{doctors.length}</span>{" "}
                homeopathic doctor{doctors.length !== 1 ? "s" : ""} in{" "}
                <span className="font-semibold">{cityLabel}</span>
                {specialty && (
                  <>
                    {" "}
                    specializing in{" "}
                    <span className="font-semibold">{specialty}</span>
                  </>
                )}
              </>
            )}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && doctors.length === 0 && (
          <div className="bg-surface rounded-lg p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No doctors found in {cityLabel}
            </h3>
            <p className="text-gray-600 mb-6">
              {specialty
                ? `Try searching without specialty filters or check other cities.`
                : `We're expanding to ${cityLabel} soon. Check other cities or register as a doctor.`}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/doctors"
                className="text-primary hover:underline font-medium"
              >
                Browse all cities
              </Link>
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Register as a doctor
              </Link>
            </div>
          </div>
        )}

        {/* Doctor Grid */}
        {!loading && !error && doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}

        {/* Other Cities */}
        {!loading && doctors.length > 0 && (
          <div className="mt-12 bg-surface rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Browse Doctors in Other Cities
            </h3>
            <div className="flex flex-wrap gap-3">
              {CITIES.filter((c) => c.value !== city).map((c) => (
                <Link
                  key={c.value}
                  href={`/doctors/${c.value}`}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action for Doctors */}
        <div className="mt-12 bg-primary-dark rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Practice in {cityLabel}?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join CVP Homeopathy and get your own professional website to reach
            more patients in {cityLabel}.
          </p>
          <a
            href="/register"
            className="inline-block bg-white text-primary-dark px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Register Your Practice
          </a>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
