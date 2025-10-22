import { Pharmacy } from "@/types";
import Link from "next/link";
import { HiMapPin, HiPhone, HiClock, HiChevronRight } from "react-icons/hi2";
import { MdLocalPharmacy } from "react-icons/md";

interface PharmacyListProps {
  pharmacies: Pharmacy[];
}

export default function PharmacyList({
  pharmacies,
}: Readonly<PharmacyListProps>) {
  if (pharmacies.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <MdLocalPharmacy className="text-6xl text-gray-300 mx-auto mb-3" />
        <p>No hay farmacias disponibles en este momento</p>
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
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <h3 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                <MdLocalPharmacy className="text-xl text-red-500 flex-shrink-0" />
                {pharmacy.name}
              </h3>

              <div className="space-y-1.5">
                <p className="text-sm text-gray-700 flex items-start gap-2">
                  <HiMapPin className="text-green-600 text-lg flex-shrink-0 mt-0.5" />
                  <span className="flex-1">{pharmacy.address}</span>
                </p>

                {pharmacy.hours && (
                  <p className="text-sm text-blue-600 flex items-center gap-2">
                    <HiClock className="text-blue-600 text-lg flex-shrink-0" />
                    {pharmacy.hours}
                  </p>
                )}

                {pharmacy.phone && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <HiPhone className="text-gray-600 text-lg flex-shrink-0" />
                    {pharmacy.phone}
                  </p>
                )}
              </div>
            </div>

            <HiChevronRight className="text-2xl text-green-600 flex-shrink-0 mt-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}
