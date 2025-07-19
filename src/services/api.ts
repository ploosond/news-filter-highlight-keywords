import axios from "axios";

const baseUrl = "https://newsapi.org";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: import.meta.env.VITE_APP_API,
  },
});

export default api;
