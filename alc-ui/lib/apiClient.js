// This library file serves as a generic API client utility that can be
// used in conjunction with any API request that the UI needs to make

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GENERAL } from '../constants/constants';
import axios from 'axios'
import { auth } from './firebaseConfig';

// creates base axios instance, set once here, and used everywhere
const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    timeout: 10000, // 10 second timeout for API requests to prevent request hanging
    headers: {
        'Content-Type': 'application/json'
    },
});

// request interceptor to add authentication token to header
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const currentUser = auth.currentUser
            if (currentUser) {
                const freshToken = await currentUser.getIdToken(true);
                config.headers.Authorization = `Bearer ${token}`
                await AsyncStorage.setItem(GENERAL.AUTHORIZATION_TOKEN, freshToken)
            }
        } catch (error) {
            console.error('Token refresh failed: ', error);
            console.log('Attempting to use stored token...')
            const token = await AsyncStorage.getItem(GENERAL.AUTHORIZATION_TOKEN);
            if (token) config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) console.error('Unauthorized access');
        if (error.response?.status >= 500) console.error('Internal Server Error: ', error.response.data);
        return Promise.reject(error);
    }
)

// predefined generic API methods
const api = {
    // GET request
    get: (endpoint, config = {}) => {
        return apiClient.get(endpoint, config);
    },

    // POST request
    post: (endpoint, data = {}, config = {}) => {
        return apiClient.post(endpoint, data, config);
    },

    // DELETE request
    delete: (endpoint, config = {}) => {
        return apiClient.delete(endpoint, config);
    },

    // PUT request
    put: (endpoint, data = {}, config = {}) => {
        return apiClient.put(endpoint, data, config);
    }
}

export default api