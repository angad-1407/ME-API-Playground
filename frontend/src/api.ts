import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_URL,
});

export const getProfile = async () => {
    const response = await api.get('/profile');
    return response.data;
};

export const getProjects = async (skill?: string) => {
    const params = skill ? { skill } : {};
    const response = await api.get('/projects', { params });
    return response.data;
};

export const search = async (q: string) => {
    const response = await api.get('/search', { params: { q } });
    return response.data;
};

export const checkHealth = async () => {
    const response = await api.get('/health');
    return response.data;
};
