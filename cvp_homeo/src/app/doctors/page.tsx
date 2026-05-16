"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { SearchBar } from "@/components/doctors/SearchBar";
import { Doctor } from "@/lib/types";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function DoctorsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background py-12">
          <div className="container-custom">
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </div>
      }
    >
      <DoctorsPageContent />
    </Suspense>
  );
}

function DoctorsPageContent() {
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [specialty, setSpecialty] = useState(
    searchParams.get("specialty") || "",
  );

  useEffect(() => {
    fetchDoctors();
  }, [city, specialty]);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: any = {};
      if (city) params.city = city;
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
    setCity(newCity);
    setSpecialty(newSpecialty);

    // Update URL
    const params = new URLSearchParams();
    if (newCity) params.set("city", newCity);
    if (newSpecialty) params.set("specialty", newSpecialty);
    const queryString = params.toString();
    window.history.pushState(
      {},
      "",
      queryString ? `/doctors?${queryString}` : "/doctors",
    );
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-dark mb-3">
            Find a Homeopathic Doctor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse verified homeopathic doctors in Pakistan. Book appointments
            online and get natural, holistic care.
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
                doctor{doctors.length !== 1 ? "s" : ""}
                {city && (
                  <>
                    {" "}
                    in <span className="font-semibold capitalize">{city}</span>
                  </>
                )}
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
              No doctors found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all doctors.
            </p>
            <button
              onClick={() => handleSearch("", "")}
              className="text-primary hover:underline font-medium"
            >
              Clear filters and show all doctors
            </button>
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

        {/* Call to Action for Doctors */}
        {!loading && doctors.length > 0 && (
          <div className="mt-12 bg-primary-dark rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">
              Are you a homeopathic doctor?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join CVP Homeopathy and get your own professional website to reach
              more patients.
            </p>
            <a
              href="/register"
              className="inline-block bg-white text-primary-dark px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Register Your Practice
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob
