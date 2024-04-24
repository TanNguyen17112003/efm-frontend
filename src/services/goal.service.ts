<<<<<<< HEAD
import axiosInstance from "src/config/axios.config";

export const getAllGoals = async (token: string) => {
    try {
        const response = await axiosInstance.get('/goal', {
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

export const getGoalById = async (token: string, id: string) => {
    try {
        const response = await axiosInstance.get(`/goal/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.goal;
    }
    catch (e) {
        throw e;
    }
}

export const configGoalById = async(token: string, id: string, date: Date, target: number, current: number) => {
    try {
        const response = await axiosInstance.put(`/goal/${id}`, {
            date, target, current
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data.goal;
    }
    catch (e) {
        throw e;
    }
}

export const createGoal = async (token: string, category: string, title: string, date: Date, target: number, current: number) => {
    try {
        const response = await axiosInstance.post('/goal', {
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

export const deleteGoalById = async (token: string, id: string) => {
    try {
        const response = await axiosInstance.delete(`/goal/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.message;
    }
    catch (e) {
        throw e;
    }
=======
import axiosInstance from "src/config/axios.config";

export const getAllGoals = async (token: string) => {
    try {
        const response = await axiosInstance.get('/goal', {
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

export const getGoalById = async (token: string, id: string) => {
    try {
        const response = await axiosInstance.get(`/goal/${id}`, {
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

export const configGoalById = async(token: string, id: string, category: string, title: string, date: Date, target: number, current: number) => {
    try {
        const response = await axiosInstance.put(`/goal/${id}`, {
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

export const createGoal = async (token: string, category: string, title: string, date: Date, target: number, current: number) => {
    try {
        const response = await axiosInstance.post('/goal', {
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

export const deleteGoalById = async (token: string, id: string) => {
    try {
        const response = await axiosInstance.delete(`/goal/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.sample;
    }
    catch (e) {
        throw e;
    }
>>>>>>> origin/feat/challenge_friend_screen
}