import axios from "axios";

const api = axios.create({
    baseURL: "https://prolific-ambition-production.up.railway.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  const noAuthNeeded = ["/register/", "/token/", "/token/refresh/"];

  if (token && !noAuthNeeded.some((url) => config.url.includes(url))) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;