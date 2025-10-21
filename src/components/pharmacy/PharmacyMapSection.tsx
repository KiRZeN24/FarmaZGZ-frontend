"use client";
import dynamic from "next/dynamic";

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
      <h2 className="text-xl font-semibold text-green-800 mb-4">
        📍 Ubicación
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
            <div className="text-4xl mb-2">📍</div>
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
            className="btn farma-btn-primary"
          >
            🚗 Cómo llegar
          </a>
        ) : (
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn farma-btn-primary"
          >
            🧭 Buscar en Google Maps
          </a>
        )}
      </div>
    </div>
  );
}
