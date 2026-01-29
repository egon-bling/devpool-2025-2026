/* AUTH_03A - Navigation Guard para garantir que usuário esteja autorizado na API, redirecionando para home, para centralizar o processo de autorização por lá */

import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    oauthCode: sessionStorage.getItem('oauth_code') as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.oauthCode,
  },

  actions: {
    setOAuthCode(code: string) {
      this.oauthCode = code
      sessionStorage.setItem('oauth_code', code)
    },

    logout() {
      this.oauthCode = null
      sessionStorage.removeItem('oauth_code')
    },
  },
})
