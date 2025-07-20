import { Link, useParams } from "react-router";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "./ArticlePage.module.scss";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";

function ArticlePage() {
  const { id } = useParams<{ id: string }>();

  const { articles, loading } = useAppSelector((state) => state.articles);

  const article = articles.find((article) => article.id === id);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (!article) {
    return (
      <div>
        <h1>Article not found.</h1>
        <Link className={styles["article-link"]} to="/">
          <KeyboardBackspaceIcon fontSize="small" />
          <Typography sx={{ fontSize: "0.75rem" }}>Back to homepage</Typography>
        </Link>
      </div>
    );
  }

  return (
    <Box
      className={styles["image-background"]}
      sx={{ backgroundImage: `url(${article.urlToImage})` }}
    >
      <Container className={styles["article-container"]}>
        <Card>
          <CardContent className={styles["article-card"]}>
            <Typography className={styles["article-title"]} variant="h6">
              {article.title}
            </Typography>
            <Typography variant="body2">{article.description}</Typography>
          </CardContent>
        </Card>
        <Link className={styles["article-link"]} to="/">
          <KeyboardBackspaceIcon fontSize="small" />
          <Typography sx={{ fontSize: "0.75rem" }}>Back to homepage</Typography>
        </Link>
      </Container>
    </Box>
  );
}
export default ArticlePage;
