import type { ApiResponse } from "../types/apiResponse";
import api from "./api";

const allArticles = async (): Promise<ApiResponse> => {
  try {
    const res = await api.get("top-headlines", {
      params: {
        apikey: import.meta.env.VITE_APP_API,
        lang: "en",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch articles", error);
    throw error;
  }
};

export default allArticles;
