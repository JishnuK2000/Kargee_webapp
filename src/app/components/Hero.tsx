import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// 👉 Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// 👉 Import images
import hero1 from "../../assets/images/hero1.jpg";
import hero2 from "../../assets/images/hero2.jpg";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import { useEffect, useState } from "react";

export default function HeroCarousel() {
  // const slides = [
  //   { id: 1, image: hero1 },
  //   { id: 2, image: hero2 },
  // ];
  // const Mobslides = [
  //   { id: 1, image: banner1 },
  //   { id: 2, image: banner2 },
  // ];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen(); // initial check
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const slides = [
    {
      id: 1,
      image: isMobile ? banner1 : hero1,
    },
    {
      id: 2,
      image: isMobile ? banner2 : hero2,
    },
  ];
  return (
    <section className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        className="custom-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full">
              <img
                src={slide.image}
                alt="banner"
                className="w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
