import pic4 from "../../assets/images/pic4.jpg";
import pic5 from "../../assets/images/pic5.jpg";
import { motion } from "framer-motion";

export default function CategoryCards() {
  const categories = [
    {
      title: "The Art of Summer Dressing",
      image: pic4,
    },
    {
      title: "Soft Hues, Strong Statements",
      image: pic5,
    },
  ];

  return (
    <section className="py-6 md:py-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

          {categories.map((category, index) => {

            // 🔥 alternate slide direction
            const direction = index % 2 === 0 ? -100 : 100;

            return (
              <motion.div
                key={index}
                className="relative overflow-hidden group"
                initial={{ opacity: 0, x: direction }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true }}
              >

                {/* IMAGE */}
                <motion.div
                  className="overflow-hidden"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <motion.img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>

                {/* FLOATING CARD */}
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#F5F1ED] px-6 py-4 text-center shadow-lg w-[80%] md:w-[70%]"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                >
                  <h3 className="text-lg md:text-xl mb-3">
                    {category.title}
                  </h3>

                  <motion.button
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#5E2A14] text-white px-5 py-2 text-sm hover:bg-[#7a3a1f]"
                  >
                    View All
                  </motion.button>
                </motion.div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}