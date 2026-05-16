"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CITIES } from "@/lib/constants";

interface SearchBarProps {
  onSearch: (city: string, specialty: string) => void;
  initialCity?: string;
  initialSpecialty?: string;
}

export function SearchBar({
  onSearch,
  initialCity = "",
  initialSpecialty = "",
}: SearchBarProps) {
  const [city, setCity] = useState(initialCity);
  const [specialty, setSpecialty] = useState(initialSpecialty);

  const handleSearch = () => {
    onSearch(city, specialty);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* City Select */}
        <div className="flex-1">
          <Select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-12"
          >
            <option value="">All Cities</option>
            {CITIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Specialty Input */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by specialty (e.g., Skin Diseases)"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12"
          />
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} className="h-12 px-8" variant="primary">
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
}

// Made with Bob
