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
    return <div>Article not found.</div>;
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
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
              aliquam itaque esse laboriosam laudantium rerum ut! Expedita,
              dicta deleniti ut veniam, culpa provident adipisci, nobis nisi
              nemo ipsum sint dolorum non excepturi odit alias amet quam debitis
              atque eligendi consequuntur optio incidunt assumenda. Modi
              reiciendis, fuga repellat, nam quas recusandae iusto impedit ipsa
              magnam corporis beatae architecto cumque fugit saepe perspiciatis,
              eveniet quam dolore delectus similique rerum aut consequatur quod.
              Vel saepe sed ullam temporibus asperiores iure iste voluptate,
              facere eaque cumque, deserunt, nobis blanditiis libero repellat
              quos aspernatur. Labore hic commodi dolor debitis nostrum neque
              odit, perferendis qui nemo!
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
              veniam quasi dolor laborum repellat amet quam, quae eius tenetur,
              eaque quidem facilis impedit sed blanditiis illo doloremque nihil
              eum voluptatibus eveniet. Natus voluptate delectus nobis
              doloremque, vitae ipsa placeat culpa cupiditate velit labore
              recusandae nulla id quo eaque fugiat quasi voluptatem hic optio
              deleniti. Facilis, odio? Doloribus impedit, neque, ducimus, eum
              omnis obcaecati autem et culpa eaque quibusdam eos assumenda!
              Earum eaque tempore nulla beatae odio at incidunt ab architecto
              veritatis sapiente maxime, deserunt repellat, molestias unde quae,
              fuga illum doloribus sed! Ab numquam eveniet, aliquam consequuntur
              quidem facere. Amet!
            </Typography>
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
