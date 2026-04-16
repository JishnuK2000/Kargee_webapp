"use client";

import { motion } from "framer-motion";
import model from "../../assets/images/model.jpeg";
import model1 from "../../assets/images/model1.jpeg";

export default function ModelShowcase() {
  return (
    <section className="relative w-full py-20 bg-[#fbfbfb] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* BACKGROUND TEXT */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <motion.h2
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 0.02 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-[25vw] font-bold text-black whitespace-nowrap leading-none"
            >
              COLLECTION
            </motion.h2>
          </div>

          {/* TEXT CONTENT - LEFT SIDE */}
          <div className="lg:col-span-5 z-10 space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#5E2A14]" />
                <span className="text-sm font-semibold tracking-[0.4em] text-[#5E2A14] uppercase">
                  Statement Pieces
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
                The New <br />
                <span className="italic font-serif text-[#5E2A14]">
                  Standard
                </span>
              </h1>
              <p className="text-gray-600 text-lg max-w-md leading-relaxed">
                Discover the synergy of two iconic styles. Our latest showcase brings together our most celebrated designs, crafted for those who demand excellence in every stitch.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 pt-4"
            >
              <button className="px-10 py-4 bg-[#5E2A14] text-white rounded-full font-semibold hover:bg-[#4a2110] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#5e2a1422]">
                Shop The Look
              </button>
              <button className="px-10 py-4 border-2 border-gray-200 text-gray-900 rounded-full font-semibold hover:border-[#5E2A14] hover:text-[#5E2A14] transition-all transform hover:scale-105 active:scale-95">
                Explore Details
              </button>
            </motion.div>
          </div>

          {/* IMAGE CONTENT - RIGHT SIDE (Dual Image Layout) */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[700px]">

              {/* IMAGE 1 - BACKER/OFFSET */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: -50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1 }}
                viewport={{ once: true }}
                className="absolute right-0 top-0 w-3/5 aspect-[3/4] z-10"
              >
                <div className="w-full h-full  overflow-hidden shadow-2xl border-8 border-white">
                  <img
                    src={model}
                    alt="Model Showcase 1"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* IMAGE 2 - FOREGROUND/OVERLAP */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute left-0 bottom-0 w-3/5 aspect-[3/4] z-20"
              >
                <div className="w-full h-full  overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white">
                  <img
                    src={model1}
                    alt="Model Showcase 2"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* FLOATING TAG */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 bottom-12 bg-white px-6 py-4 rounded-2xl shadow-2xl z-30"
                >
                  <p className="text-[#5E2A14] font-bold text-lg leading-none">Premium</p>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Quality Guaranteed</p>
                </motion.div>
              </motion.div>

              {/* DECORATIVE BACKGROUND SHAPES */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#5E2A1408] rounded-full blur-3xl -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

