"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Pharmacy } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { API_CONFIG } from "@/config/api.config";
import dynamic from "next/dynamic";

interface PharmacyDetailProps {
  params: Promise<{ id: string }>;
}

interface ValidationStats {
  total: number;
  positive: number;
  negative: number;
  accuracyRate: number | null;
  validations: Array<{
    isValid: boolean;
    username: string;
    createdAt: string;
    comment?: string;
  }>;
}

const PharmacyMap = dynamic(() => import("@/components/PharmacyMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-200 h-64 md:h-80 rounded-lg flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-green-600"></span>
    </div>
  ),
});

export default function PharmacyDetail({
  params,
}: Readonly<PharmacyDetailProps>) {
  const { id } = use(params);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [validationStats, setValidationStats] =
    useState<ValidationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  const [userHasValidated, setUserHasValidated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const pharmacyResponse = await fetch(
          `${API_CONFIG.baseURL}/pharmacies/${id}`
        );
        if (!pharmacyResponse.ok) {
          setPharmacy(null);
          setLoading(false);
          return;
        }
        const pharmacyData = await pharmacyResponse.json();
        setPharmacy(pharmacyData);

        const statsResponse = await fetch(
          `${API_CONFIG.baseURL}/pharmacies/${id}/validations`
        );
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setValidationStats(statsData);
        }

        if (isAuthenticated && user) {
          const token = localStorage.getItem("token");
          const myValidationsResponse = await fetch(
            `${API_CONFIG.baseURL}/validations/my-validations`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (myValidationsResponse.ok) {
            const myValidations = await myValidationsResponse.json();
            const hasValidated = myValidations.some(
              (v: { pharmacyId: string }) => v.pharmacyId === id
            );
            setUserHasValidated(hasValidated);
          }
        }
      } catch (error) {
        console.error("Error fetching pharmacy:", error);
        setPharmacy(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isAuthenticated, user]);

  const handleValidation = async (isValid: boolean) => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push("/login");
      return;
    }

    setValidating(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_CONFIG.baseURL}/validations`, {
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
          ? "✅ ¡Gracias por validar esta información como correcta!"
          : "❌ Gracias por reportar que la información no es correcta";

        alert(message);

        setUserHasValidated(true);

        const statsResponse = await fetch(
          `${API_CONFIG.baseURL}/pharmacies/${id}/validations`
        );
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setValidationStats(statsData);
        }
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

  const getAccuracyColor = (rate: number | null) => {
    if (rate === null) return "text-gray-500";
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
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
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div className="flex-1">
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

          <div className="mt-4 md:mt-0 md:ml-6 text-center">
            {validationStats && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">
                  Validaciones de usuarios
                </div>
                <div className="flex gap-4 justify-center mb-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {validationStats.positive}
                    </div>
                    <div className="text-xs text-gray-500">Correctas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {validationStats.negative}
                    </div>
                    <div className="text-xs text-gray-500">Incorrectas</div>
                  </div>
                </div>
                {validationStats.accuracyRate !== null ? (
                  <div
                    className={`text-lg font-semibold ${getAccuracyColor(
                      validationStats.accuracyRate
                    )}`}
                  >
                    {validationStats.accuracyRate}% de precisión
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    Sin validaciones aún
                  </div>
                )}
              </div>
            )}

            <div className="text-sm text-gray-600 mb-3">
              {userHasValidated
                ? "Ya has validado esta farmacia"
                : "¿Es correcta esta información?"}
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleValidation(true)}
                disabled={validating || userHasValidated}
                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none disabled:bg-gray-400"
              >
                {validating ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Es correcto"
                )}
              </button>
              <button
                onClick={() => handleValidation(false)}
                disabled={validating || userHasValidated}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none disabled:bg-gray-400"
              >
                {validating ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "No es correcto"
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

        {validationStats && validationStats.validations.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Últimas validaciones:
            </h3>
            <div className="space-y-2">
              {validationStats.validations.map((validation) => (
                <div
                  key={`${validation.username}-${validation.createdAt}`}
                  className="flex items-center gap-2 text-sm"
                >
                  <span
                    className={
                      validation.isValid ? "text-green-600" : "text-red-600"
                    }
                  >
                    {validation.isValid ? "👍" : "👎"}
                  </span>
                  <span className="text-gray-700 font-medium">
                    {validation.username}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(validation.createdAt).toLocaleDateString("es-ES")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="farma-card mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          📍 Ubicación
        </h2>

        {pharmacy.latitude && pharmacy.longitude ? (
          <PharmacyMap
            latitude={parseFloat(pharmacy.latitude.toString())}
            longitude={parseFloat(pharmacy.longitude.toString())}
            name={pharmacy.name}
            address={pharmacy.address}
          />
        ) : (
          <div className="bg-gray-200 h-64 md:h-80 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-4xl mb-2">📍</div>
              <p>Ubicación no disponible</p>
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4 flex-wrap">
          {pharmacy.latitude && pharmacy.longitude ? (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn farma-btn-primary"
            >
              🚗 Cómo llegar
            </a>
          ) : (
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(
                pharmacy.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn farma-btn-primary"
            >
              🧭 Buscar en Google Maps
            </a>
          )}
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
