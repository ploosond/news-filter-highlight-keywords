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
import { useAppSelector } from "../../app/hooks";

function ArticlesList() {
  const { articles, loading } = useAppSelector((state) => state.articles);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (!articles) {
    return <div>Article not found.</div>;
  }

  return (
    <Container className={styles["home-container"]}>
      {/* Filter input */}
      <Box mb={4}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
          Filter by keywords
        </Typography>
        <TextField
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
          Total articles: {articles.length}
        </Typography>
      </Box>

      {/* Articles list */}
      <Grid container spacing={3}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </Grid>
    </Container>
  );
}
export default ArticlesList;
