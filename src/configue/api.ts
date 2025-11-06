import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL , // URL de ton backend Laravel

    withCredentials: true,
});
api.interceptors.request.use( config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})


api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erreur Axios :", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
