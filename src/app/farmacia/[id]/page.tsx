"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Pharmacy } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { API_CONFIG } from "@/config/api.config";

interface PharmacyDetailProps {
  params: Promise<{ id: string }>;
}

export default function PharmacyDetail({ params }: PharmacyDetailProps) {
  const { id } = use(params);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_CONFIG.baseURL}/pharmacies/${id}`);

        if (!response.ok) {
          setPharmacy(null);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setPharmacy(data);
      } catch (error) {
        console.error("Error fetching pharmacy:", error);
        setPharmacy(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacy();
  }, [id]);

  const handleValidation = async (isValid: boolean) => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push("/login");
      return;
    }

    setValidating(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/validations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pharmacyId: id,
          isValid,
        }),
      });

      if (response.ok) {
        const message = isValid
          ? "✅ ¡Gracias por validar esta farmacia como correcta!"
          : "❌ Gracias por reportar que la información no es correcta";

        alert(message);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "No se pudo enviar la validación"}`);
      }
    } catch (error) {
      console.error("Error al validar:", error);
      alert("Error de conexión al enviar la validación");
    } finally {
      setValidating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!pharmacy) {
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
              ¿Es correcta esta información?
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleValidation(true)}
                disabled={validating}
                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none disabled:bg-gray-400"
              >
                {validating ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "👍 Es correcto"
                )}
              </button>
              <button
                onClick={() => handleValidation(false)}
                disabled={validating}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none disabled:bg-gray-400"
              >
                {validating ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "👎 No es correcto"
                )}
              </button>
            </div>

            {!isAuthenticated && (
              <p className="text-xs text-gray-500 mt-2">
                Debes iniciar sesión para validar
              </p>
            )}
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
