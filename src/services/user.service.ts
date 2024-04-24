import axiosInstance from "src/config/axios.config";

export const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/user/signin', {
            "email": email,
            "password": password
        })
        return response.data;
    }
    catch (e) {
        throw e;
    }
}
export const register = async (email: string, password: string, name: string) => {
    try {
        const response = await axiosInstance.post('/user/signup', {
            email, password, name
        })
        return response.data;
    }
    catch (e) {
        throw e
    }
}

export const getInformation = async (token: string) => {
    try {
        const response = await axiosInstance.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (e) {
        throw e;
    }
}

