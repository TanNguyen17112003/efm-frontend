import axios from 'axios';

const REAC_APP_BASE = "https://efm-backend-production.up.railway.app/api";

const axiosInstance = axios.create({
    baseURL: REAC_APP_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;