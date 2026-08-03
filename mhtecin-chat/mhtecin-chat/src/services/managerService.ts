import { apiClient } from "./api/axios";
import { EmployeeProfile } from "./authService";

export interface TeamMember {
  employee_code: string;
  name: string;
  email: string;
  department: string | null;
  designation: string | null;
  role: string;
}

export interface TeamMembersResponse {
  success: boolean;
  manager_name?: string;
  team_count?: number;
  employees?: TeamMember[];
  message?: string;
}

export interface TeamLeaveSummaryItem {
  employee_code: string;
  name: string;
  leave_balance: number | null;
}

export interface TeamLeaveSummaryResponse {
  success: boolean;
  team_count?: number;
  employees?: TeamLeaveSummaryItem[];
  message?: string;
}

export interface TeamShiftItem {
  employee_code: string;
  name: string;
  shift_start: string | null;
  shift_end: string | null;
}

export interface TeamShiftSummaryResponse {
  success: boolean;
  team_count?: number;
  shift_distribution?: Record<string, number>;
  employees?: TeamShiftItem[];
  message?: string;
}

export interface EmployeeCreatePayload {
  employee_code: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  department?: string;
  manager_code?: string;
}

export const managerService = {
  async getTeamMembers(): Promise<TeamMembersResponse> {
    const response = await apiClient.get<TeamMembersResponse>(
      "/api/employees/me/team-members"
    );
    return response.data;
  },

  async getTeamLeaveSummary(): Promise<TeamLeaveSummaryResponse> {
    const response = await apiClient.get<TeamLeaveSummaryResponse>(
      "/api/employees/me/team-summary"
    );
    return response.data;
  },

  async getTeamShiftSummary(): Promise<TeamShiftSummaryResponse> {
    const response = await apiClient.get<TeamShiftSummaryResponse>(
      "/api/employees/me/team-shifts"
    );
    return response.data;
  },

  async createEmployee(data: EmployeeCreatePayload): Promise<EmployeeProfile> {
    const response = await apiClient.post<EmployeeProfile>(
      "/api/employees",
      data
    );
    return response.data;
  },
};
