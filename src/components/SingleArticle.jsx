import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleContext } from "../App";
import baseApi from "../../api";

export default function SingleArticle() {
  const { articleId } = useParams();
  const { articles, isLoading } = useContext(ArticleContext);
  const [article, setArticle] = useState({});

  useEffect(() => {
    baseApi
      .get(`/articles/${articleId}`)
      .then((res) => {
        setArticle(res.data.article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articleId, articles]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div style={{ border: "1px solid white" }}>
        <h3>{article.title}</h3>
        <h6>
          Topic:{" "}
          <button style={{ backgroundColor: "gray" }}>{article.topic}</button>
        </h6>
        <img src={article.article_img_url} alt="" />
        <p style={{ fontSize: "11px", fontWeight: "bold" }}>
          Author: {article.author} __ Date: {article.created_at}
        </p>
        <p>{article.body}</p>
      </div>
      <div>
        <h4>
          votes: {article.votes}{" "}
          <button style={{ backgroundColor: "gray", padding: "3px" }}>
            Vote
          </button>
        </h4>
        <h4>Comment: {article.comment_count}</h4>
        <h6>Comments list:</h6>
      </div>
    </div>
  );
}
