"use client";

import Link from "next/link";
import { Star, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Doctor } from "@/lib/types";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const rating = doctor.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="p-6 space-y-4">
        {/* Doctor Info */}
        <div className="flex gap-4">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center overflow-hidden">
              {doctor.profile_photo ? (
                <img
                  src={doctor.profile_photo}
                  alt={doctor.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {doctor.full_name.charAt(0)}
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {doctor.full_name}
            </h3>
            <p className="text-sm text-gray-600">{doctor.qualification}</p>

            {/* Location & Experience */}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="capitalize">{doctor.city}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{doctor.years_of_experience} years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < fullStars
                      ? "fill-accent text-accent"
                      : i === fullStars && hasHalfStar
                        ? "fill-accent/50 text-accent"
                        : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Specialties */}
        {doctor.specialties && doctor.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {doctor.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="gray" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {doctor.specialties.length > 3 && (
              <Badge variant="gray" className="text-xs">
                +{doctor.specialties.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Clinic Name */}
        {doctor.clinic_name && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Clinic:</span> {doctor.clinic_name}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Link href={`/dr-${doctor.slug}`} className="flex-1">
            <Button variant="primary" className="w-full">
              View Profile
            </Button>
          </Link>
          <Link href={`/dr-${doctor.slug}#book`} className="flex-1">
            <Button variant="secondary" className="w-full">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

// Made with Bob
