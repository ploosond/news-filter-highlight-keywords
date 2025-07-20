import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article, ArticleWithId } from "../../types/article.types";
import type { AppDispatch, RootState } from "../../app/store";
import allArticles from "../../services/allArticles";
import { v4 as uuidv4 } from "uuid";

interface ArticlesState {
  articles: ArticleWithId[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  searchTerm: string;
}

const initialState: ArticlesState = {
  articles: [],
  loading: "idle",
  searchTerm: "",
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<ArticleWithId[]>) => {
      state.articles = action.payload;
      state.loading = "succeeded";
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setLoading: (state, action: PayloadAction<ArticlesState["loading"]>) => {
      state.loading = action.payload;
    },
  },
});

export const { setArticles, setSearchTerm, setLoading } = articleSlice.actions;

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

export const selectFilteredArticles = (state: RootState) => {
  const searchTerm = state.articles.searchTerm.toLowerCase();
  return state.articles.articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchTerm) ||
      article.description?.toLowerCase().includes(searchTerm)
    );
  });
};

export default articleSlice.reducer;
