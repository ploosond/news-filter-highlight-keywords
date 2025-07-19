import type { ApiResponse } from "../types/apiResponse";
import api from "./api";

const allArticles = async (): Promise<ApiResponse> => {
  try {
    const res = await api.get("/v2/top-headlines?country=us");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch articles", error);
    throw error;
  }
};

export default allArticles;
