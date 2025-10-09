export interface User {
  id: string;
  username: string;
  role: "USER" | "ADMIN";
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
