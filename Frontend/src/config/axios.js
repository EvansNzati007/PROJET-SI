import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // récupéré depuis le .env
  withCredentials: true, // si tu utilises des cookies pour l'auth
});

export default api;
