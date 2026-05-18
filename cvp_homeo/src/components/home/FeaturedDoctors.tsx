"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Button } from "@/components/ui/Button";
import { DoctorPublicInfo } from "@/lib/types";
import { getDoctors } from "@/lib/api";
import { Loader2 } from "lucide-react";

const CITIES = ["karachi", "lahore", "islamabad"];

interface FeaturedDoctorsProps {
  doctors?: DoctorPublicInfo[];
}

export function FeaturedDoctors({
  doctors: initialDoctors = [],
}: FeaturedDoctorsProps) {
  const [selectedCity, setSelectedCity] = useState("all");
  const [doctors, setDoctors] = useState<DoctorPublicInfo[]>(initialDoctors);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch if city filter is used and we don't have initial data
    if (selectedCity !== "all") {
      fetchDoctors();
    } else if (initialDoctors.length > 0) {
      setDoctors(initialDoctors);
    }
  }, [selectedCity]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await getDoctors();
      // Since backend doesn't support city filtering yet, show all
      setDoctors(data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching featured doctors:", error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Find Homeopathic Doctors Near You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse verified homeopathic doctors in major cities across Pakistan
          </p>
        </div>

        {/* City Tabs - Hidden for now since backend doesn't support city filtering */}
        {/* Will be enabled when backend adds city field to DoctorPublicInfo */}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Doctor Grid */}
        {!loading && doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && doctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              No doctors found in {selectedCity} yet.
            </p>
            <p className="text-sm text-gray-500">
              We're growing! Check back soon or try another city.
            </p>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/doctors">
            <Button variant="primary">See All Doctors</Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary">Join as a Doctor</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Made with Bob
