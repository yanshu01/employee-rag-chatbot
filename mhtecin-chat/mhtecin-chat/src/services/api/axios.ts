import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically inject JWT Bearer token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      localStorage.getItem("jwt_token") || localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: 401 handling, auto logout, error formatting
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError<{ detail?: string | any }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user_profile");

      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/auth")
      ) {
        window.location.href = "/auth";
      }
    }

    let errorMessage = "An unexpected error occurred.";
    if (error.response?.data?.detail) {
      const detail = error.response.data.detail;
      errorMessage = typeof detail === "string" ? detail : JSON.stringify(detail);
    } else if (error.message === "Network Error") {
      errorMessage = "Unable to connect to FastAPI backend server. Please check if uvicorn is running.";
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out while connecting to the backend.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return Promise.reject(new Error(errorMessage));
  }
);
