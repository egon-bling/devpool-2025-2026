import { defineStore } from 'pinia';
import { authService } from '../services/auth.services';

interface AuthState {
  accessToken: string | null;
  carregandoAuth: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('bling_access_token') || null,
    carregandoAuth: true,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  
  actions: {
    login() {
      const state = Math.random().toString(36).substring(2, 15); 
      localStorage.setItem('auth_state', state); 
      
      const clientId = import.meta.env.VITE_BLING_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_BLING_REDIRECT_URI;
      
      window.location.href = `https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`;
    },

    async handleAuthCallback(code: string, stateRetornado: string) {
      this.carregandoAuth = true;
      try {
        const stateSalvo = localStorage.getItem('auth_state');
        if (!stateRetornado || stateRetornado !== stateSalvo) {
          throw new Error("State de segurança inválido. Possível ataque CSRF.");
        }

        const data = await authService.getToken(code);
        
        this.accessToken = data.access_token;
        localStorage.setItem('bling_access_token', data.access_token);
        localStorage.setItem('bling_refresh_token', data.refresh_token);
        
        localStorage.removeItem('auth_state');
        
        return { sucesso: true };
      } catch (error: any) {
        this.logout(); 
        return { sucesso: false, erro: error.message };
      } finally {
        this.carregandoAuth = false;
      }
    },

    finalizarCarregamento() {
            this.carregandoAuth = false;
        },

    logout() {
      this.accessToken = null;
      localStorage.removeItem('bling_access_token');
      localStorage.removeItem('bling_refresh_token');
      localStorage.removeItem('auth_state');
      this.carregandoAuth = false;
    }
  }
});