"use client";
import { useState } from "react";
import Link from "next/link";
import { Pharmacy } from "@/types";

interface PharmaciesTableProps {
  pharmacies: Pharmacy[];
  onClose: () => void;
}

export default function PharmaciesTable({
  pharmacies,
  onClose,
}: PharmaciesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getPharmaciesPaginated = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pharmacies.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(pharmacies.length / itemsPerPage);

  return (
    <div className="farma-card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-800">
          🏥 Todas las Farmacias ({pharmacies.length})
        </h2>
        <button
          onClick={() => {
            onClose();
            setCurrentPage(1);
          }}
          className="btn btn-sm btn-error btn-outline"
        >
          ✕ Cerrar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-blue-600">
            <tr>
              <th className="text-white">Nombre</th>
              <th className="text-white">Dirección</th>
              <th className="text-white">Teléfono</th>
              <th className="text-white">Guardia</th>
              <th className="text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {getPharmaciesPaginated().map((pharmacy) => (
              <tr
                key={pharmacy.id}
                className="border-b border-gray-300 bg-white hover:bg-gray-100"
              >
                <td className="font-medium text-gray-900">{pharmacy.name}</td>
                <td className="text-gray-900">{pharmacy.address}</td>
                <td className="text-gray-900">{pharmacy.phone || "N/A"}</td>
                <td className="text-gray-900">
                  {new Date(pharmacy.guard_date).toLocaleDateString("es-ES")}
                </td>
                <td>
                  <Link
                    href={`/farmacia/${pharmacy.id}`}
                    className="btn btn-sm btn-info"
                  >
                    👁️ Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-sm btn-outline btn-info"
          >
            ← Anterior
          </button>

          <span className="text-sm font-medium text-gray-700">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-outline btn-info"
          >
            Siguiente →
          </button>
        </div>
      )}

      {pharmacies.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No hay farmacias registradas
        </div>
      )}
    </div>
  );
}
