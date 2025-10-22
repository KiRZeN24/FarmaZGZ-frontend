"use client";
import { Stats } from "@/types";
import {
  HiUsers,
  HiBuildingStorefront,
  HiCheckCircle,
  HiChartBar,
  HiClock,
} from "react-icons/hi2";

interface StatsCardsProps {
  stats: Stats | null;
}

export default function StatsCards({ stats }: Readonly<StatsCardsProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="farma-card">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <HiUsers className="text-xl text-green-600" />
          Usuarios Totales
        </h3>
        <p className="text-4xl font-bold text-green-600">
          {stats?.totalUsers || 0}
        </p>
      </div>

      <div className="farma-card">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <HiBuildingStorefront className="text-xl text-blue-600" />
          Farmacias Totales
        </h3>
        <p className="text-4xl font-bold text-blue-600">
          {stats?.totalPharmacies || 0}
        </p>
      </div>

      <div className="farma-card">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <HiCheckCircle className="text-xl text-green-600" />
          Farmacias de Hoy
        </h3>
        <p className="text-4xl font-bold text-green-600">
          {stats?.todayPharmacies || 0}
        </p>
      </div>

      <div className="farma-card">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <HiChartBar className="text-xl text-purple-600" />
          Validaciones Totales
        </h3>
        <p className="text-4xl font-bold text-purple-600">
          {stats?.totalValidations || 0}
        </p>
      </div>

      <div className="farma-card">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <HiClock className="text-xl text-orange-600" />
          Validaciones Hoy
        </h3>
        <p className="text-4xl font-bold text-orange-600">
          {stats?.todayValidations || 0}
        </p>
      </div>
    </div>
  );
}
