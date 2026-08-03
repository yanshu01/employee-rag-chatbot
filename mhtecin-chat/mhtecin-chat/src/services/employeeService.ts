import { apiClient } from "./api/axios";

export interface LeaveBalanceResponse {
  success: boolean;
  employee_name?: string;
  employee_code?: string;
  leave_balance?: number;
  message: string;
}

export interface ShiftTimingResponse {
  success: boolean;
  employee_name?: string;
  employee_code?: string;
  start_time?: string;
  end_time?: string;
  message: string;
}

export interface RemainingHoursResponse {
  success: boolean;
  employee_name?: string;
  shift_start?: string;
  shift_end?: string;
  remaining_hours?: number;
  status?: string;
  message?: string;
}

export const employeeService = {
  async getLeaveBalance(): Promise<LeaveBalanceResponse> {
    const response = await apiClient.get<LeaveBalanceResponse>(
      "/api/employees/me/leave-balance"
    );
    return response.data;
  },

  async getShiftTiming(): Promise<ShiftTimingResponse> {
    const response = await apiClient.get<ShiftTimingResponse>(
      "/api/employees/me/shift"
    );
    return response.data;
  },

  async getRemainingHours(): Promise<RemainingHoursResponse> {
    const response = await apiClient.get<RemainingHoursResponse>(
      "/api/employees/me/remaining-hours"
    );
    return response.data;
  },
};
