"use client";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

interface Validation {
  isValid: boolean;
  username: string;
  createdAt: string;
  comment?: string;
}

interface ValidationHistoryProps {
  validations: Validation[];
}

export default function ValidationHistory({
  validations,
}: Readonly<ValidationHistoryProps>) {
  if (validations.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Últimas validaciones:
      </h3>
      <div className="space-y-2">
        {validations.map((validation) => (
          <div
            key={`${validation.username}-${validation.createdAt}`}
            className="flex items-center gap-2 text-sm"
          >
            {validation.isValid ? (
              <HiHandThumbUp className="text-green-600 text-lg" />
            ) : (
              <HiHandThumbDown className="text-red-600 text-lg" />
            )}
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
  );
}
