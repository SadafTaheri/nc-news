import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleContext } from "../App";
import baseApi from "../../api";
import Comments from "./Comments";
import Home from "./Home";
import HomeSlider from "./HomeSlider";
import { Link } from "react-router-dom";
import TopicCard from "./TopicCard";

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

  if (isLoading)
    return <h1 className="text-2xl font-bold text-center mt-10">Loading...</h1>;
  if (err)
    return (
      <div className="flex items-center flex-col min-h-60 mt-20 h-screen">
        <h1 style={{ fontSize: "50px", color: "red" }}>
          404 - Article Not Found
        </h1>
        <p className="text-lg mt-10 text-slate-300">
          Sorry this article does not exist.
        </p>
        <Link to="/articles" className="underline text-blue-500 mt-4">
          Go to Articles
        </Link>
      </div>
    );

  return (
    <div>
      <div
        style={{ border: "1px solid white" }}
        className="flex flex-col items-center text-slate-300"
      >
        <h3 className="text-slate-300 mt-3 text-3xl mb-3">{article.title}</h3>
        <h4 className="text-rose-600">Article's Topic: {article.topic}</h4>
        <img
          src={article.article_img_url}
          alt="Halal_food_pic"
          className="mt-4 ml-8 mr-8 mb-2 h-auto w-10/12"
        />

        <p
          className="mb-8 text-rose-600"
          style={{ fontSize: "11px", fontWeight: "bold" }}
        >
          Author: {article.author} __ Date: {article.created_at}
        </p>
        <div className="w-10/12 mb-6">
          <p className="text-justify">{article.body}</p>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center mt-3">
          <p>
            <span className="text-rose-600 text-xl">Vote to</span>{" "}
            {article.title}{" "}
            <span className="text-rose-600 text-xl"> here:</span>
          </p>
          <button
            onClick={() => updateVoting(1)}
            className="bg-green-500 py-1 px-2 rounded-lg mt-2"
          >
            +1
          </button>
          <h4 className="text-slate-200 mt-2 mb-2 text-xl">Votes: {vote} </h4>
          <button
            onClick={() => updateVoting(-1)}
            className="bg-red-500 py-1 px-2 rounded-lg"
          >
            - 1
          </button>
          <a href="#comments" className="text-blue-500 underline mt-2 text-l">
            Go to Comments
          </a>
        </div>
        <HomeSlider />

        <div id="comments">
          <Comments />
        </div>
      </div>
    </div>
  );
}
