import { Award, Shield, Truck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Handcrafted with finest fabrics",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick & safe delivery",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "7-day return policy",
    },
  ];

  // Container animation
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Item animation
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-6 md:py-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="grid grid-cols-4 gap-4 md:gap-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center text-center space-y-2 md:space-y-3 group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              
              {/* ICON */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <feature.icon className="w-6 h-6 md:w-12 md:h-12 text-[#5E2A14] stroke-[1.3]" />
              </motion.div>

              {/* TEXT */}
              <div>
                <h3 className="text-[10px] md:text-base font-medium text-[#5E2A14] font-[Inter]">
                  {feature.title}
                </h3>

                <p className="text-gray-500 text-[9px] md:text-sm mt-1 leading-tight">
                  {feature.description}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}