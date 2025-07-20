import axios from "axios";

const baseUrl = "https://gnews.io/api/v4";

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
