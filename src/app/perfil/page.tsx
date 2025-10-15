"use client";
import { useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { API_CONFIG } from "@/config/api.config";

export default function PerfilPage() {
  const { user } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const verifyResponse = await fetch(`${API_CONFIG.baseURL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user?.username,
          password: currentPassword,
        }),
      });

      if (!verifyResponse.ok) {
        throw new Error("Contraseña actual incorrecta");
      }

      const response = await fetch(`${API_CONFIG.baseURL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la contraseña");
      }

      setSuccess("✅ Contraseña actualizada correctamente");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowPasswordForm(false);

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cambiar contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

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

        <div className="farma-card mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Seguridad
          </h2>

          {success && (
            <div className="alert alert-success mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{success}</span>
            </div>
          )}

          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="btn farma-btn-primary"
            >
              🔒 Cambiar Contraseña
            </button>
          ) : (
            <div>
              {error && (
                <div className="alert alert-error mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Contraseña Actual
                    </span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Ingresa tu contraseña actual"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Nueva Contraseña
                    </span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Mínimo 8 caracteres"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Confirmar Nueva Contraseña
                    </span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Repite la nueva contraseña"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="btn farma-btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Actualizando...
                      </>
                    ) : (
                      "💾 Guardar Cambios"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setError("");
                    }}
                    className="btn btn-outline btn-error"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link href="/" className="btn btn-outline btn-success">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
