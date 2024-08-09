import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

const images = [
  {
    src: "../../pics/football3.jpg",
    alt: "football_img",
    link: "/topics/football",
    topic: "Football",
  },
  {
    src: "../../pics/coding2.jpg",
    alt: "coding_img",
    link: "/topics/coding",
    topic: "Coding",
  },
  {
    src: "../../pics/cooking.jpg",
    alt: "cooking_img",
    link: "/topics/cooking",
    topic: "Cooking",
  },
  {
    src: "../../pics/football3.jpg",
    alt: "football_img",
    link: "/topics/football",
    topic: "Football",
  },
  {
    src: "../../pics/coding2.jpg",
    alt: "coding_img",
    link: "/topics/coding",
    topic: "Coding",
  },
  {
    src: "../../pics/cooking.jpg",
    alt: "cooking_img",
    link: "/topics/cooking",
    topic: "Cooking",
  },
];

export default function HomeSlider() {
  return (
    <>
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
          autoplay={{ delay: 2000 }}
          loop
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="shadow-md overflow-hidden rounded">
                <Link to={image.link}>
                  <div className="text-slate-300 items-center flex flex-col justify-end absolute top-3 right-3">
                    <h3> {image.topic}</h3>
                  </div>

                  <img className="w-full" src={image.src} alt={image.alt} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
