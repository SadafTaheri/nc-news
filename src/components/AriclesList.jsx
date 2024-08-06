import axios from "axios";
import { useEffect, useState } from "react";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  useEffect(() => {
    axios
      .get("https://be-nc-news-c79i.onrender.com/api/articles")
      .then((res) => {
        // console.log(res.data.articles);
        setArticles(res.data.articles);
        setIsLoding(false);
      });
  }, []);
  return (
    <div>
      <h1>Articles</h1>
      {isLoding ? (
        <h2 style={{ color: "green" }}>Loding...</h2>
      ) : (
        <ul>
          {articles.map((article) => (
            <li
              style={{
                // backgroundColor: "red",
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
              <button style={{ backgroundColor: "gray", padding: "2px" }}>
                Read more
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
