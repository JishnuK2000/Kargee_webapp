import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout";
import { useCart } from "../../../context/cartContext";
import api from "../../../Services/apiService";
export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const isCartCheckout = window.location.pathname.includes("cart/checkout");

  // For cart checkout: read live from context (always up to date)
  // For single product checkout: read from navigation state
  const product = isCartCheckout ? cart : state?.product;

  const accessToken = localStorage.getItem("accessToken");

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [loadingPin, setLoadingPin] = useState(false);
  const [postOffices, setPostOffices] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  if (!product || (Array.isArray(product) && product.length === 0)) {
    return (
      <Layout>
        <p className="p-6 font-[Inter]">No product found in cart</p>
      </Layout>
    );
  }

  const validateStep1 = () => {
    const newErrors: any = {};
    if (!address.name) newErrors.name = "Name is required";
    if (!address.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^[6-9]\d{9}$/.test(address.phone)) {
      newErrors.phone = "Enter valid Indian mobile number";
    }
    if (!address.address) newErrors.address = "Address is required";
    if (!address.pincode || address.pincode.length !== 6)
      newErrors.pincode = "Valid pincode required";
    if (!address.city) newErrors.city = "Select location";
    if (!address.state) newErrors.state = "State required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchPincode = async (pin: string) => {
    try {
      setLoadingPin(true);
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      if (data[0].Status === "Success") {
        const offices = data[0].PostOffice;
        setPostOffices(offices);
        setAddress((prev) => ({
          ...prev,
          city: offices[0].Name,
          state: offices[0].State,
        }));
      } else {
        setPostOffices([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPin(false);
    }
  };

  // Build order products array (works for both cart and single product)
  const orderProducts = Array.isArray(product)
    ? product.map((p) => ({
      productId: p.id,
      name: p.name,
      price: p.price,
      discountPrice: p.discountPrice || p.price,
      quantity: p.quantity,
      image: p.image,
      size: p.size || "",
      color: p.color || "",
      // Keep cartItemId alongside for post-order cleanup
      cartItemId: p.cartItemId,
    }))
    : [
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice || product.price,
        quantity: product.quantity,
        image: product.image,
        size: product.size || "",
        color: product.color || "",
        cartItemId: product.cartItemId,
      },
    ];

  const totalAmount = orderProducts.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );

  // ✅ Remove every ordered item from cart using cartItemId
  // cartItemId is unique per row — correctly handles the same product
  // added twice with different size/color variants
  const clearOrderedItemsFromCart = async () => {
    if (!isCartCheckout) return;

    await Promise.allSettled(
      (product as any[]).map((item) => removeFromCart(item.cartItemId))
    );
  };

  const handleOrder = async () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    try {
      // Strip cartItemId before sending to backend
      const payload = orderProducts.map(({ cartItemId, ...rest }) => rest);

      await api.post(`/orders`, {
        products: payload,
        address,
        paymentMethod,
        totalAmount,
      });

      await clearOrderedItemsFromCart(); // ✅ clear only after confirmed
      alert("Order placed successfully!");
      navigate("/");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error placing order");
    }
  };

  return (
    <Layout>
      <section className="min-h-screen font-[Inter] bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-4">

          {/* STEP INDICATOR */}
          <div className="flex items-center justify-between mb-10">
            {["Address", "Payment", "Summary"].map((label, i) => (
              <div key={i} className="flex-1 text-center">
                <div
                  className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-semibold ${step >= i + 1 ? "bg-[#5E2A14] text-white" : "bg-gray-300"
                    }`}
                >
                  {i + 1}
                </div>
                <p className="text-xs mt-2">{label}</p>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* STEP 1: DELIVERY DETAILS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white p-6 rounded-2xl shadow-md space-y-4"
              >
                <h2 className="text-xl font-semibold">Delivery Details</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      placeholder="Full Name"
                      className="border p-3 rounded-lg w-full"
                      onChange={(e) =>
                        setAddress({ ...address, name: e.target.value })
                      }
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      placeholder="Phone"
                      className="border p-3 rounded-lg w-full"
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <textarea
                    placeholder="Full Address"
                    className="border p-3 rounded-lg w-full"
                    onChange={(e) =>
                      setAddress({ ...address, address: e.target.value })
                    }
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      placeholder="Pincode"
                      className="border p-3 rounded-lg w-full"
                      onChange={(e) => {
                        const pin = e.target.value;
                        setAddress({ ...address, pincode: pin });
                        if (pin.length === 6) fetchPincode(pin);
                      }}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>

                  <input
                    placeholder="State"
                    value={address.state}
                    className="border p-3 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                {loadingPin && (
                  <p className="text-sm text-gray-500">Fetching locations...</p>
                )}

                {postOffices.length > 0 && (
                  <div>
                    <select
                      className="border p-3 rounded-lg w-full"
                      value={address.city}
                      onChange={(e) => {
                        const selected = postOffices.find(
                          (p) => p.Name === e.target.value
                        );
                        setAddress({
                          ...address,
                          city: selected.Name,
                          state: selected.State,
                        });
                      }}
                    >
                      {postOffices
                        .filter((p) => p.DeliveryStatus === "Delivery")
                        .map((p, i) => (
                          <option key={i}>{p.Name}</option>
                        ))}
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                )}

                <button
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="w-full bg-[#5E2A14] text-white py-3 mt-4 hover:opacity-90"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white p-6 rounded-2xl shadow-md space-y-4"
              >
                <h2 className="text-xl font-semibold font-[Inter]">
                  Payment Method
                </h2>

                {["COD", "ONLINE"].map((method) => (
                  <div
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`border p-4 cursor-pointer rounded-xl transition ${paymentMethod === method
                        ? "border-[#5E2A14] bg-[#f8f3f0]"
                        : ""
                      }`}
                  >
                    {method === "COD" ? "Cash on Delivery" : "Online Payment"}
                  </div>
                ))}

                <button
                  onClick={() => setStep(3)}
                  className="w-full bg-[#5E2A14] text-white py-3 mt-4 rounded-xl"
                >
                  Review Order
                </button>
              </motion.div>
            )}

            {/* STEP 3: ORDER SUMMARY */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white p-6 rounded-2xl shadow-md space-y-6"
              >
                <h2 className="text-xl font-semibold font-[Inter]">
                  Order Summary
                </h2>

                {orderProducts.map((item, i) => (
                  <div key={i} className="flex gap-4 border p-4 rounded-xl">
                    <img
                      src={item.image}
                      className="w-20 h-20 rounded object-cover flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      {/* Size & Color badges */}
                      <div className="flex gap-2 flex-wrap">
                        {item.size && (
                          <span className="text-xs bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">
                            Size:{" "}
                            <span className="font-medium">{item.size}</span>
                          </span>
                        )}
                        {item.color && (
                          <span className="flex items-center gap-1 text-xs bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">
                            Color:
                            <span
                              className="inline-block w-3 h-3 rounded-full border border-gray-300 ml-1"
                              style={{
                                backgroundColor: item.color.toLowerCase(),
                              }}
                            />
                            <span className="font-medium capitalize">
                              {item.color}
                            </span>
                          </span>
                        )}
                      </div>

                      <p className="text-[#5E2A14] font-semibold">
                        ₹{(item.discountPrice || item.price) * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="border p-4 rounded-xl text-sm space-y-1">
                  <p>
                    <b>{address.name}</b>
                  </p>
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p>📞 {address.phone}</p>
                </div>

                <p className="text-right font-semibold text-lg">
                  Total: ₹{totalAmount}
                </p>

                <button
                  onClick={handleOrder}
                  className="w-full bg-green-600 text-white py-3 text-lg rounded-xl"
                >
                  Place Order
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}