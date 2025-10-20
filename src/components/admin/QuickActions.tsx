"use client";

interface QuickActionsProps {
  syncing: boolean;
  loadingPharmacies: boolean;
  showUsers: boolean;
  onSyncPharmacies: () => void;
  onFetchPharmacies: () => void;
  onToggleUsers: () => void;
}

export default function QuickActions({
  syncing,
  loadingPharmacies,
  showUsers,
  onSyncPharmacies,
  onFetchPharmacies,
  onToggleUsers,
}: QuickActionsProps) {
  return (
    <div className="farma-card mb-6">
      <h2 className="text-xl font-semibold text-green-800 mb-4">
        ⚡ Acciones Rápidas
      </h2>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onSyncPharmacies}
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
          onClick={onFetchPharmacies}
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

        <button onClick={onToggleUsers} className="btn btn-outline btn-success">
          {showUsers ? "✕ Ocultar Usuarios" : "👥 Gestionar Usuarios"}
        </button>
      </div>
    </div>
  );
}
