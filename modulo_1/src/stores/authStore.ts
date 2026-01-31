import { defineStore } from 'pinia';
import { authService } from '../services/auth.services'; // Verifique se o caminho está correto

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: localStorage.getItem('bling_access_token') || null,
        carregandoAuth: true, 
    }),
    getters: {
        isAutenticated: (state) => !!state.accessToken,
    },
    actions: {
        async handelAuthCallback(code: string) {
            try {
                const data = await authService.getToken(code);
                
                this.accessToken = data.access_token;
                localStorage.setItem('bling_access_token', data.access_token);
                localStorage.setItem('bling_refresh_token', data.refresh_token);
                
                this.carregandoAuth = false;
                return true;
            } catch (error) {
                this.logout();
                throw error;
            }
        },

        finalizarCarregamento() {
            this.carregandoAuth = false;
        },

        logout() {
            this.accessToken = null;
            localStorage.removeItem('bling_access_token');
            localStorage.removeItem('bling_refresh_token');
            this.carregandoAuth = false;
        }
    }
});