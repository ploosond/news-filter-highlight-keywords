import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import toDateString from "../../utils/toDateString";
import truncateText from "../../utils/truncateText";
import styles from "./ArticleCard.module.scss";
import { Link } from "react-router";
import HighlightedText from "../HighlightedText/HighlightedText";
import type { Article } from "../../types/article.types";

interface ArticleCardProps {
  article: Article;
  searchTerm?: string;
}

function ArticleCard({ article, searchTerm }: ArticleCardProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={article.publishedAt}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          src={article.image}
          alt={article.title}
          height={150}
          sx={{
            objectFit: "cover",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            alignItems: "start",
            "&:last-child": {
              paddingBottom: "16px",
            },
          }}
        >
          <Box mb={2} className={styles["article-published-date"]}>
            <CalendarMonthIcon />

            <Typography variant="caption" color="textSecondary">
              {toDateString(article.publishedAt)}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              className={styles["article-title"]}
              sx={{
                fontWeight: 600,
                fontSize: "0.80rem",
                marginBottom: "10px",
                lineHeight: "1.2em",
                maxHeight: "calc(1.2em *2)",
                overflow: "hidden",
              }}
              variant="h6"
            >
              <HighlightedText
                text={truncateText(article.title, 100)}
                keyword={searchTerm || ""}
              />
            </Typography>
            <Typography
              className={styles["article-description"]}
              sx={{
                fontWeight: 400,
                fontSize: "0.75rem",
                lineHeight: "1.2em",
                maxHeight: "calc(1.2em *3)",
                overflow: "hidden",
              }}
              variant="body2"
            >
              <HighlightedText
                text={truncateText(article.description, 100) + "..."}
                keyword={searchTerm || ""}
              />
            </Typography>
          </Box>
          <Link
            className={styles["article-link"]}
            to={`/articles/${article.id}`}
          >
            <Typography sx={{ fontSize: "0.75rem" }}>Read more</Typography>
            <ArrowRightAltIcon fontSize="small" />
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
}
export default ArticleCard;
