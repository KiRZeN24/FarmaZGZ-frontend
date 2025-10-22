"use client";
import {
  HiArrowPath,
  HiBuildingStorefront,
  HiUsers,
  HiXMark,
} from "react-icons/hi2";
import { MdSpeed } from "react-icons/md";

interface QuickActionsProps {
  syncing: boolean;
  loadingPharmacies: boolean;
  showUsers: boolean;
  showPharmacies: boolean;
  onSyncPharmacies: () => void;
  onFetchPharmacies: () => void;
  onToggleUsers: () => void;
}

export default function QuickActions({
  syncing,
  loadingPharmacies,
  showUsers,
  showPharmacies,
  onSyncPharmacies,
  onFetchPharmacies,
  onToggleUsers,
}: Readonly<QuickActionsProps>) {
  return (
    <div className="farma-card mb-6">
      <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
        <MdSpeed className="text-2xl" />
        Acciones Rápidas
      </h2>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onSyncPharmacies}
          disabled={syncing}
          className="btn farma-btn-primary flex items-center gap-2"
        >
          {syncing ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Sincronizando...
            </>
          ) : (
            <>
              <HiArrowPath className="text-lg" />
              Sincronizar Farmacias
            </>
          )}
        </button>

        <button
          onClick={onFetchPharmacies}
          disabled={loadingPharmacies}
          className="btn btn-outline btn-info flex items-center gap-2"
        >
          {loadingPharmacies ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Cargando...
            </>
          ) : showPharmacies ? (
            <>
              <HiXMark className="text-lg" />
              Ocultar Farmacias
            </>
          ) : (
            <>
              <HiBuildingStorefront className="text-lg" />
              Ver Todas las Farmacias
            </>
          )}
        </button>

        <button
          onClick={onToggleUsers}
          className="btn btn-outline btn-success flex items-center gap-2"
        >
          {showUsers ? (
            <>
              <HiXMark className="text-lg" />
              Ocultar Usuarios
            </>
          ) : (
            <>
              <HiUsers className="text-lg" />
              Gestionar Usuarios
            </>
          )}
        </button>
      </div>
    </div>
  );
}
