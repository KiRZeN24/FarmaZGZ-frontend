"use client";
import { usePharmacy } from "@/contexts/PharmacyContext";
import PharmacyList from "./PharmacyList";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { MdLocalPharmacy } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi2";

export default function PharmacyContainer() {
  const { pharmacies, loading, error } = usePharmacy();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <MdLocalPharmacy className="text-3xl text-red-500" />
          Farmacias de Guardia Hoy
        </h2>
        <p className="text-gray-600 mb-4 flex items-center gap-2">
          <HiInformationCircle className="text-blue-500 text-xl flex-shrink-0" />
          Encuentra las farmacias de guardia abiertas hoy en Zaragoza
        </p>
        <PharmacyList pharmacies={pharmacies} />
        <p className="text-xs text-gray-500 mt-6">
          Datos actualizados desde la API del Ayuntamiento de Zaragoza
        </p>
      </div>
    </div>
  );
}
