import { createContext, useContext, useState, useEffect } from "react";
import {
  getCartAPI,
  addToCartAPI,
  updateCartAPI,
  removeCartAPI,
} from "../Services/cartService";

// ✅ cartItemId = MongoDB subdocument _id (unique per cart row)
// ✅ id         = productId (same product can appear multiple times with diff size/color)
interface CartItem {
  cartItemId: string;
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "cartItemId">) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, qty: number) => Promise<void>;
  loading: boolean;
}

// Guest-only: generate a unique key per cart entry
const generateCartItemId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// Normalize backend cart item → frontend CartItem
const formatItem = (item: any): CartItem => ({
  cartItemId: item._id,            // subdoc _id — unique per row
  id: item.productId?.toString(),  // actual product reference
  name: item.name,
  price: item.price,
  image: item.image,
  quantity: item.quantity,
  size: item.size || "",
  color: item.color || "",
});

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [user] = useState<any>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // Load cart on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (user && accessToken) {
          const res = await getCartAPI();
          setCart(res.data.map(formatItem));
        } else {
          const saved = localStorage.getItem("cart");
          setCart(saved ? JSON.parse(saved) : []);
        }
      } catch (err) {
        console.error("loadCart error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user, accessToken]);

  // Persist guest cart to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  // ➕ Add to cart
  const addToCart = async (item: Omit<CartItem, "cartItemId">) => {

    if (user && accessToken) {
      try {
        // Backend handles merging (same productId + size + color → qty++)
        // Always sync from response so cartItemId stays accurate
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        const res = await addToCartAPI(
          {
            productId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          }
        );
        setCart(res.data.map(formatItem));
      } catch (err) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.error("addToCart error:", err);
      }
    } else {
      // Guest: merge locally by productId + size + color
      setCart((prev) => {
        const existing = prev.find(
          (p) =>
            p.id === item.id &&
            p.size === item.size &&
            p.color === item.color
        );

        if (existing) {
          return prev.map((p) =>
            p.cartItemId === existing.cartItemId
              ? { ...p, quantity: p.quantity + item.quantity }
              : p
          );
        }

        return [...prev, { ...item, cartItemId: generateCartItemId() }];
      });
    }
  };

  // ❌ Remove — cartItemId = MongoDB subdoc _id for logged-in, generated id for guest
  const removeFromCart = async (cartItemId: string) => {
    setCart((prev) => prev.filter((p) => p.cartItemId !== cartItemId));

    if (user && accessToken) {
      try {
        await removeCartAPI(cartItemId);
      } catch (err) {
        console.error("removeFromCart error:", err);
        // Rollback on failure
        const res = await getCartAPI();
        setCart(res.data.map(formatItem));
      }
    }
  };

  // 🔄 Update quantity
  const updateQuantity = async (cartItemId: string, qty: number) => {
    const newQty = Math.max(1, qty);

    setCart((prev) =>
      prev.map((p) =>
        p.cartItemId === cartItemId ? { ...p, quantity: newQty } : p
      )
    );

    if (user && accessToken) {
      try {
        await updateCartAPI(cartItemId, newQty);
      } catch (err) {
        console.error("updateQuantity error:", err);
        const res = await getCartAPI();
        setCart(res.data.map(formatItem));
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext)!;