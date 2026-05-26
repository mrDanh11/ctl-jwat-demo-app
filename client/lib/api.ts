import { CONFIG } from "./config";

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors: any;
}

export interface LoginResponse {
  message: string;
  expireDate: string;
  exp: number;
}

class ApiClient {
  private baseUrl = CONFIG.API_URL;

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include", // send cookies for authentication
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("API Error:", response.status);
        throw new Error(data.message || "Invalid email or password");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async getMe() {
    return this.request("/auth/me", {
      method: "GET",
    });
  }

  // OAuth endpoints
  loginWithGoogle() {
    const redirectUrl = `${this.baseUrl}/oauth/google`;
    window.location.href = redirectUrl;
  }
}

export const apiClient = new ApiClient();
