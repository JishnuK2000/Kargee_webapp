import { Star } from "lucide-react";
// import { reviews } from "../data/products";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0)
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API}/reviews`);
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // 🔁 Auto slide
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5E2A14]"></div>
      </div>
    );
  }

  if (reviews.length === 0) return null;

  const review = reviews[index];
  const initial = review.user?.name ? review.user.name.charAt(0).toUpperCase() : "U";
  const name = review.user?.name || "Verified Customer";

  return (
    <section className="py-6 md:py-20 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-[#5E2A14]">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg">
            Loved and trusted by thousands of fashion enthusiasts
          </p>
        </div>

        {/* REVIEW CARD */}
        <div className="relative h-[260px] md:h-[280px] flex items-center justify-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={review._id || review.id}
              initial={{ opacity: 0, scale: 0.9, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, y: -50, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute w-full bg-[#FAF8F5] p-6 md:p-8 rounded-2xl shadow-xl"
            >
              {/* USER */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg bg-[#5E2A14]">
                  {initial}
                </div>

                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">
                    {name}
                  </h4>

                  {/* STARS */}
                  <div className="flex items-center mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* COMMENT */}
              <p className="text-gray-600 leading-relaxed">
                {review.reviewText || review.comment}
              </p>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* DOTS */}
        <div className="flex justify-center mt-6 gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? "bg-[#5E2A14] w-5" : "bg-gray-300"
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}