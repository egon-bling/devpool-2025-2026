const CLIENT_ID = import.meta.env.VITE_BLING_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:5173/callback'; 

export const loginNoBling = () => {
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  localStorage.setItem('auth_state', state);

  const authUrl = `https://www.bling.com.br/b/Api/v3/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&state=${state}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  window.location.href = authUrl;
};