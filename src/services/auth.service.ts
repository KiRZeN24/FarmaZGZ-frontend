import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/types/auth.types";
import { API_CONFIG } from "@/config/api.config";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_CONFIG.baseURL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al iniciar sesión");
    }

    return response.json();
  },

  async register(data: RegisterRequest) {
    const response = await fetch(`${API_CONFIG.baseURL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al registrarse");
    }

    const result = await response.json();

    return {
      token: result.access_token || result.token,
      user: result.user,
    };
  },

  async getProfile(token: string) {
    const response = await fetch(`${API_CONFIG.baseURL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener perfil");
    }

    return response.json();
  },

  saveToken(token: string) {
    localStorage.setItem("token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  removeToken() {
    localStorage.removeItem("token");
  },
};
