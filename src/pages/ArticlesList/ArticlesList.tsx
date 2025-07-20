import {
  Box,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./ArticlesList.module.scss";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectFilteredArticles,
  setSearchTerm,
} from "../../features/articles/articlesSlice";

function ArticlesList() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.articles.loading);
  const searchTerm = useAppSelector((state) => state.articles.searchTerm);
  const filteredArticles = useAppSelector(selectFilteredArticles);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <Container className={styles["home-container"]}>
      {/* Filter input */}
      <Box mb={4}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
          Filter by keywords
        </Typography>
        <TextField
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          value={searchTerm}
          sx={{ width: "450px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Total articles */}
      <Box mb={4}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "0.85rem",
            borderBottom: "1px solid #eaeaea",
          }}
        >
          Total articles: {filteredArticles.length}
        </Typography>
      </Box>

      {/* Articles list */}
      <Grid container spacing={3}>
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            searchTerm={searchTerm}
          />
        ))}
      </Grid>
    </Container>
  );
}
export default ArticlesList;
