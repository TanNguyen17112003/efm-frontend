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

export const getAllUsers = async(token: string) => {
    try {
        const response = await axiosInstance.get('/user/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch(e) {
        throw e
    }
}

export const sendFriendRequest = async(token: string, id: string) => {
    try {
        const response = await axiosInstance.post(`/user/request/${id}`, {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.message;
    }
    catch (e) {
        throw e
    }
}

export const acceptFriendRequest = async(token: string, id: string) => {
    try {
        const response = await axiosInstance.put(`/user/request/${id}`, 
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.message;
    }
    catch (e) {
        throw e
    }
}

export const getAllRequests = async(token: string) => {
    try {
        const response = await axiosInstance.get('/user/request', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (e) {
        throw e
    }
}

export const getAllFriends = async(token: string) => {
    try {
        const response = await axiosInstance.get('/user/friends', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (e) {
        throw e
    }
}

export const getAllMyRequests = async (token: string) => {
    try {
        const response = await axiosInstance.get('user/my-request' , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (e) {
        throw e
    }
}

export const rejectRequest = async (token: string, id: string) => {
    try {
        const response = await axiosInstance.put(`/user/request/${id}/reject`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.message;
    }
    catch (e) { 
        throw e
    }
}

