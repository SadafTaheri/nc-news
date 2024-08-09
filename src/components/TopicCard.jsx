import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function TopicCard() {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const topic = slug;
  // const [topicNotFound, setTopicNotFound] = useState(false);

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
  }, [topic]);

  const handleClickReadMore = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  if (isLoading)
    return <h1 className="text-2xl font-bold text-center mt-10">Loading...</h1>;
  if (err)
    return (
      <h1 className="text-2xl font-bold text-center mt-10 text-red-500">
        Error:{err.message}
      </h1>
    );

  return (
    <div>
      <div>
        <h1 className="text-rose-500 text-xl mt-4 mb-4 uppercase">
          Topic: {topic}
        </h1>
      </div>

      <div className="mt-8">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          loop
          spaceBetween={20}
        >
          {articles
            .filter((article) => article.topic === topic)
            .map((article) => (
              <SwiperSlide key={article.article_id}>
                <div className=" p-4 rounded-lg shadow-md  border-2 border-slate-500 mb-6 flex flex-col">
                  <div className="h-14">
                    <h3
                      className="text-xl font-semibold"
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.2",
                      }}
                    >
                      {article.title}
                    </h3>
                  </div>

                  <h6 className="text-sm text-gray-400">
                    Topic: {article.topic}
                  </h6>
                  <img
                    src={article.article_img_url}
                    alt="article_img"
                    className="w-full h-auto mt-2 rounded"
                  />
                  <h6 className="text-sm text-gray-400 mt-3">
                    Date: {article.created_at}
                  </h6>
                  <h6 className="text-sm text-gray-400">
                    Comments Count: {article.comment_count}
                  </h6>
                  <h6 className="text-sm text-gray-400">
                    Votes: {article.votes}
                  </h6>

                  <button
                    className="mt-2 bg-rose-700 text-white py-1 px-3 rounded"
                    onClick={() => handleClickReadMore(article.article_id)}
                  >
                    Read more
                  </button>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className="flex flex-col items-center">
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
                  className="flex flex-col items-center text-slate-300 w-full h-100"
                >
                  <h3 className="text-xl mb-5">{article.title}</h3>
                  <h6 className="text-sm mb-3">Topic: {article.topic}</h6>
                  <img
                    src={article.article_img_url}
                    alt="article_img"
                    // style={{ width: "80%", height: "80%" }}
                    className="h-auto"
                  />
                  <h6 className="mt-3">Date: {article.created_at}</h6>
                  <button
                    className="bg-rose-500 rounded-md p-1 hover:bg-rose-400 mt-4"
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
    </div>
  );
}
