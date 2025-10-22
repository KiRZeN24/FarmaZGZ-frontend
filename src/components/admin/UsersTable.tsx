"use client";
import { useState } from "react";
import { User } from "@/types";
import {
  HiUsers,
  HiXMark,
  HiPlusCircle,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";

interface UsersTableProps {
  users: User[];
  onClose: () => void;
  onEdit: (user: User) => void;
  onDelete: (userId: string, username: string) => void;
  onCreate: () => void;
}

export default function UsersTable({
  users,
  onClose,
  onEdit,
  onDelete,
  onCreate,
}: Readonly<UsersTableProps>) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getUsersPaginated = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="farma-card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">
          <HiUsers className="text-2xl" />
          Usuarios Registrados ({users.length})
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onCreate}
            className="btn btn-sm btn-success flex items-center gap-1"
          >
            <HiPlusCircle className="text-lg" />
            Crear Usuario
          </button>
          <button
            onClick={() => {
              onClose();
              setCurrentPage(1);
            }}
            className="btn btn-sm btn-error btn-outline flex items-center gap-1"
          >
            <HiXMark className="text-lg" />
            Cerrar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-green-600">
            <tr>
              <th className="text-white">Usuario</th>
              <th className="text-white">Rol</th>
              <th className="text-white">Fecha de Registro</th>
              <th className="text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {getUsersPaginated().map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-300 bg-white hover:bg-gray-100"
              >
                <td className="font-medium text-gray-900">{user.username}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "ADMIN" ? "badge-error" : "badge-success"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString("es-ES")}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="btn btn-sm btn-warning flex items-center gap-1"
                    >
                      <HiPencil className="text-lg" />
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(user.id, user.username)}
                      className="btn btn-sm btn-error"
                      disabled={user.role === "ADMIN"}
                    >
                      <HiTrash className="text-lg" />
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-sm btn-success"
          >
            ← Anterior
          </button>

          <span className="text-sm font-medium text-gray-700">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-success"
          >
            Siguiente →
          </button>
        </div>
      )}

      {users.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No hay usuarios registrados
        </div>
      )}
    </div>
  );
}
