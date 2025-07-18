import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./pages/Home";
import Article from "./pages/Article";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/articleId" element={<Article />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
