// src/api.js
import axios from 'axios'

// Crée une instance avec les configs de base
const api = axios.create({
    baseURL: 'http://localhost:8080', // 🔹 ton backend Spring Boot
    timeout: 5000,                    // temps max d'attente
    headers: {
        'Content-Type': 'application/json',
    },
})

// Optionnel : interceptors pour gérer les erreurs globalement
api.interceptors.response.use(
    response => response, // renvoie la réponse si ok
    error => {
        console.error('Erreur API:', error.response || error.message)
        return Promise.reject(error)
    }
)

export default api
