const CLIENT_ID = '0c983835be17486ddac231a6e8a1fd4e624523e6';
const CLIENT_SECRET = '2d2f1174d9f4ec82d908b256f6bb77b6a3db2d7cf7679817e3faddc2f809';
const REDIRECT_URI = 'http://localhost:5173/auth';

export const authService = {
    getBasicAuth() {
    return btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    },

    async getToken(code: string){
        const headers = new Headers();
        headers.append("Authorization", `Basic ${this.getBasicAuth()}`);
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("code", code);
        urlencoded.append("redirect_uri", REDIRECT_URI);

        const response = await fetch("/api-bling/Api/v3/oauth/token", {
        method: "POST",
        headers: headers,
        body: urlencoded,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Erro ao obter token");
    }
        return await response.json();
    }
};