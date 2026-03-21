import Layout from "../../components/layout";
import { useCart } from "../../../context/cartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Layout>
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-10 font-[Inter]">
        <h1 className="text-2xl md:text-3xl font-medium mb-8">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#5E2A14] text-white px-6 py-3 text-sm"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* LEFT - CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border p-4"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    className="w-24 h-24 object-cover"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="text-sm md:text-base font-medium">
                      {item.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center mt-3 border w-fit">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1"
                      >
                        -
                      </button>

                      <span className="px-4 text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500"
                    >
                      Remove
                    </button>

                    <p className="text-sm font-medium">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="border p-6 h-fit space-y-4">
              <h2 className="text-lg font-medium">Order Summary</h2>

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-medium">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#5E2A14] text-white py-3 text-sm mt-4"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </section>
    </Layout>
  );
}