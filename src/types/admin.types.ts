export interface AdminStats {
  totalUsers: number;
  totalPharmacies: number;
  totalValidations: number;
  todayPharmacies: number;
}

export interface UserAdmin {
  id: string;
  username: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export interface ValidationAdmin {
  id: string;
  pharmacyId: string;
  userId: string;
  isValid: boolean;
  createdAt: string;
  user: {
    username: string;
  };
  pharmacy: {
    name: string;
    address: string;
  };
}
