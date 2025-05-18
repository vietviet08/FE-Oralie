import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
    baseURL: 'http://localhost:8072/api',
});

api.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            try {
                const session = await getSession();
                if (session) {
                    const newSession = await fetch('/api/auth/session');
                    if (newSession.ok) {
                        const newSessionData = await newSession.json();
                        if (error.config) {
                            error.config.headers.Authorization = `Bearer ${newSessionData.access_token}`;
                            return axios(error.config);
                        }
                    }
                }
            } catch (refreshError) {
                console.error('Error refreshing access token', refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;