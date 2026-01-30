import axios from 'axios';

const BASE_URL = "/api-bling/Api/v3";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('bling_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const requestHandler = {
  async request(endpoint: string, method: string = 'GET', _unusedToken?: string, body?: any) {
    try {
      const response = await apiClient({
        url: endpoint,
        method: method,
        data: body
      });
      return response.data; 
    } catch (error: any) {
      const msg = error.response?.data?.error?.fields?.[0]?.msg || 
                  error.response?.data?.message || 
                  error.message;
      throw new Error(msg);
    }
  }
};