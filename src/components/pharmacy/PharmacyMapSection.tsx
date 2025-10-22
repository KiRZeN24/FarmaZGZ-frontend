"use client";
import dynamic from "next/dynamic";
import { HiMapPin, HiMagnifyingGlass } from "react-icons/hi2";
import { FaCar } from "react-icons/fa";

const PharmacyMap = dynamic(() => import("@/components/PharmacyMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-200 h-64 md:h-80 rounded-lg flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-green-600"></span>
    </div>
  ),
});

interface PharmacyMapSectionProps {
  latitude: number | null;
  longitude: number | null;
  name: string;
  address: string;
}

export default function PharmacyMapSection({
  latitude,
  longitude,
  name,
  address,
}: PharmacyMapSectionProps) {
  return (
    <div className="farma-card mb-6">
      <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
        <HiMapPin className="text-2xl" />
        Ubicación
      </h2>

      {latitude && longitude ? (
        <PharmacyMap
          latitude={parseFloat(latitude.toString())}
          longitude={parseFloat(longitude.toString())}
          name={name}
          address={address}
        />
      ) : (
        <div className="bg-gray-200 h-64 md:h-80 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-600">
            <HiMapPin className="text-6xl mx-auto mb-2" />
            <p>Ubicación no disponible</p>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4 flex-wrap">
        {latitude && longitude ? (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn farma-btn-primary flex items-center gap-2"
          >
            <FaCar className="text-lg" />
            Cómo llegar
          </a>
        ) : (
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn farma-btn-primary flex items-center gap-2"
          >
            <HiMagnifyingGlass className="text-lg" />
            Buscar en Google Maps
          </a>
        )}
      </div>
    </div>
  );
}
