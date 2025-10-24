import axios from "axios";

const API_URL = "http://localhost:8080/api/";
const ACTIVITIES_ENDPOINT = "activities";
const RECOMMENDATION_ACTIVITY_ENDPOINT = "recommendations/activity";


const api = axios.create({
    baseURL: API_URL,
})

api.interceptors.request.use((config) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (userId) {
        config.headers['X-User-Id'] = userId;
    }
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

export const getActivities = async () => api.get(ACTIVITIES_ENDPOINT);
export const addActivity = async (activity) => api.post(ACTIVITIES_ENDPOINT, activity);
export const getActivityRecommendation = async (id) => api.get(`${RECOMMENDATION_ACTIVITY_ENDPOINT}/${id}`);