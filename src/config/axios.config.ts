import axios from 'axios';

const REACT_APP_BASE = "https://efm-backend-production.up.railway.app/api";

const axiosInstance = axios.create({
    baseURL: REACT_APP_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;