export interface Article {
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  urlToImage: string;
  url: string;
}

export interface ArticleWithId extends Article {
  id: string;
}
