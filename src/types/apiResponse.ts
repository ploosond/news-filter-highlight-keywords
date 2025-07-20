import type { Article } from "./article.types";

export interface ApiResponse {
  totalArticles: number;
  articles: Array<Article>;
}
