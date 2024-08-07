import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleContext } from "../App";
import baseApi from "../../api";
import Comments from "./Comments";

export default function SingleArticle() {
  const { articleId } = useParams();
  const { isLoading } = useContext(ArticleContext);
  const [article, setArticle] = useState({});
  const [vote, setVote] = useState(0);

  useEffect(() => {
    baseApi
      .get(`/articles/${articleId}`)
      .then((res) => {
        setArticle(res.data.article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const increaseVote = () => {
    setVote(vote + 1);
  };

  const decreaseVote = () => {
    setVote(vote - 1);
  };

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
        <div>
          <button
            onClick={decreaseVote}
            style={{ backgroundColor: "red", padding: "3px" }}
          >
            -1
          </button>
          <h4 style={{ display: "inline-block", margin: "5px 10px" }}>
            Votes: {vote}{" "}
          </h4>
          <button
            onClick={increaseVote}
            style={{ backgroundColor: "green", padding: "3px" }}
          >
            +1
          </button>
        </div>
        <h4>Comment: {article.comment_count}</h4>
        <Comments />
      </div>
    </div>
  );
}
