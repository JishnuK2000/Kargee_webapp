import hero2 from "../../assets/images/shimmer.png";
import { motion } from "framer-motion";

export default function BannerSection() {

  // 🔥 Container stagger
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  // 🔥 Text animation
  const textItem = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // 🔥 Image animation
  const imageVariant = {
    hidden: { scale: 1.2, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-6 md:py-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* IMAGE → FIRST IN MOBILE */}
          <motion.div
            className="order-1 lg:order-1 overflow-hidden"
            variants={imageVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.img
              src={hero2}
              alt="Fashion Collection"
              className="w-full object-cover shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* CONTENT → BELOW IMAGE IN MOBILE */}
          <motion.div
            className="space-y-6 text-center lg:text-left order-2 lg:order-2 mt-6 lg:mt-0"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >

            {/* TITLE */}
            <motion.h1
              variants={textItem}
              className="text-3xl md:text-4xl font-semibold "
            >
              Where Tradition
              <br />
              Meets Modern Style
            </motion.h1>

            {/* PARAGRAPH */}
            <motion.p
              variants={textItem}
              className="text-gray-600 text-base md:text-lg leading-relaxed mx-auto lg:mx-0"
            >
              Experience the perfect harmony of timeless craftsmanship and contemporary design. 
              Each piece is thoughtfully curated to bring you closer to your cultural roots while 
              embracing modern aesthetics.
            </motion.p>

            {/* BUTTON */}
            <motion.div variants={textItem}>
              <motion.button
                className="bg-[#5E2A14] text-white px-8 py-3 hover:bg-[#4A2110] shadow-lg"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Explore More
              </motion.button>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}