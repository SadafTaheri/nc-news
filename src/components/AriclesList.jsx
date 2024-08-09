import { useContext, useEffect, useState } from "react";
import { ArticleContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

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

  if (isLoading)
    return <h1 className="text-2xl font-bold text-center mt-10">Loading...</h1>;
  if (err)
    return (
      <h1 className="text-2xl font-bold text-center mt-10 text-red-500">
        Error:{err.message}
      </h1>
    );

  if (isLoading)
    return <h1 className="text-2xl font-bold text-center mt-10">Loading...</h1>;
  if (err)
    return (
      <h1 className="text-2xl font-bold text-center mt-10 text-red-500">
        Error:{err.message}
      </h1>
    );

  return (
    <>
      <div>
        <h1 className=" text-4xl text-slate-300 mb-4 ">Articles</h1>
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <label className="text-slate-400 text-2xl" id="sort-by">
              Sort By:
            </label>

            <select
              id="sort-by"
              value={sort_by}
              onChange={handleSortChange}
              className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="created_at">Date</option>
              <option value="comment_count">Comment Count</option>
              <option value="votes">Votes</option>
            </select>

            <button
              onClick={handleOrderChange}
              className="px-4 py-2 text-white bg-rose-600 rounded-md hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {order === "asc" ? "High to Low" : "Low to High"}
            </button>
          </div>
        </div>
        <div className="mt-8">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
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
              {articles.map((article) => (
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
          )}
        </div>
        <div>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {articles.map((article) => (
                <div
                  key={article.article_id}
                  className="bg-gray-600 p-4 rounded-lg shadow-md flex flex-col items-stretch"
                >
                  <div className="h-14">
                    <h3
                      className="text-xl font-semibold "
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

                  <div className="h-56 ">
                    <h6 className="text-sm text-gray-200">
                      Topic: {article.topic}
                    </h6>
                    <img
                      src={article.article_img_url}
                      alt="article_img"
                      className="w-full h-auto mt-2 rounded"
                    />
                  </div>

                  <h6 className="text-sm text-gray-300 mt-2">
                    Date: {article.created_at}
                  </h6>
                  <button
                    className="mt-2 bg-gray-700 text-white py-1 px-3 rounded"
                    onClick={() => handleClickReadMore(article.article_id)}
                  >
                    Read more
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
