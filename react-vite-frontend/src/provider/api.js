import axios from "axios";

//instancia do axios 
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})