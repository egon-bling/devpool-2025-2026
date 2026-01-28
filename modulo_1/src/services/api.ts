const BASE_URL = "/api-bling/Api/v3"; 

export const apiClient = {
    async request(endpoint: string, method: string = 'GET', token: string, body?: any) {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = `${BASE_URL}${cleanEndpoint}`;

        const options: RequestInit = {
            method,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        if (body) options.body = JSON.stringify(body);

        const response = await fetch(url, options);
        
        if (response.status === 204) return true;

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const msg = errorData.error?.fields?.[0]?.msg || errorData.message || `Erro: ${response.status}`;
            throw new Error(msg);
        }

        return await response.json();
    }
};