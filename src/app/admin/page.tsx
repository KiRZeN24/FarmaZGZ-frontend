"use client";
import { useState, useEffect } from "react";
import AdminRoute from "@/components/AdminRoute";
import { API_CONFIG } from "@/config/api.config";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { Pharmacy, Stats, UpdateUserData, User } from "@/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [showPharmacies, setShowPharmacies] = useState(false);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loadingPharmacies, setLoadingPharmacies] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentPharmacyPage, setCurrentPharmacyPage] = useState(1);
  const itemsPerPage = 10;
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editUsername, setEditUsername] = useState("");
  const [editRole, setEditRole] = useState<"USER" | "ADMIN">("USER");
  const [editPassword, setEditPassword] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"USER" | "ADMIN">("USER");

  const getUsersPaginated = () => {
    const startIndex = (currentUserPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  };

  const getPharmaciesPaginated = () => {
    const startIndex = (currentPharmacyPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pharmacies.slice(startIndex, endIndex);
  };

  const totalUserPages = Math.ceil(users.length / itemsPerPage);
  const totalPharmacyPages = Math.ceil(pharmacies.length / itemsPerPage);

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser) return;

    try {
      const token = localStorage.getItem("token");

      const updateData: UpdateUserData = {
        username: editUsername,
        role: editRole,
      };

      if (editPassword.trim()) {
        updateData.password = editPassword;
      }

      const response = await fetch(
        `${API_CONFIG.baseURL}/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        alert("✅ Usuario actualizado correctamente");
        setEditingUser(null);
        setEditUsername("");
        setEditRole("USER");
        setEditPassword("");
        fetchDashboardData();
      } else {
        throw new Error("Error al actualizar usuario");
      }
    } catch (error) {
      alert("❌ Error al actualizar usuario");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_CONFIG.baseURL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          role: newRole,
        }),
      });

      if (response.ok) {
        alert("✅ Usuario creado correctamente");
        setShowCreateModal(false);
        setNewUsername("");
        setNewPassword("");
        setNewRole("USER");
        fetchDashboardData();
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message || "No se pudo crear el usuario"}`);
      }
    } catch (error) {
      alert("❌ Error al crear usuario");
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditUsername(user.username);
    setEditRole(user.role as "USER" | "ADMIN");
    setEditPassword("");
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [usersRes, pharmaciesRes, todayRes, validationsRes] =
        await Promise.all([
          fetch(`${API_CONFIG.baseURL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_CONFIG.baseURL}/pharmacies`),
          fetch(`${API_CONFIG.baseURL}/pharmacies/today`),
          fetch(`${API_CONFIG.baseURL}/validations/stats`),
        ]);

      const usersData = await usersRes.json();
      const pharmaciesData = await pharmaciesRes.json();
      const todayData = await todayRes.json();
      const validationsData = await validationsRes.json();

      setUsers(usersData);
      setStats({
        totalUsers: usersData.length,
        totalPharmacies: pharmaciesData.length,
        totalValidations: validationsData.total,
        todayPharmacies: todayData.count || todayData.pharmacies?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncPharmacies = async () => {
    setSyncing(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_CONFIG.baseURL}/pharmacies/sync`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("✅ Farmacias sincronizadas correctamente");
        fetchDashboardData();
      } else {
        throw new Error("Error al sincronizar");
      }
    } catch (error) {
      alert("❌ Error al sincronizar farmacias");
    } finally {
      setSyncing(false);
    }
  };

  const fetchPharmacies = async () => {
    setLoadingPharmacies(true);
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/pharmacies`);
      const data = await response.json();
      setPharmacies(data);
      setShowPharmacies(true);
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
      alert("❌ Error al cargar farmacias");
    } finally {
      setLoadingPharmacies(false);
    }
  };

  const handleDeletePharmacy = async (id: string, name: string) => {
    if (!confirm(`¿Seguro que quieres eliminar la farmacia ${name}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_CONFIG.baseURL}/pharmacies/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("✅ Farmacia eliminada correctamente");
        fetchPharmacies();
        fetchDashboardData();
      } else {
        throw new Error("Error al eliminar farmacia");
      }
    } catch (error) {
      alert("❌ Error al eliminar farmacia");
    }
  };

  const handleDeleteUser = async (userId: string, username: string) => {
    if (!confirm(`¿Seguro que quieres eliminar al usuario ${username}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_CONFIG.baseURL}/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("✅ Usuario eliminado correctamente");
        fetchDashboardData();
      } else {
        throw new Error("Error al eliminar usuario");
      }
    } catch (error) {
      alert("❌ Error al eliminar usuario");
    }
  };

  if (loading) {
    return (
      <AdminRoute>
        <div className="container mx-auto p-4 text-center">
          <LoadingSpinner />
        </div>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">
            🛡️ Panel de Administración
          </h1>
          <Link href="/" className="btn btn-outline btn-success">
            ← Volver al inicio
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="farma-card">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              👥 Usuarios Totales
            </h3>
            <p className="text-4xl font-bold text-green-600">
              {stats?.totalUsers || 0}
            </p>
          </div>

          <div className="farma-card">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              🏥 Farmacias Totales
            </h3>
            <p className="text-4xl font-bold text-blue-600">
              {stats?.totalPharmacies || 0}
            </p>
          </div>

          <div className="farma-card">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              ✅ Farmacias de Hoy
            </h3>
            <p className="text-4xl font-bold text-green-600">
              {stats?.todayPharmacies || 0}
            </p>
          </div>

          <div className="farma-card">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              📊 Validaciones
            </h3>
            <p className="text-4xl font-bold text-purple-600">
              {stats?.totalValidations || 0}
            </p>
          </div>
        </div>

        <div className="farma-card mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            ⚡ Acciones Rápidas
          </h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleSyncPharmacies}
              disabled={syncing}
              className="btn farma-btn-primary"
            >
              {syncing ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Sincronizando...
                </>
              ) : (
                "🔄 Sincronizar Farmacias"
              )}
            </button>

            <button
              onClick={fetchPharmacies}
              disabled={loadingPharmacies}
              className="btn btn-outline btn-info"
            >
              {loadingPharmacies ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Cargando...
                </>
              ) : (
                "🏥 Ver Todas las Farmacias"
              )}
            </button>

            <button
              onClick={() => setShowUsers(!showUsers)}
              className="btn btn-outline btn-success"
            >
              {showUsers ? "✕ Ocultar Usuarios" : "👥 Gestionar Usuarios"}
            </button>
          </div>
        </div>

        {showUsers && (
          <div className="farma-card mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-800">
                👥 Usuarios Registrados ({users.length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-sm btn-success"
                >
                  ➕ Crear Usuario
                </button>
                <button
                  onClick={() => {
                    setShowUsers(false);
                    setCurrentUserPage(1);
                  }}
                  className="btn btn-sm btn-error btn-outline"
                >
                  ✕ Cerrar
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
                      <td className="font-medium text-gray-900">
                        {user.username}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            user.role === "ADMIN"
                              ? "badge-error"
                              : "badge-success"
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
                            onClick={() => openEditModal(user)}
                            className="btn btn-sm btn-warning"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteUser(user.id, user.username)
                            }
                            className="btn btn-sm btn-error"
                            disabled={user.role === "ADMIN"}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalUserPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() =>
                    setCurrentUserPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentUserPage === 1}
                  className="btn btn-sm btn-success"
                >
                  ← Anterior
                </button>

                <span className="text-sm font-medium text-gray-700">
                  Página {currentUserPage} de {totalUserPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentUserPage((prev) =>
                      Math.min(prev + 1, totalUserPages)
                    )
                  }
                  disabled={currentUserPage === totalUserPages}
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
        )}

        {/* Tabla de FARMACIAS */}
        {showPharmacies && (
          <div className="farma-card mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-800">
                🏥 Todas las Farmacias ({pharmacies.length})
              </h2>
              <button
                onClick={() => {
                  setShowPharmacies(false);
                  setCurrentPharmacyPage(1);
                }}
                className="btn btn-sm btn-error btn-outline"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="text-white">Nombre</th>
                    <th className="text-white">Dirección</th>
                    <th className="text-white">Teléfono</th>
                    <th className="text-white">Guardia</th>
                    <th className="text-white">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {getPharmaciesPaginated().map((pharmacy) => (
                    <tr
                      key={pharmacy.id}
                      className="border-b border-gray-300 bg-white hover:bg-gray-100"
                    >
                      <td className="font-medium text-gray-900">
                        {pharmacy.name}
                      </td>
                      <td className="text-gray-900">{pharmacy.address}</td>
                      <td className="text-gray-900">
                        {pharmacy.phone || "N/A"}
                      </td>
                      <td className="text-gray-900">
                        {new Date(pharmacy.guard_date).toLocaleDateString(
                          "es-ES"
                        )}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <Link
                            href={`/farmacia/${pharmacy.id}`}
                            className="btn btn-sm btn-info"
                          >
                            👁️ Ver
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPharmacyPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() =>
                    setCurrentPharmacyPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPharmacyPage === 1}
                  className="btn btn-sm btn-outline btn-info"
                >
                  ← Anterior
                </button>

                <span className="text-sm font-medium text-gray-700">
                  Página {currentPharmacyPage} de {totalPharmacyPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPharmacyPage((prev) =>
                      Math.min(prev + 1, totalPharmacyPages)
                    )
                  }
                  disabled={currentPharmacyPage === totalPharmacyPages}
                  className="btn btn-sm btn-outline btn-info"
                >
                  Siguiente →
                </button>
              </div>
            )}

            {pharmacies.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No hay farmacias registradas
              </div>
            )}
          </div>
        )}
      </div>
      {/* Modal de edición de usuario */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              Editar Usuario
            </h3>

            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Usuario</span>
                </label>
                <input
                  type="text"
                  required
                  minLength={3}
                  maxLength={30}
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Nombre de usuario"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Rol</span>
                </label>
                <select
                  value={editRole}
                  onChange={(e) =>
                    setEditRole(e.target.value as "USER" | "ADMIN")
                  }
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
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Dejar vacío para no cambiar"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 8 caracteres. Dejar vacío para mantener la contraseña
                  actual.
                </p>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="btn btn-success flex-1">
                  💾 Guardar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingUser(null);
                    setEditUsername("");
                    setEditRole("USER");
                    setEditPassword("");
                  }}
                  className="btn btn-error btn-outline flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal de creación de usuario */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              ➕ Crear Nuevo Usuario
            </h3>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Usuario</span>
                </label>
                <input
                  type="text"
                  required
                  minLength={3}
                  maxLength={30}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Nombre de usuario"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Contraseña</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Contraseña"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 8 caracteres.
                </p>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Rol</span>
                </label>
                <select
                  value={newRole}
                  onChange={(e) =>
                    setNewRole(e.target.value as "USER" | "ADMIN")
                  }
                  className="select select-bordered w-full"
                >
                  <option value="USER">Usuario</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="btn btn-success flex-1">
                  ✅ Crear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewUsername("");
                    setNewPassword("");
                    setNewRole("USER");
                  }}
                  className="btn btn-error btn-outline flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de creación de usuario */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              ➕ Crear Nuevo Usuario
            </h3>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Usuario</span>
                </label>
                <input
                  type="text"
                  required
                  minLength={3}
                  maxLength={30}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Nombre de usuario"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Contraseña</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Contraseña"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 8 caracteres.
                </p>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Rol</span>
                </label>
                <select
                  value={newRole}
                  onChange={(e) =>
                    setNewRole(e.target.value as "USER" | "ADMIN")
                  }
                  className="select select-bordered w-full"
                >
                  <option value="USER">Usuario</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="btn btn-success flex-1">
                  ✅ Crear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewUsername("");
                    setNewPassword("");
                    setNewRole("USER");
                  }}
                  className="btn btn-error btn-outline flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminRoute>
  );
}
