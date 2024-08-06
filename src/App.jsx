import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import ArticlesList from "./components/AriclesList";
import Topics from "./components/Topicts";
import Login from "./components/Login";
import Header from "./components/Header";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
