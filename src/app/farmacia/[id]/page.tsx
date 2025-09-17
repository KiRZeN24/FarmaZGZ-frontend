import Link from "next/link";
import { notFound } from "next/navigation";
import { Pharmacy } from "@/types";

interface PharmacyDetailProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ data?: string }>;
}

export default async function PharmacyDetail({
  params,
  searchParams,
}: PharmacyDetailProps) {
  const { id } = await params;
  const { data } = await searchParams;

  if (!data) {
    notFound();
  }

  let pharmacy: Pharmacy;

  try {
    pharmacy = JSON.parse(decodeURIComponent(data));
  } catch (error) {
    console.error("Error parsing pharmacy data:", error);
    notFound();
  }

  if (pharmacy.id !== id) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <Link href="/" className="text-green-600 hover:text-green-800">
              Inicio
            </Link>
          </li>
          <li>Farmacia de Guardia</li>
          <li>{pharmacy.name}</li>
        </ul>
      </div>

      <div className="farma-card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
              {pharmacy.name}
            </h1>
            <p className="text-gray-700 mb-2">📍 {pharmacy.address}</p>
            <p className="text-blue-600 mb-2">🕐 {pharmacy.hours}</p>
            <p className="text-gray-600">
              📞{" "}
              <a
                href={`tel:${pharmacy.phone}`}
                className="hover:text-green-600"
              >
                {pharmacy.phone}
              </a>
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-center">
            <div className="text-sm text-gray-600 mb-3">
              Información verificada
            </div>

            <div className="flex gap-2 justify-center">
              <button className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none">
                👍 Es correcto
              </button>
              <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none">
                👎 No es correcto
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="farma-card mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          📍 Ubicación
        </h2>
        <div className="bg-gray-200 h-64 md:h-80 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="text-4xl mb-2">🗺️</div>
            <p>Mapa próximamente</p>
            <p className="text-sm">{pharmacy.address}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              pharmacy.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn farma-btn-primary"
          >
            🧭 Ver en Google Maps
          </a>
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="btn btn-outline btn-success">
          ← Volver a la lista
        </Link>
      </div>
    </div>
  );
}
