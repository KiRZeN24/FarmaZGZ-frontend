"use client";
import { useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { API_CONFIG } from "@/config/api.config";
import {
  HiLockClosed,
  HiCheckCircle,
  HiXCircle,
  HiArrowLeft,
  HiUser,
  HiIdentification,
  HiShieldCheck,
} from "react-icons/hi2";

export default function PerfilPage() {
  const { user } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      const errorMsg = "Las contraseñas no coinciden";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (newPassword.length < 8) {
      const errorMsg = "La contraseña debe tener al menos 8 caracteres";
      setError(errorMsg);
      toast.error(errorMsg);
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

      toast.success("Contraseña actualizada correctamente");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Error al cambiar contraseña";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">
          <HiUser className="text-4xl" />
          Mi Perfil
        </h1>

        <div className="farma-card mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
            <HiIdentification className="text-2xl" />
            Información del Usuario
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <HiUser className="text-xl text-green-600" />
              <span className="font-semibold text-gray-700">Usuario:</span>{" "}
              <span className="text-gray-900">{user?.username}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiIdentification className="text-xl text-blue-600" />
              <span className="font-semibold text-gray-700">ID:</span>{" "}
              <span className="text-gray-600 text-sm">{user?.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiShieldCheck className="text-xl text-purple-600" />
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
          <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
            <HiLockClosed className="text-2xl" />
            Seguridad
          </h2>

          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="btn farma-btn-primary flex items-center gap-2"
            >
              <HiLockClosed className="text-lg" />
              Cambiar Contraseña
            </button>
          ) : (
            <div>
              {error && (
                <div className="alert alert-error mb-4">
                  <HiXCircle className="text-2xl" />
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
                    className="btn farma-btn-primary flex items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Actualizando...
                      </>
                    ) : (
                      <>
                        <HiCheckCircle className="text-lg" />
                        Guardar Cambios
                      </>
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
                    className="btn btn-outline btn-error flex items-center gap-2"
                  >
                    <HiXCircle className="text-lg" />
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="btn btn-outline btn-success flex items-center gap-2 mx-auto w-fit"
          >
            <HiArrowLeft className="text-lg" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
