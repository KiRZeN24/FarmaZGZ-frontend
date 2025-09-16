"use client";
import { useEffect, useState } from "react";
import { Pharmacy } from "@/types";
import PharmacyList from "./PharmacyList";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function PharmacyContainer() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch(
          "https://farmazgz.onrender.com/api/pharmacies"
        );
        if (!response.ok) {
          throw new Error("Error al cargar farmacias");
        }
        const data = await response.json();
        setPharmacies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Farmacias de Guardia Hoy
        </h2>
        <p className="text-gray-600 mb-4">
          Encuentra las farmacias de guardia abiertas hoy en Zaragoza
        </p>
        <PharmacyList pharmacies={pharmacies} />
        <p className="text-xs text-gray-500 mt-6">
          Datos actualizados desde la API del backend
        </p>
      </div>
    </div>
  );
}
