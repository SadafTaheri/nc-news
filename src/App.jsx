import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import ArticlesList from "./components/AriclesList";
import Topics from "./components/Topicts";
import Login from "./components/Login";
import Header from "./components/Header";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import baseApi from "../api";
import SingleArticle from "./components/SingleArticle";

export const ArticleContext = createContext();

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    baseApi
      .get("/articles")
      .then((res) => {
        setArticles(res.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <ArticleContext.Provider value={{ articles, isLoading }}>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles/:articleId" element={<SingleArticle />} />
        </Routes>
        <Footer />
      </ArticleContext.Provider>
    </div>
  );
}

export default App;
