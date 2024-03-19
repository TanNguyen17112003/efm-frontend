import axiosInstance from "src/config/axios.config";

export const login = async (email: string, password: string) => {
    const response = await axiosInstance.post('/user/signin', {
        "emai": email,
        "password": password
    })
    return response.data;
}

export const register = async (email: string, password: string) => {
    const response = await axiosInstance.post('/user/signup', {
        "emai": email,
        "password": password
    })
    return response.data;
}

export const getUser = async ()