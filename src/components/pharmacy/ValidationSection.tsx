"use client";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

interface ValidationStats {
  total: number;
  positive: number;
  negative: number;
  accuracyRate: number | null;
}

interface ValidationSectionProps {
  validationStats: ValidationStats | null;
  userHasValidated: boolean;
  isAuthenticated: boolean;
  validating: boolean;
  onValidate: (isValid: boolean) => void;
}

export default function ValidationSection({
  validationStats,
  userHasValidated,
  isAuthenticated,
  validating,
  onValidate,
}: Readonly<ValidationSectionProps>) {
  const getAccuracyColor = (rate: number | null) => {
    if (rate === null) return "text-gray-500";
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
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
            <div className="text-sm text-gray-500">Sin validaciones aún</div>
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
          onClick={() => onValidate(true)}
          disabled={validating || userHasValidated}
          className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none disabled:bg-gray-400 flex items-center gap-1"
        >
          {validating ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <>
              <HiHandThumbUp className="text-lg" />
              Es correcto
            </>
          )}
        </button>
        <button
          onClick={() => onValidate(false)}
          disabled={validating || userHasValidated}
          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none disabled:bg-gray-400 flex items-center gap-1"
        >
          {validating ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <>
              <HiHandThumbDown className="text-lg" />
              No es correcto
            </>
          )}
        </button>
      </div>

      {!isAuthenticated && (
        <p className="text-xs text-gray-500 mt-2">
          Debes iniciar sesión para validar
        </p>
      )}
    </div>
  );
}
