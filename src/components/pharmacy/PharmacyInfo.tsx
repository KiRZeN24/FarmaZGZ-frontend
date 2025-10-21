"use client";

interface PharmacyInfoProps {
  name: string;
  address: string;
  hours: string;
  phone: string;
  guardDate: string;
}

export default function PharmacyInfo({
  name,
  address,
  hours,
  phone,
  guardDate,
}: PharmacyInfoProps) {
  return (
    <div className="flex-1">
      <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
        {name}
      </h1>
      <p className="text-gray-700 mb-2">📍 {address}</p>
      <p className="text-blue-600 mb-2">🕐 {hours}</p>
      <p className="text-gray-600 mb-2">
        📞{" "}
        <a href={`tel:${phone}`} className="hover:text-green-600">
          {phone}
        </a>
      </p>
      <p className="text-gray-600">
        🚨{" "}
        <span className="font-medium">
          Guardia: {new Date(guardDate).toLocaleDateString("es-ES")}
        </span>
      </p>
    </div>
  );
}
