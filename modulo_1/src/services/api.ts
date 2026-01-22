const BASE_URL = "/api-bling/Api/v3";

export const apiClient = {
    async request(endpoint: string, method: string = 'GET', token:string, body?: any)
    {
    const url = `${BASE_URL}${endpoint}`;

    const options: RequestInit = {
        method, 
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro na API: ${response.status}`);
    } 
    if (response.status === 204) return true;
    return await response.json();
    }
};