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
  const [userVoted, setUserVoted] = useState(0);
  const [err, setErr] = useState(null);

  useEffect(() => {
    baseApi
      .get(`/articles/${articleId}`)
      .then((res) => {
        setArticle(res.data.article);
        setVote(res.data.article.votes);
      })
      .catch((err) => {
        console.log(err);
        setErr("Article not found.");
      });
  }, [articleId]);

  const updateVoting = (incVotes) => {
    // if (userVoted) {
    //   alert("You voted on this article!");
    //   return;
    // }
    baseApi
      .patch(`/articles/${articleId}`, { inc_votes: incVotes })
      .then((res) => {
        setArticle(res.data.article);
        setVote(res.data.article.votes);
        setUserVoted(true);
      })
      .catch((err) => {
        console.log(err);
        setErr("Voting Failed. Please try again!");
      });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {err && (
        <div style={{ color: "red" }}>
          <h1>Error</h1>
          <h3>{err}</h3>
        </div>
      )}
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
            onClick={() => updateVoting(-1)}
            style={{ backgroundColor: "red", padding: "3px" }}
          >
            -1
          </button>
          <h4 style={{ display: "inline-block", margin: "5px 10px" }}>
            Votes: {vote}{" "}
          </h4>
          <button
            onClick={() => updateVoting(1)}
            style={{ backgroundColor: "green", padding: "3px" }}
          >
            +1
          </button>
        </div>

        <Comments />
      </div>
    </div>
  );
}
