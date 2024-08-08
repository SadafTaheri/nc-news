import { useContext, useEffect, useState } from "react";
import { ArticleContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ArticlesList() {
  const { articles, setArticles } = useContext(ArticleContext);
  const navigate = useNavigate();
  const [searchArticles, setSearchArticles] = useSearchParams();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sort_by = searchArticles.get("sort_by") || "created_at";
  const order = searchArticles.get("order") || "desc";

  const handleClickReadMore = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://be-nc-news-c79i.onrender.com/api/articles", {
        params: { sort_by, order },
      })
      .then((res) => {
        setArticles(res.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setIsLoading(false);
      });
  }, [sort_by, order, setArticles, setIsLoading]);

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSearchArticles({ sort_by: newSortBy, order });
  };

  const handleOrderChange = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setSearchArticles({ sort_by, order: newOrder });
  };

  return (
    <div className="container">
      <h1>Articles</h1>
      <div>
        <label>Sort By: </label>
        <select value={sort_by} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <button onClick={handleOrderChange}>
          {order === "asc" ? "High to Low" : "Low to High"}
        </button>
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
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
