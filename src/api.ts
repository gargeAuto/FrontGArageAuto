// src/api.js
import axios from 'axios'

// Crée une instance avec les configs de base
const api = axios.create({
    baseURL: 'http://localhost:80/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})


api.interceptors.response.use(
    response => response,
    error => {
        let message = "Erreur inconnue";

        if (error.response?.data?.message) {
            message = error.response.data.message;
        }

        else if (error.message) {
            message = error.message;
        }

        return Promise.reject(new Error(message));
    }
)

export default api
