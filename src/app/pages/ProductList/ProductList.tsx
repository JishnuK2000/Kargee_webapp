import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import { productsData } from "../../../data/products"; // your new data import

export default function ProductList() {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false); // mobile sort drawer
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: [] as string[],
    collection: [] as string[],
    size: [] as string[],
    price: [0, 5000] as [number, number],
  });

  const [sort, setSort] = useState("default");

  // Toggle filters
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

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => {
        const matchCategory =
          filters.category.length === 0 ||
          filters.category.includes(p.category);
        const matchCollection =
          filters.collection.length === 0 ||
          filters.collection.includes(p.collection);
        const matchSize =
          filters.size.length === 0 ||
          p.sizes.some((s) => filters.size.includes(s));
        const matchPrice =
          p.discountPrice >= filters.price[0] &&
          p.discountPrice <= filters.price[1];

        return matchCategory && matchCollection && matchSize && matchPrice;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.discountPrice - b.discountPrice;
        if (sort === "price-desc") return b.discountPrice - a.discountPrice;
        if (sort === "newest")
          return (
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          );
        return 0;
      });
  }, [filters, sort]);

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
            <h1 className="text-2xl md:text-3xl font-medium font-[Inter]">
              All Products
            </h1>

            <select
              className="hidden md:block border px-4 py-2 text-base"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* ACTIVE FILTERS */}
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
            {/* SIDEBAR (DESKTOP) */}
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
                  trackStyle={[{ backgroundColor: "#5E2A14", height: 4 }]}
                  handleStyle={[
                    { borderColor: "#5E2A14", backgroundColor: "#fff" },
                    { borderColor: "#5E2A14", backgroundColor: "#fff" },
                  ]}
                  railStyle={{ backgroundColor: "#eee", height: 4 }}
                />
              </div>

              {/* SIZE */}
              <div>
                <h3 className="font-medium mb-4 text-lg">Size</h3>
                {["S", "M", "L", "XL", "Free Size"].map((s) => (
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

            {/* PRODUCTS */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7"
            >
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="group"
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  {/* IMAGE WRAPPER */}
                  <div className="relative overflow-hidden w-full">
                    {/* First image */}
                    <img
                      src={p.images[0]}
                      className="w-full object-cover transition duration-500 group-hover:opacity-0"
                    />
                    {/* Second image */}
                    <img
                      src={p.images[1]}
                      className="w-full object-cover absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 pointer-events-none"
                    />
                  </div>

                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{p.category}</span>

                      <div className="flex items-center gap-1">
                        <Star
                          size={18}
                          className="text-yellow-500 fill-yellow-400"
                        />
                        <span className="text-sm text-gray-700">4.2</span>
                      </div>
                    </div>

                    <p className="text-base md:text-lg font-medium">{p.name}</p>

                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg md:text-xl">
                          ₹{p.discountPrice}
                        </span>
                        <span className="line-through text-gray-400 text-sm">
                          ₹{p.price}
                        </span>
                      </div>

                      <ArrowRight
                        size={18}
                        className="text-gray-700 group-hover:translate-x-1 transition"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex md:hidden">
          <button
            onClick={() => setShowFilter(true)}
            className="flex-1 py-4 text-center border-r"
          >
            Filter
          </button>
          <button
            onClick={() => setShowSort(true)}
            className="flex-1 py-4 text-center"
          >
            Sort
          </button>
        </div>

        {/* MOBILE FILTER DRAWER */}
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
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
              >
                <h3 className="text-lg font-medium mb-4 font-[Inter]">
                  Filters
                </h3>

                {/* CATEGORY */}
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-medium">Category</h4>
                  {["Saree", "Co-ord Sets", "Kurtas", "Dupattas"].map((c) => (
                    <label key={c} className="flex gap-2 mb-2 text-sm">
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
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-medium">Collection</h4>
                  {["Summer", "Festive", "New Arrivals"].map((c) => (
                    <label key={c} className="flex gap-2 mb-2 text-sm">
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
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-medium">Price</h4>

                  <p className="text-xs text-gray-600 mb-2">
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
                    trackStyle={[{ backgroundColor: "#5E2A14", height: 4 }]}
                    handleStyle={[
                      { borderColor: "#5E2A14", backgroundColor: "#fff" },
                      { borderColor: "#5E2A14", backgroundColor: "#fff" },
                    ]}
                    railStyle={{ backgroundColor: "#eee", height: 4 }}
                  />
                </div>

                {/* SIZE */}
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-medium">Size</h4>
                  {["S", "M", "L", "XL", "Free Size"].map((s) => (
                    <label key={s} className="flex gap-2 mb-2 text-sm">
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

                {/* BUTTONS */}
                <div className="flex gap-3">
                  <button
                    onClick={clearAll}
                    className="flex-1 border py-3 text-sm"
                  >
                    Clear
                  </button>

                  <button
                    className="flex-1 bg-[#5E2A14] text-white py-3 text-sm"
                    onClick={() => setShowFilter(false)}
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            </>
          )}

          {/* MOBILE SORT DRAWER */}
          {showSort && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSort(false)}
              />

              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
              >
                <h3 className="text-lg font-medium mb-4 font-[Inter]">
                  Sort By
                </h3>
                <div className="flex flex-col gap-3">
                  <button
                    className={`py-3 text-left ${sort === "default" ? "font-semibold" : ""}`}
                    onClick={() => {
                      setSort("default");
                      setShowSort(false);
                    }}
                  >
                    Default Sorting
                  </button>
                  <button
                    className={`py-3 text-left ${sort === "price-asc" ? "font-semibold" : ""}`}
                    onClick={() => {
                      setSort("price-asc");
                      setShowSort(false);
                    }}
                  >
                    Price: Low to High
                  </button>
                  <button
                    className={`py-3 text-left ${sort === "price-desc" ? "font-semibold" : ""}`}
                    onClick={() => {
                      setSort("price-desc");
                      setShowSort(false);
                    }}
                  >
                    Price: High to Low
                  </button>
                  <button
                    className={`py-3 text-left ${sort === "newest" ? "font-semibold" : ""}`}
                    onClick={() => {
                      setSort("newest");
                      setShowSort(false);
                    }}
                  >
                    Newest Arrivals
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  );
}
