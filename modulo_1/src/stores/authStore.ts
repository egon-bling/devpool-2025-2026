import { defineStore } from 'pinia';
import { authService } from '../services/auth.services';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: localStorage.getItem('bling_access_token') || null,
    }),

    actions: {
        async handelAuthCallback(code: string) {
            try {
                const data = await authService.getToken(code);
                this.accessToken = data.access_token  //salva na memoria
                localStorage.setItem('bling_access_token', data.access_token) //salva no localstorage
                localStorage.setItem('bling_refresh_token', data.refresh_token);

                return true;
            } catch (error) {
                this.logout();
                throw error;
            }
        },

        logout() {
            this.accessToken = null;
            localStorage.removeItem('bling_access_token');
            localStorage.removeItem('bling_refresh_token');
            localStorage.removeItem('bling_auth_state');
        }
    }
});