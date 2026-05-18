"use client";

import Link from "next/link";
import { Star, MapPin, Briefcase, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Doctor, DoctorPublicInfo } from "@/lib/types";

interface DoctorCardProps {
  doctor: Doctor | DoctorPublicInfo;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  // Handle both legacy Doctor type and new DoctorPublicInfo type
  const rating = "rating" in doctor ? doctor.rating || 0 : 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const profilePhoto =
    "profile_photo" in doctor ? doctor.profile_photo : undefined;
  const qualification =
    "qualification" in doctor ? doctor.qualification : undefined;
  const city = "city" in doctor ? doctor.city : undefined;
  const yearsOfExperience =
    "years_of_experience" in doctor ? doctor.years_of_experience : undefined;
  const specialties = "specialties" in doctor ? doctor.specialties : undefined;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="p-6 space-y-4">
        {/* Doctor Info */}
        <div className="flex gap-4">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center overflow-hidden">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
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
            {qualification && (
              <p className="text-sm text-gray-600">{qualification}</p>
            )}
            {doctor.specialization && (
              <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                <Stethoscope className="h-3 w-3" />
                <span>{doctor.specialization}</span>
              </div>
            )}

            {/* Location & Experience */}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              {city && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="capitalize">{city}</span>
                </div>
              )}
              {yearsOfExperience && (
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{yearsOfExperience} years</span>
                </div>
              )}
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
        {specialties && specialties.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="gray" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {specialties.length > 3 && (
              <Badge variant="gray" className="text-xs">
                +{specialties.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Clinic Name & Fee */}
        <div className="space-y-1">
          {doctor.clinic_name && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Clinic:</span> {doctor.clinic_name}
            </p>
          )}
          {doctor.consultation_fee && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Fee:</span> Rs.{" "}
              {doctor.consultation_fee}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Link href={`/doctor/${doctor.id}`} className="w-full">
            <Button variant="primary" className="w-full">
              View Profile
            </Button>
          </Link>
          <Link href={`/doctor/${doctor.id}#booking`} className="w-full">
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
