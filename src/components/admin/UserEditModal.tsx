"use client";
import { User } from "@/types";
import { HiPencil, HiCheckCircle, HiXMark } from "react-icons/hi2";

interface UserEditModalProps {
  user: User;
  username: string;
  role: "USER" | "ADMIN";
  password: string;
  onUsernameChange: (value: string) => void;
  onRoleChange: (value: "USER" | "ADMIN") => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function UserEditModal({
  user,
  username,
  role,
  password,
  onUsernameChange,
  onRoleChange,
  onPasswordChange,
  onSubmit,
  onClose,
}: Readonly<UserEditModalProps>) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <HiPencil className="text-2xl" />
          Editar Usuario
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Usuario</span>
            </label>
            <input
              type="text"
              required
              minLength={3}
              maxLength={30}
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Nombre de usuario"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Rol</span>
            </label>
            <select
              value={role}
              onChange={(e) => onRoleChange(e.target.value as "USER" | "ADMIN")}
              className="select select-bordered w-full"
            >
              <option value="USER">Usuario</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Nueva Contraseña (opcional)
              </span>
            </label>
            <input
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Dejar vacío para no cambiar"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mínimo 8 caracteres. Dejar vacío para mantener la contraseña
              actual.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="btn btn-success flex-1 flex items-center gap-2"
            >
              <HiCheckCircle className="text-lg" />
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-error btn-outline flex-1 flex items-center gap-2"
            >
              <HiXMark className="text-lg" />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
