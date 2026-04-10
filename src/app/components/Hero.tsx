import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

// 👉 Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface CarouselItem {
  _id: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
  title?: string;
  link?: string;
  order: number;
}

export default function HeroCarousel() {
  const [slides, setSlides] = useState<CarouselItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const fetchCarousels = async () => {
      try {
        const response = await fetch(`${API_URL}/home/carousel`);
        if (!response.ok) throw new Error("Failed to fetch carousel images");
        const data = await response.json();
        // Sort by order manually just in case, though backend should do it
        const sortedData = data.sort((a: CarouselItem, b: CarouselItem) => a.order - b.order);
        setSlides(sortedData);
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      } finally {
        setLoading(false);
      }
    };

    checkScreen();
    fetchCarousels();
    
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [API_URL]);

  if (loading) {
    return (
      <section className="w-full bg-white">
        <div className="w-full aspect-[21/9] md:aspect-[21/7] bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#5E2A14] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) return null;

  return (
    <section className="w-full bg-white">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={slides.length > 1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="custom-swiper group"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="w-full relative overflow-hidden">
              <img
                src={isMobile ? slide.mobileImageUrl : slide.desktopImageUrl}
                alt={slide.title || "banner"}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
              {slide.title && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h2 className="text-white text-2xl md:text-4xl font-serif">
                      {slide.title}
                    </h2>
                 </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
