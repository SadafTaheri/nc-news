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

  if (isLoading)
    return <h1 className="text-2xl font-bold text-center mt-10">Loading...</h1>;
  if (err)
    return (
      <h1 className="text-2xl font-bold text-center mt-10 text-red-500">
        Error:{err.message}
      </h1>
    );

  return (
    <div className="max-w-4xl mx-auto mt-2 text-slate-300 ">
      <h3 className="text-4xl mb-6">Topics</h3>

      <ul className="space-y-4">
        {topics.map((topic) => (
          <Link to={`/topics/${topic.slug}`} key={topic.slug}>
            <li
              key={topic.slug}
              className="bg-slate-600 shadow-md rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105  hover:bg-rose-600 mb-6"
            >
              <span className="font-bold text-xl">{topic.slug}</span>
              <p> Description: {topic.description}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
