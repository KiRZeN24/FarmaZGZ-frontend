"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Pharmacy } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { API_CONFIG } from "@/config/api.config";
import PharmacyBreadcrumb from "@/components/pharmacy/PharmacyBreadcrumb";
import PharmacyInfo from "@/components/pharmacy/PharmacyInfo";
import ValidationSection from "@/components/pharmacy/ValidationSection";
import ValidationHistory from "@/components/pharmacy/ValidationHistory";
import PharmacyMapSection from "@/components/pharmacy/PharmacyMapSection";
import { HiArrowLeft } from "react-icons/hi2";

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
      <PharmacyBreadcrumb pharmacyName={pharmacy.name} />

      <div className="farma-card mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <PharmacyInfo
            name={pharmacy.name}
            address={pharmacy.address}
            hours={pharmacy.hours}
            phone={pharmacy.phone}
            guardDate={pharmacy.guard_date}
          />

          <ValidationSection
            validationStats={validationStats}
            userHasValidated={userHasValidated}
            isAuthenticated={isAuthenticated}
            validating={validating}
            onValidate={handleValidation}
          />
        </div>

        {validationStats && (
          <ValidationHistory validations={validationStats.validations} />
        )}
      </div>

      <PharmacyMapSection
        latitude={pharmacy.latitude}
        longitude={pharmacy.longitude}
        name={pharmacy.name}
        address={pharmacy.address}
      />

      <div className="text-center">
        <Link
          href="/"
          className="btn btn-outline btn-success flex items-center gap-2 mx-auto w-fit"
        >
          <HiArrowLeft className="text-lg" />
          Volver a la lista
        </Link>
      </div>
    </div>
  );
}
