import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    const accessToken = JSON.parse(localStorage.getItem('accessToken') ?? 'null');
    if (accessToken) {
      config.headers = config.headers ?? {};
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
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized =
      error.response?.status === 401 ||
      error.response?.data?.message === "Invalid Token" ||
      error.response?.data?.message === "Not authorized, no token provided";

    if (isUnauthorized && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/api/auth/refresh-token");

        const newAccessToken = res.data.accessToken;

        // Save token
        localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
        localStorage.setItem("login", true);

        // Attach new token safely
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);

      } catch (refreshError) {
        const message = refreshError.response?.data?.message;

        if (
          message === "Invalid or expired refresh token" ||
          message === "Refresh token required"
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("login");

          window.location.href = "/sign-in";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;