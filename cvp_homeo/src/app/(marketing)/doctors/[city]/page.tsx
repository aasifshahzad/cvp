import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { SearchBar } from "@/components/doctors/SearchBar";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface CityPageProps {
  params?: Promise<{
    city: string;
  }>;
  searchParams?: Promise<any>;
}

const VALID_CITIES = ["karachi", "lahore", "islamabad"];

async function getDoctorsByCity(city: string) {
  try {
    const doctors = await api.doctors.list({ city });
    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export async function generateMetadata({ params }: CityPageProps) {
  const resolvedParams = await params!;
  const city = resolvedParams.city.toLowerCase();
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `Homeopathic Doctors in ${cityName} | Book Online | CVP Homeopathy`,
    description: `Find and book verified homeopathic doctors in ${cityName}, Pakistan. Browse qualified practitioners, read reviews, and schedule appointments online.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const resolvedParams = await params!;
  const city = resolvedParams.city.toLowerCase();

  if (!VALID_CITIES.includes(city)) {
    notFound();
  }

  const doctors = await getDoctorsByCity(city);
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/doctors" className="hover:text-primary">
            Doctors
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{cityName}</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-dark mb-3">
            Homeopathic Doctors in {cityName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse {doctors.length} verified homeopathic doctors in {cityName}.
            Book appointments online and get natural, holistic care.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchBar
              onSearch={(newCity, specialty) => {
                const params = new URLSearchParams();
                if (newCity) params.set("city", newCity);
                if (specialty) params.set("specialty", specialty);
                window.location.href = `/doctors?${params.toString()}`;
              }}
              initialCity={city}
              initialSpecialty=""
            />
          </Suspense>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold">{doctors.length}</span> doctor
            {doctors.length !== 1 ? "s" : ""} in {cityName}
          </p>
        </div>

        {/* Empty State */}
        {doctors.length === 0 && (
          <div className="bg-surface rounded-lg p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No doctors found in {cityName} yet
            </h3>
            <p className="text-gray-600 mb-6">
              We're growing! Check back soon or browse doctors in other cities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/doctors">
                <Button variant="primary">Browse All Cities</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary">Register as a Doctor</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Doctor Grid */}
        {doctors.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>

            {/* Other Cities CTA */}
            <div className="bg-white rounded-card shadow-card p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Looking for doctors in other cities?
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {VALID_CITIES.filter((c) => c !== city).map((otherCity) => (
                  <Link key={otherCity} href={`/doctors/${otherCity}`}>
                    <Button variant="secondary">
                      {otherCity.charAt(0).toUpperCase() + otherCity.slice(1)}
                    </Button>
                  </Link>
                ))}
                <Link href="/doctors">
                  <Button variant="ghost">View All</Button>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Doctor Registration CTA */}
        <div className="mt-12 bg-primary-dark rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            Are you a homeopathic doctor in {cityName}?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Join CVP Homeopathy and get your own professional website to reach
            more patients.
          </p>
          <Link href="/register">
            <Button
              variant="primary"
              size="lg"
              className="bg-accent text-primary-dark hover:bg-accent/90"
            >
              Register Your Practice
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
