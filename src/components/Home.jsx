import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const images = [
  {
    src: "../../pics/football3.jpg",
    alt: "football_img",
    link: "/topics/football",
  },
  { src: "../../pics/coding2.jpg", alt: "coding_img", link: "/topics/cooking" },
  { src: "../../pics/cooking.jpg", alt: "cooking_img", link: "/topics/coding" },
  {
    src: "../../pics/football3.jpg",
    alt: "football_img",
    link: "/topics/football",
  },
  { src: "../../pics/coding2.jpg", alt: "coding_img", link: "/topics/cooking" },
  { src: "../../pics/cooking.jpg", alt: "cooking_img", link: "/topics/coding" },
];

export default function Home() {
  return (
    <div className="mt-8">
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Autoplay]}
        // spaceBetween={0}
        // slidesPerView={1}
        autoplay={{ delay: 2000 }}
        loop
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Link to={image.link}>
              <img className="w-full" src={image.src} alt={image.alt} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
