import type { Article } from "./article.types";

export interface ApiResponse {
  status: string;
  articles: Array<Article>;
}
