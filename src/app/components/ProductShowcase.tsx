import pic7 from "../../assets/images/pic7.jpg";
import pic8 from "../../assets/images/pic8.jpg";
import pic9 from "../../assets/images/pic9.jpg";
import pic10 from "../../assets/images/pic10.jpg";
import { motion, useMotionValue, useTransform } from "framer-motion";

function ParallaxImage({ src, alt }) {
  // 🧲 mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 🎯 transform movement (parallax)
  const rotateX = useTransform(y, [-50, 50], [6, -6]);
  const rotateY = useTransform(x, [-50, 50], [-6, 6]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 100;
    const yPct = (mouseY / height - 0.5) * 100;

    x.set(xPct);
    y.set(yPct);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY }}
      className="w-full h-full"
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

export default function ProductShowcase() {
  return (
    <section className="py-6 md:py-20 overflow-hidden">
      <div className=" max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* TEXT */}
        <div className="mb-10 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold mb-4"
          >
            Crafted in Every Detail
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-xl text-sm md:text-base"
          >
            From statement silhouettes to intricate textures, every element of this ensemble is designed to shine.
          </motion.p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">

          {/* LEFT IMAGE */}
          <div className="h-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ParallaxImage src={pic7} alt="Main Product" />
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-4 md:gap-6 h-full">

            {/* TOP ROW */}
            <div className="flex gap-4 md:gap-6 flex-1">

              <motion.div
                className="flex-1 overflow-hidden"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
              >
                <ParallaxImage src={pic8} alt="Detail 1" />
              </motion.div>

              <motion.div
                className="flex-1 overflow-hidden"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <ParallaxImage src={pic9} alt="Detail 2" />
              </motion.div>

            </div>

            {/* BOTTOM */}
            <motion.div
              className="flex-1 overflow-hidden"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1 }}
              viewport={{ once: true }}
            >
              <ParallaxImage src={pic10} alt="Detail 3" />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}