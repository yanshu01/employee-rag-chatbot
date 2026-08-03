import { apiClient } from "./api/axios";

export interface PolicySource {
  source: string;
  page: number | null;
  content: string;
}

export interface PolicySearchResponse {
  question: string;
  context: string;
  sources: PolicySource[];
}

export const policyService = {
  async searchPolicies(question: string): Promise<PolicySearchResponse> {
    const response = await apiClient.post<PolicySearchResponse>(
      "/api/policies/search",
      {
        question: question.trim(),
      }
    );
    return response.data;
  },
};
