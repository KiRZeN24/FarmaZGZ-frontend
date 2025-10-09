"use client";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function PerfilPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Mi Perfil</h1>

        <div className="farma-card mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Información del Usuario
          </h2>
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-700">Usuario:</span>{" "}
              <span className="text-gray-900">{user?.username}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">ID:</span>{" "}
              <span className="text-gray-600 text-sm">{user?.id}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Rol:</span>{" "}
              <span
                className={`badge ${
                  user?.role === "ADMIN" ? "badge-error" : "badge-success"
                }`}
              >
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/" className="btn btn-outline btn-success">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
