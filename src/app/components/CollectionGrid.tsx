import { useNavigate } from "react-router-dom";
import pic1 from "../../assets/images/pic1.jpg";
import pic2 from "../../assets/images/pic2.jpg";
import pic3 from "../../assets/images/pic3.jpg";
import { motion } from "framer-motion";

export default function CollectionGrid() {
const navigate=useNavigate()
  // 🔥 Text stagger
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // 🔥 Image animation
  const image = {
    hidden: { opacity: 0, scale: 1.1 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section className="py-6 md:py-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* IMAGE GRID */}
          <motion.div
            className="order-1 md:order-2 grid grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            
            {/* BIG IMAGE */}
            <motion.div
              variants={image}
              className="col-span-1 row-span-2 h-[400px] md:h-[600px] overflow-hidden"
            >
              <motion.img
                src={pic1}
                alt="Collection 1"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {/* TOP RIGHT */}
            <motion.div
              variants={image}
              className="h-[190px] md:h-[290px] overflow-hidden"
            >
              <motion.img
                src={pic2}
                alt="Collection 2"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {/* BOTTOM RIGHT */}
            <motion.div
              variants={image}
              className="h-[190px] md:h-[290px] overflow-hidden"
            >
              <motion.img
                src={pic3}
                alt="Collection 3"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

          </motion.div>

          {/* CONTENT */}
          <motion.div
            className="order-2 md:order-1"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >

            <motion.h2
              variants={item}
              className="text-3xl md:text-4xl font-semibold mb-4"
            >
              Kargee Collections
            </motion.h2>

            <motion.h1
              variants={item}
              className="text-3xl md:text-4xl font-semibold mb-4"
            >
              Where Timeless Tradition Meets Modern Grace in Every Beautifully Crafted Outfit
            </motion.h1>

            <motion.p
              variants={item}
              className="text-gray-700 mb-6"
            >
              Step into the spotlight with this stunning mirror-work coord set
              that beautifully blends tradition with modern elegance. Crafted
              with intricate mirror detailing and graceful design, it offers the
              perfect balance of festive glamour, effortless comfort, and
              timeless sophistication for every celebration.
            </motion.p>

            <motion.button
              variants={item}
               onClick={() => navigate("/products")}
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-[#5E2A14] text-white px-6 py-3 w-fit hover:bg-[#7a3a1f]"
            >
              Explore Collections
            </motion.button>

          </motion.div>

        </div>
      </div>
    </section>
  );
}