import { Pharmacy } from "@/types";
import Link from "next/link";

interface PharmacyListProps {
  pharmacies: Pharmacy[];
}

export default function PharmacyList({ pharmacies }: PharmacyListProps) {
  if (pharmacies.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No hay farmacias disponibles en este momento
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {pharmacies.map((pharmacy) => (
        <Link
          href={`/farmacia/${pharmacy.id}`}
          key={pharmacy.id}
          className="block farma-card hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h3 className="font-medium text-green-800">{pharmacy.name}</h3>
          <p className="text-sm text-gray-700">{pharmacy.address}</p>
          <p className="text-sm text-blue-600">{pharmacy.hours}</p>
          <p className="text-sm text-gray-600">📞 {pharmacy.phone}</p>
        </Link>
      ))}
    </div>
  );
}
