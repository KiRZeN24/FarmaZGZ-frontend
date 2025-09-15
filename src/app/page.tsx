"use client";
import { useEffect, useState } from "react";
import { Pharmacy } from "@/types";

export default function Home() {
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

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2">Cargando farmacias...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center p-8 text-red-600">
          <p>Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        FarmaZGZ - Farmacias de Guardia
      </h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Farmacias de Guardia Hoy
          </h2>
          <p className="text-gray-600 mb-4">
            Encuentra las farmacias de guardia abiertas hoy en Zaragoza
          </p>

          <div className="space-y-3">
            {pharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                className="p-4 border-l-4 border-blue-500 bg-blue-50"
              >
                <h3 className="font-medium text-black">{pharmacy.name}</h3>
                <p className="text-sm text-gray-600">{pharmacy.address}</p>
                <p className="text-sm text-gray-500">{pharmacy.hours}</p>
                <p className="text-sm text-gray-400">📞 {pharmacy.phone}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Datos actualizados desde la API del backend
          </p>
        </div>
      </div>
    </main>
  );
}
