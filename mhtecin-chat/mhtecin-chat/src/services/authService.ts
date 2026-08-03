import { apiClient } from "./api/axios";

export interface EmployeeProfile {
  id: number;
  employee_code: string;
  name: string;
  email: string;
  role: "employee" | "manager" | "hr" | "admin" | string;
  department: string | null;
  manager_code: string | null;
  is_active: boolean;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  async login(email: string, password: string): Promise<{ token: string; user: EmployeeProfile }> {
    const response = await apiClient.post<TokenResponse>("/api/auth/login", {
      email: email.trim(),
      password,
    });

    const token = response.data.access_token;
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("token", token);

    // Fetch employee profile using new token
    const userProfile = await this.getProfile();
    localStorage.setItem("user_profile", JSON.stringify(userProfile));

    return {
      token,
      user: userProfile,
    };
  },

  async getProfile(): Promise<EmployeeProfile> {
    const response = await apiClient.get<EmployeeProfile>("/api/auth/me");
    return response.data;
  },

  logout(): void {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user_profile");
  },

  getStoredToken(): string | null {
    return localStorage.getItem("jwt_token") || localStorage.getItem("token");
  },

  getStoredProfile(): EmployeeProfile | null {
    const data = localStorage.getItem("user_profile");
    if (!data) return null;
    try {
      return JSON.parse(data) as EmployeeProfile;
    } catch {
      return null;
    }
  },
};
