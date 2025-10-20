"use client";
import { useState, useEffect } from "react";
import AdminRoute from "@/components/AdminRoute";
import { API_CONFIG } from "@/config/api.config";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { Pharmacy, Stats, UpdateUserData, User } from "@/types";
import StatsCards from "@/components/admin/StatsCards";
import QuickActions from "@/components/admin/QuickActions";
import UsersTable from "@/components/admin/UsersTable";
import PharmaciesTable from "@/components/admin/PharmaciesTable";
import UserEditModal from "@/components/admin/UserEditModal";
import UserCreateModal from "@/components/admin/UserCreateModal";

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [loadingPharmacies, setLoadingPharmacies] = useState(false);
  const [showPharmacies, setShowPharmacies] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editUsername, setEditUsername] = useState("");
  const [editRole, setEditRole] = useState<"USER" | "ADMIN">("USER");
  const [editPassword, setEditPassword] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"USER" | "ADMIN">("USER");

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
          fetch(`${API_CONFIG.baseURL}/validations/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
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
        todayValidations: validationsData.today,
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

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditUsername(user.username);
    setEditRole(user.role as "USER" | "ADMIN");
    setEditPassword("");
  };

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

        <StatsCards stats={stats} />

        <QuickActions
          syncing={syncing}
          loadingPharmacies={loadingPharmacies}
          showUsers={showUsers}
          onSyncPharmacies={handleSyncPharmacies}
          onFetchPharmacies={fetchPharmacies}
          onToggleUsers={() => setShowUsers(!showUsers)}
        />

        {showUsers && (
          <UsersTable
            users={users}
            onClose={() => setShowUsers(false)}
            onEdit={openEditModal}
            onDelete={handleDeleteUser}
            onCreate={() => setShowCreateModal(true)}
          />
        )}

        {showPharmacies && (
          <PharmaciesTable
            pharmacies={pharmacies}
            onClose={() => setShowPharmacies(false)}
          />
        )}
      </div>

      {editingUser && (
        <UserEditModal
          user={editingUser}
          username={editUsername}
          role={editRole}
          password={editPassword}
          onUsernameChange={setEditUsername}
          onRoleChange={setEditRole}
          onPasswordChange={setEditPassword}
          onSubmit={handleEditUser}
          onClose={() => {
            setEditingUser(null);
            setEditUsername("");
            setEditRole("USER");
            setEditPassword("");
          }}
        />
      )}

      {showCreateModal && (
        <UserCreateModal
          username={newUsername}
          password={newPassword}
          role={newRole}
          onUsernameChange={setNewUsername}
          onPasswordChange={setNewPassword}
          onRoleChange={setNewRole}
          onSubmit={handleCreateUser}
          onClose={() => {
            setShowCreateModal(false);
            setNewUsername("");
            setNewPassword("");
            setNewRole("USER");
          }}
        />
      )}
    </AdminRoute>
  );
}
