import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TopicCard() {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const handleClickReadMore = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  const topic = slug;

  console.log(topic);

  useEffect(() => {
    axios
      .get(`https://be-nc-news-c79i.onrender.com/api/articles`)
      .then((res) => {
        setArticles(res.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErr(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (err) return <h1>Error:{err.message}</h1>;

  return (
    <div>
      <ul>
        {articles.map((article) => {
          if (article.topic === topic) {
            return (
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
            );
          }
        })}
      </ul>
    </div>
  );
}
