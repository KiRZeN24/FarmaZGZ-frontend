import { Pharmacy } from "@/types";

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
        <div
          key={pharmacy.id}
          className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg"
        >
          <h3 className="font-medium text-black">{pharmacy.name}</h3>
          <p className="text-sm text-gray-600">{pharmacy.address}</p>
          <p className="text-sm text-gray-500">{pharmacy.hours}</p>
          <p className="text-sm text-gray-400">📞 {pharmacy.phone}</p>
        </div>
      ))}
    </div>
  );
}
