"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Pharmacy } from "@/types";

interface PharmacyContextType {
  pharmacies: Pharmacy[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const PharmacyContext = createContext<PharmacyContextType | null>(null);

interface PharmacyProviderProps {
  children: ReactNode;
}

export function PharmacyProvider({ children }: PharmacyProviderProps) {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPharmacies = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://farmazgz.onrender.com/api/pharmacies/today"
      );

      if (!response.ok) {
        throw new Error("Error al cargar farmacias");
      }

      const data = await response.json();

      let pharmaciesArray: Pharmacy[] = [];

      if (Array.isArray(data)) {
        pharmaciesArray = data;
      } else if (data && Array.isArray(data.pharmacies)) {
        pharmaciesArray = data.pharmacies;
      } else {
        console.error("❌ Formato inesperado:", data);
        throw new Error("Formato de respuesta inválido");
      }

      setPharmacies(pharmaciesArray);
    } catch (err) {
      console.error("Error fetching pharmacies:", err);
      setPharmacies([]);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const refetch = async () => {
    await fetchPharmacies();
  };

  const value = {
    pharmacies,
    loading,
    error,
    refetch,
  };

  return (
    <PharmacyContext.Provider value={value}>
      {children}
    </PharmacyContext.Provider>
  );
}

export const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error("usePharmacy debe usarse dentro de PharmacyProvider");
  }
  return context;
};
