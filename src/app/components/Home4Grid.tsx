import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface GridItem {
  _id: string;
  imageUrl: string;
  category: string;
  title: string;
  order: number;
}

const Home4Grid: React.FC = () => {
  const [items, setItems] = useState<GridItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchGridItems = async () => {
      try {
        const response = await fetch(`${API_URL}/home/4grid`);
        const data = await response.json();
        // Sort items by order if not already sorted
        const sortedData = data.sort((a: GridItem, b: GridItem) => a.order - b.order);
        setItems(sortedData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching home grid items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGridItems();
  }, [API_URL]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Luxury cubic-bezier
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const overlayVariants = {
    rest: { opacity: 0, y: 10 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-[#5E2A14] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden aspect-[4/3] md:aspect-[16/10]"
              onClick={() => navigate(`/products?category=${encodeURIComponent(item.category)}`)}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Image */}
              <motion.img
                src={item.imageUrl}
                alt={item.title}
                variants={imageVariants}
                className="w-full h-full object-cover"
              />

              {/* Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Content Overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
                variants={overlayVariants}
              >
                <p className="text-[#F5F1ED] text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-1 opacity-90">
                  {item.category}
                </p>
                <h3 className="text-white text-xl md:text-2xl font-serif leading-tight">
                  {item.title}
                </h3>
                <div className="mt-4 w-8 h-[1px] bg-white/50 group-hover:w-16 transition-all duration-500" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Home4Grid;
