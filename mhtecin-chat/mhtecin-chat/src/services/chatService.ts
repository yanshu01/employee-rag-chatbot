import { apiClient } from "./api/axios";

export interface ChatSource {
  source: string;
  page: number | null;
}

export interface ChatResponse {
  answer: string;
  question: string;
  employee_name: string;
  intent: string;
  sources: ChatSource[];
}

export const chatService = {
  async sendMessage(question: string): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>("/api/chat", {
      question: question.trim(),
    });
    return response.data;
  },

  async sendPublicMessage(employee_code: string, question: string): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>("/api/chat/public-chat", {
      employee_code: employee_code.trim(),
      question: question.trim(),
    });
    return response.data;
  },
};
