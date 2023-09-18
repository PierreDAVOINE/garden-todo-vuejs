import axios from 'axios';
import { getUserDataFromLocalStorage } from './user';

// Configuration de base pour l'instance axios
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  // On indique à axios de ne pas gérer les erreurs inférieur à 500
  validateStatus: (status) => status >= 200 && status < 500,
});

// Je peux agir avant qu'une requête soit envoyé
axiosInstance.interceptors.request.use((config) => {
  // Je récupère les données utilisateur
  const userData = getUserDataFromLocalStorage();

  // Si mon utilisateur est connecté, je lui ajoute un header Authorization
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = userData ? `Bearer ${userData.token}` : null;

  return config;
});
