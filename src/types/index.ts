export * from "./pharmacy.types";

export interface Stats {
  totalUsers: number;
  totalPharmacies: number;
  totalValidations: number;
  todayValidations: number;
  todayPharmacies: number;
}

export interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

export interface UpdateUserData {
  username: string;
  role: "USER" | "ADMIN";
  password?: string;
}
