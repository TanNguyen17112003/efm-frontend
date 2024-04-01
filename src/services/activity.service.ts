import axiosInstance from "src/config/axios.config";

export const getAllActivities = async (token: string) => {
    try {
        const response = await axiosInstance.get('/activity', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.sample;
    }
    catch (e) {
        throw e;
    }
}

export const getActivityById = async (token: string, id: string) => {
    try {
        const response = await axiosInstance.get(`/activity/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.sample;
    }
    catch (e) {
        throw e;
    }
}

export const configActivityById = async(token: string, id: string, category: string, title: string, date: Date, target: number, current: number) => {
    try {
        const response = await axiosInstance.put(`/activity/${id}`, {
            category, title, date, target, current
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data.sample;
    }
    catch (e) {
        throw e;
    }
}

export const createActivity = async (token: string, category: string, title: string, date: Date, target: number, current: number) => {
    try {
        const response = await axiosInstance.post('/activity', {
            category, title, date, target, current
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.sample;
    }
    catch (e) {
        throw e;
    }
}

export const deleteActivity = async (token: string, id: string) => {
    try {
        const response = await axiosInstance.delete(`/activity/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.sample;
    }
    catch (e) {
        throw e;
    }
}