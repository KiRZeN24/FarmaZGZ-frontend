"use client";
import { useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);

    try {
      await register({ username, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      <div className="card w-full max-w-md bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-center text-green-800 mb-6">
            Crear Cuenta
          </h2>

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="input validator flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  required
                  placeholder="Usuario"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength={3}
                  maxLength={30}
                  title="Solo letras, números o guiones"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="grow"
                />
              </label>
              <p className="validator-hint text-sm text-gray-500 mt-1">
                Debe tener entre 3 y 30 caracteres
                <br />
                Contener solo letras, números o guiones
              </p>
            </div>

            <div>
              <label className="input flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect
                      width="18"
                      height="11"
                      x="3"
                      y="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Contraseña"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="grow"
                />
              </label>
              <p className="text-sm text-gray-500 mt-1">Mínimo 8 caracteres</p>
            </div>

            <div>
              <label className="input flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect
                      width="18"
                      height="11"
                      x="3"
                      y="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Confirmar contraseña"
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="grow"
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn farma-btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creando cuenta...
                </>
              ) : (
                "Registrarse"
              )}
            </button>
          </form>

          <div className="divider text-gray-600 font-semibold">O</div>

          <p className="text-center text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              Inicia sesión aquí
            </Link>
          </p>

          <Link href="/" className="btn btn-outline btn-success w-full mt-2">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
