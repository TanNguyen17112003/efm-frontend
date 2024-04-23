import axiosInstance from "src/config/axios.config";

export const getAllChallenges = async (token: string) => {
    try {
        const response = await axiosInstance.get('/challenge', {
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

export const getChallengeById = async (token: string, id: string) => {
    try {
        const response = await axiosInstance.get(`/challenge/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.challenge;
    }
    catch (e) {
        throw e;
    }
}

export const getAllChallengesOfFriends = async (token: string) => {
    try {
        const response = await axiosInstance.get('/challenge/friends/all', {
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

export const getAllAttendedChallenges = async (token: string) => {
    try {
        const response = await axiosInstance.get('/challenge/friends/attended', {
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

export const configChallengeById = async(token: string, id: string, category: string, name: string, description: string, date: Date, target: number, current: number) => {
    try {
        const response = await axiosInstance.put(`/challenge/${id}`, {
            category, name, description, date, target, current
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data.challenge;
    }
    catch (e) {
        throw e;
    }
}

export const createChallenge = async (token: string, category: string, name: string, description: string, date: Date, target: number, current: number) => {
    try {
        const response = await axiosInstance.post('/challenge', {
            category, name, description, date, target, current
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.challenge;
    }
    catch (e) {
        throw e;
    }
}

export const attendChallenge = async (token: string, id: string) => {
    try {
        const response = await axiosInstance.post(`/challenge/${id}/attend`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.message;
    }
    catch (e) {
        throw e;
    }
}

export const deleteChallenge = async (token: string, id: string) => {
    try {
        const response = await axiosInstance.delete(`/challenge/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.message;
    }
    catch (e) {
        throw e;
    }
}