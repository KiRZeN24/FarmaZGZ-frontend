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
}: Readonly<PharmacyInfoProps>) {
  const phoneNumbers = phone
    .split("/")
    .map((num) => num.trim())
    .filter((num) => num && num !== "No disponible");

  return (
    <div className="flex-1">
      <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
        {name}
      </h1>

      <p className="text-gray-700 mb-2 flex items-center gap-2">
        <HiMapPin className="text-green-600 text-lg flex-shrink-0" />
        {address}
      </p>

      <p className="text-blue-600 mb-2 flex items-center gap-2">
        <HiClock className="text-blue-600 text-lg flex-shrink-0" />
        {hours}
      </p>

      {phoneNumbers.length > 0 ? (
        <p className="text-gray-600 mb-2 flex items-center gap-2">
          <HiPhone className="text-gray-600 text-lg flex-shrink-0" />
          <span className="flex gap-2 flex-wrap">
            {phoneNumbers.map((number, index) => (
              <span key={index}>
                <a
                  href={`tel:${number.replace(/\s/g, "")}`}
                  className="hover:text-green-600 hover:underline"
                >
                  {number}
                </a>
                {index < phoneNumbers.length - 1 && (
                  <span className="text-gray-400"> / </span>
                )}
              </span>
            ))}
          </span>
        </p>
      ) : (
        <p className="text-gray-600 mb-2 flex items-center gap-2">
          <HiPhone className="text-gray-600 text-lg flex-shrink-0" />
          No disponible
        </p>
      )}

      <p className="text-gray-600 flex items-center gap-2">
        <MdLocalPharmacy className="text-red-500 text-lg flex-shrink-0" />
        <span className="font-medium">
          Guardia: {new Date(guardDate).toLocaleDateString("es-ES")}
        </span>
      </p>
    </div>
  );
}
