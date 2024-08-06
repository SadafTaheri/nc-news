import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ArticleContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function ArticlesList() {
  const { articles, isLoading } = useContext(ArticleContext);
  const navigate = useNavigate();
  const handleClickReadMore = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <div>
      <h1>Articles</h1>
      {isLoading ? (
        <h2 style={{ color: "green" }}>Loading...</h2>
      ) : (
        <ul>
          {articles.map((article) => (
            <li
              style={{
                border: "2px solid white",
                marginBottom: "10px",
                padding: "10px",
              }}
              key={article.article_id}
            >
              <h3>{article.title}</h3>
              <h6>Topic: {article.topic}</h6>
              <img
                src={article.article_img_url}
                alt="article_img"
                style={{ width: "80%", height: "80%" }}
              />
              <h6>Date: {article.created_at}</h6>
              <button
                style={{ backgroundColor: "gray", padding: "2px" }}
                onClick={() => handleClickReadMore(article.article_id)}
              >
                Read more
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
