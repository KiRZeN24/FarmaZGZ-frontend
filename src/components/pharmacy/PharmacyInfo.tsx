"use client";
import { HiMapPin, HiClock, HiPhone } from "react-icons/hi2";
import { MdLocalPharmacy } from "react-icons/md";

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
      <p className="text-gray-700 mb-2 flex items-center gap-2">
        <HiMapPin className="text-green-600 text-lg" />
        {address}
      </p>
      <p className="text-blue-600 mb-2 flex items-center gap-2">
        <HiClock className="text-blue-600 text-lg" />
        {hours}
      </p>
      <p className="text-gray-600 mb-2 flex items-center gap-2">
        <HiPhone className="text-gray-600 text-lg" />
        <a href={`tel:${phone}`} className="hover:text-green-600">
          {phone}
        </a>
      </p>
      <p className="text-gray-600 flex items-center gap-2">
        <MdLocalPharmacy className="text-red-500 text-lg" />
        <span className="font-medium">
          Guardia: {new Date(guardDate).toLocaleDateString("es-ES")}
        </span>
      </p>
    </div>
  );
}
