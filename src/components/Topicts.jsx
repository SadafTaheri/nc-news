import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios
      .get("https://be-nc-news-c79i.onrender.com/api/topics")
      .then((res) => {
        // console.log(res.data.topics);
        setTopics(res.data.topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (err) return <h1>Error:{err.message}</h1>;

  return (
    <div>
      <h3>Topics</h3>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            <p>{topic.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
