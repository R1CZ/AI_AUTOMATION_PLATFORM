/**
 * API Service Layer
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  status: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

interface AuthResponse {
  user: any;
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('access_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || error.error?.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  private async safeFetch(url: string, options?: RequestInit): Promise<Response> {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (err instanceof TypeError) {
        throw new Error('Cannot connect to server. Please ensure the backend is running at ' + API_BASE_URL);
      }
      throw err;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // Authentication
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.safeFetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    
    const result = await this.handleResponse<ApiResponse<AuthResponse>>(response);
    
    this.setToken(result.data.access_token);
    localStorage.setItem('refresh_token', result.data.refresh_token);
    
    return result.data;
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await this.safeFetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    
    const result = await this.handleResponse<ApiResponse<AuthResponse>>(response);
    
    this.setToken(result.data.access_token);
    localStorage.setItem('refresh_token', result.data.refresh_token);
    
    return result.data;
  }

  async refresh(): Promise<{ access_token: string }> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await this.safeFetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    
    const result = await this.handleResponse<ApiResponse<{ access_token: string }>>(response);
    
    this.setToken(result.data.access_token);
    return result.data;
  }

  async logout() {
    this.clearToken();
  }

  // Workflows
  async getWorkflows(params?: { page?: number; limit?: number; status?: string; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);

    const response = await this.safeFetch(
      `${API_BASE_URL}/api/workflows?${queryParams.toString()}`,
      { headers: this.getHeaders() }
    );
    
    return this.handleResponse<ApiResponse<any[]>>(response);
  }

  async getWorkflow(id: string) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/workflows/${id}`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<ApiResponse<any>>(response);
  }

  async createWorkflow(workflow: any) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/workflows`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(workflow),
    });
    
    return this.handleResponse<ApiResponse<any>>(response);
  }

  async updateWorkflow(id: string, workflow: any) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/workflows/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(workflow),
    });
    
    return this.handleResponse<ApiResponse<any>>(response);
  }

  async deleteWorkflow(id: string) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/workflows/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<{ message: string }>(response);
  }

  async executeWorkflow(id: string, inputData?: any) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/workflows/${id}/execute`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ input_data: inputData }),
    });
    
    return this.handleResponse<ApiResponse<any>>(response);
  }

  // Executions
  async getExecutions(params?: { 
    workflow_id?: string; 
    status?: string; 
    page?: number; 
    limit?: number;
    from?: string;
    to?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.workflow_id) queryParams.append('workflow_id', params.workflow_id);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.from) queryParams.append('from', params.from);
    if (params?.to) queryParams.append('to', params.to);

    const response = await this.safeFetch(
      `${API_BASE_URL}/api/executions?${queryParams.toString()}`,
      { headers: this.getHeaders() }
    );
    
    return this.handleResponse<ApiResponse<any[]>>(response);
  }

  async getExecution(id: string) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/executions/${id}`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<ApiResponse<any>>(response);
  }

  // Webhooks
  async getWebhooks() {
    const response = await this.safeFetch(`${API_BASE_URL}/api/webhooks`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<ApiResponse<any[]>>(response);
  }

  async createWebhook(webhook: { name: string; workflow_id: string }) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/webhooks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(webhook),
    });
    
    return this.handleResponse<ApiResponse<any>>(response);
  }

  async testWebhook(id: string, payload: any) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/webhooks/${id}/test`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ payload }),
    });
    
    return this.handleResponse<ApiResponse<any>>(response);
  }

  // Integrations
  async getIntegrations() {
    const response = await this.safeFetch(`${API_BASE_URL}/api/integrations`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<ApiResponse<any[]>>(response);
  }

  async connectIntegration(id: string, config: any) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/integrations/${id}/connect`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(config),
    });
    
    return this.handleResponse<ApiResponse<any>>(response);
  }

  async disconnectIntegration(id: string) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/integrations/${id}/disconnect`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<{ message: string }>(response);
  }

  // Analytics
  async getAnalytics(period: string = 'week') {
    const response = await this.safeFetch(`${API_BASE_URL}/api/analytics?period=${period}`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<ApiResponse<any>>(response);
  }

  // Health
  async healthCheck() {
    const response = await this.safeFetch(`${API_BASE_URL}/api/health`);
    return this.handleResponse<{ status: string; services: any }>(response);
  }

  // Users (Admin)
  async getUsers() {
    const response = await this.safeFetch(`${API_BASE_URL}/api/users`, {
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<ApiResponse<any[]>>(response);
  }

  async updateUser(id: string, updates: any) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(updates),
    });
    
    return this.handleResponse<ApiResponse<any>>(response);
  }

  async deleteUser(id: string) {
    const response = await this.safeFetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<{ message: string }>(response);
  }
}

export const api = new ApiService();
