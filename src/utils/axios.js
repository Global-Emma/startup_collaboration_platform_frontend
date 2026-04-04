import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.status === 401 || error.response?.data?.message === "Invalid Token" || error.response?.data?.message === 'Not authorized, no token provided' && !originalRequest._retry) {
      !originalRequest._retry && (originalRequest._retry = true);
      try {
        const response = await api.post("/api/auth/refresh-token")

        localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        localStorage.setItem('login', true);

        return api(originalRequest);
      } catch (error) {
        if (error.response?.data?.message === "Invalid or expired refresh token") {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('login');
          window.location.href = "/sign-in";
        }
      }

    }

    return Promise.reject(error);
  },
);



export default api;