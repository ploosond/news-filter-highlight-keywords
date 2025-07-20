import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article } from "../../types/article.types";
import type { AppDispatch, RootState } from "../../app/store";
import allArticles from "../../services/allArticles";

interface ArticlesState {
  articles: Article[];
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
    setArticles: (state, action: PayloadAction<Article[]>) => {
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
      dispatch(setArticles(data.articles));
    } catch (error) {
      dispatch(setLoading("failed"));
      console.error("Failed to initialize notes:", error);
    }
  };
};

export const selectFilteredArticles = (state: RootState) => {
  const searchTerm = state.articles.searchTerm.trim().toLowerCase();

  if (!searchTerm) {
    return state.articles.articles;
  }

  const keywords = searchTerm.split(/\s+/);
  const articles = state.articles.articles;

  const sortedArticles = articles
    .map((article) => {
      const title = article.title.toLowerCase() || "";
      const description = article.description.toLowerCase() || "";

      const titleMatches = keywords.filter((word) =>
        title.includes(word)
      ).length;
      const descriptionMatches = keywords.filter((word) =>
        description.includes(word)
      ).length;

      const totalMatches = titleMatches + descriptionMatches;

      return {
        ...article,
        _scores: totalMatches,
        _titleScore: titleMatches,
      };
    })
    .filter((article) => article._scores > 0)
    .sort((a, b) => {
      if (b._titleScore !== a._titleScore) {
        return b._titleScore - a._titleScore;
      }

      return b._scores - a._scores;
    });

  return sortedArticles;
};

export default articleSlice.reducer;
