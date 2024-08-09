import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import ArticlesList from "./AriclesList";
import HomeSlider from "./HomeSlider";

export default function Home() {
  return (
    <>
      <div>
        <HomeSlider />
      </div>
      <div className="mt-12 w-full">
        <ArticlesList />
      </div>
    </>
  );
}
