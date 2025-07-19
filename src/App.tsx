import { Route, BrowserRouter as Router, Routes } from "react-router";
import "./styles/main.scss";
import { useEffect, useState } from "react";
import type { Article, ArticleWithId } from "./types/article.types";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import allArticles from "./services/allArticles";
import ArticlesList from "./pages/ArticlesList/ArticlesList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [articles, setArticles] = useState<Array<ArticleWithId>>([]);

  useEffect(() => {
    allArticles()
      .then((data) => {
        const articlesWithIds = data.articles.map((article: Article) => {
          return {
            id: uuidv4(),
            ...article,
          };
        });

        setArticles(articlesWithIds);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(articles[0]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ArticlesList articles={articles} />} />
          <Route
            path="/articles/:id"
            element={<ArticlePage articles={articles} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
