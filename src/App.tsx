import { Route, Routes } from "react-router";
import { useEffect } from "react";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import ArticlesList from "./pages/ArticlesList/ArticlesList";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { initializeArticles } from "./features/articles/articlesSlice";
import "./styles/main.scss";

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.articles);

  useEffect(() => {
    if (loading === "idle") {
      dispatch(initializeArticles());
    }
  }, [dispatch, loading]);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
    </>
  );
}

export default App;
