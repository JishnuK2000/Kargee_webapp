import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Star, ArrowRight } from "lucide-react";

import p1 from "../../../assets/images/product1.jpg";
import Layout from "../../components/layout";

export default function ProductList() {
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    category: [] as string[],
    collection: [] as string[],
    size: [] as string[],
    price: [999, 1999],
  });

  const products = Array(6).fill({
    name: "Ivory Breeze Co-ord Set",
    price: 1999,
    old: 2499,
    img1: p1,
    img2: p1,
  });

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const exists = prev[type].includes(value);
      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };

  const removeFilter = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.filter((v) => v !== value),
      collection: prev.collection.filter((v) => v !== value),
      size: prev.size.filter((v) => v !== value),
    }));
  };

  const clearAll = () => {
    setFilters({
      category: [],
      collection: [],
      size: [],
      price: [0, 5000],
    });
  };

  const activeFilters = [
    ...filters.category,
    ...filters.collection,
    ...filters.size,
    `₹${filters.price[0]} - ₹${filters.price[1]}`,
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <section className="min-h-screen pb-24 md:pb-0 font-[Inter]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-10">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-medium">All Products</h1>

            <select className="hidden md:block border px-4 py-2 text-base">
              <option>Default Sorting</option>
            </select>
          </div>

          {/* 🔥 ACTIVE FILTERS */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {activeFilters.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-1.5 text-sm bg-[#F5BD63] text-[#5E2A14] font-medium"
              >
                {f}
                {!f.includes("₹") && (
                  <span
                    className="cursor-pointer text-lg"
                    onClick={() => removeFilter(f)}
                  >
                    ×
                  </span>
                )}
              </div>
            ))}

            <button onClick={clearAll} className="text-sm underline ml-2">
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
            {/* 🔥 SIDEBAR */}
            <div className="hidden md:block space-y-8 text-base">
              {/* CATEGORY */}
              <div>
                <h3 className="font-medium mb-4 text-lg">Category</h3>
                {["Saree", "Co-ord Sets", "Kurtas", "Dupattas"].map((c) => (
                  <label key={c} className="block mb-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(c)}
                      onChange={() => toggleFilter("category", c)}
                      className="accent-[#5E2A14] w-4 h-4"
                    />
                    {c}
                  </label>
                ))}
              </div>

              {/* COLLECTION */}
              <div>
                <h3 className="font-medium mb-4 text-lg">Collection</h3>
                {["Summer", "Festive", "New Arrivals"].map((c) => (
                  <label key={c} className="block mb-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.collection.includes(c)}
                      onChange={() => toggleFilter("collection", c)}
                      className="accent-[#5E2A14] w-4 h-4"
                    />
                    {c}
                  </label>
                ))}
              </div>

              {/* PRICE */}
              <div>
                <h3 className="font-medium mb-4 text-lg">Price</h3>

                <p className="mb-3 text-sm">
                  ₹{filters.price[0]} — ₹{filters.price[1]}
                </p>

                <Slider
                  range
                  min={0}
                  max={5000}
                  value={filters.price}
                  onChange={(val) =>
                    setFilters((prev) => ({
                      ...prev,
                      price: val as number[],
                    }))
                  }
                  trackStyle={[{ backgroundColor: "#5E2A14" }]}
                  railStyle={{ backgroundColor: "#e5e5e5" }}
                  handleStyle={[
                    { borderColor: "#5E2A14", backgroundColor: "#5E2A14" },
                    { borderColor: "#5E2A14", backgroundColor: "#5E2A14" },
                  ]}
                />
              </div>

              {/* SIZE */}
              <div>
                <h3 className="font-medium mb-4 text-lg">Size</h3>
                {["S", "M", "L", "XL"].map((s) => (
                  <label key={s} className="block mb-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.size.includes(s)}
                      onChange={() => toggleFilter("size", s)}
                      className="accent-[#5E2A14] w-4 h-4"
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            {/* 🔥 PRODUCTS */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7"
            >
              {products.map((p, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="group"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden ">
                    <img
                      src={p.img1}
                      className="w-full object-cover transition duration-500 group-hover:opacity-0"
                    />
                    <img
                      src={p.img2}
                      className="w-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="mt-3 space-y-1">
                    {/* CATEGORY + RATING */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Co-ord Set</span>

                      <div className="flex items-center gap-1">
                        <Star
                          size={20}
                          className="text-yellow-500 fill-yellow-400 stroke-1"
                        />
                        <span className="text-[20px] text-gray-700">4.2</span>
                      </div>
                    </div>

                    {/* PRODUCT NAME */}
                    <p className="text-base md:text-lg font-medium">{p.name}</p>

                    {/* PRICE + ARROW */}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold text-[25px]">
                          ₹{p.price}
                        </span>
                        <span className="line-through text-gray-400 text-[18px]">
                          ₹{p.old}
                        </span>
                      </div>

                      {/* Arrow Icon */}
                      <ArrowRight
                        size={20}
                        className="text-gray-700 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 🔥 MOBILE BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex md:hidden text-base font-[Inter]">
          <button
            onClick={() => setShowFilter(true)}
            className="flex-1 py-4 text-center border-r"
          >
            Filter
          </button>
          <button className="flex-1 py-4 text-center">Sort</button>
        </div>

        {/* 🔥 FILTER DRAWER */}
        <AnimatePresence>
          {showFilter && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilter(false)}
              />

              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 font-[Inter]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
              >
                <h3 className="text-xl mb-4">Filters</h3>

                <div className="mb-6">
                  <p className="mb-2 text-sm">
                    ₹{filters.price[0]} — ₹{filters.price[1]}
                  </p>

                  <Slider
                    range
                    min={0}
                    max={5000}
                    value={filters.price}
                    onChange={(val) =>
                      setFilters((prev) => ({
                        ...prev,
                        price: val as number[],
                      }))
                    }
                    trackStyle={[{ backgroundColor: "#5E2A14" }]}
                    handleStyle={[
                      { borderColor: "#5E2A14", backgroundColor: "#5E2A14" },
                      { borderColor: "#5E2A14", backgroundColor: "#5E2A14" },
                    ]}
                  />
                </div>

                <button
                  className="w-full bg-[#5E2A14] text-white py-3 text-base"
                  onClick={() => setShowFilter(false)}
                >
                  Apply Filters
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  );
}
