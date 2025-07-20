import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article, ArticleWithId } from "../../types/article.types";
import type { AppDispatch } from "../../app/store";
import allArticles from "../../services/allArticles";
import { v4 as uuidv4 } from "uuid";

interface ArticlesState {
  articles: ArticleWithId[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ArticlesState = {
  articles: [],
  loading: "idle",
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<ArticleWithId[]>) => {
      state.articles = action.payload;
      state.loading = "succeeded";
    },
    setLoading: (state, action: PayloadAction<ArticlesState["loading"]>) => {
      state.loading = action.payload;
    },
  },
});

export const { setArticles, setLoading } = articleSlice.actions;

export const initializeArticles = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading("pending"));
    try {
      const data = await allArticles();
      const articlesWithIds = data.articles.map((article: Article) => {
        return {
          id: uuidv4(),
          ...article,
        };
      });

      dispatch(setArticles(articlesWithIds));
    } catch (error) {
      dispatch(setLoading("failed"));
      console.error("Failed to initialize notes:", error);
    }
  };
};

export default articleSlice.reducer;
