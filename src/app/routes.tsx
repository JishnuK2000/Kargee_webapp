import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductList from "./pages/ProductList/ProductList";
import ProductDetail from "./pages/ProductList/ProductDetail"; // make sure path is correct
import Checkout from "./pages/Checkout/Checkout";
import Cart from "./pages/Cart/Cart";
import ProfilePage from "./pages/Profile/userProfile";
import ProtectedRoute from "../routes/protectedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/:id", // dynamic route
    element: <ProductDetail />,
  },
  {
    path: "/cart", // dynamic route
    element: <Cart />,
  },
  {
    path: "cart/checkout", // dynamic route
    element: <ProtectedRoute><Checkout /></ProtectedRoute>,
  },
  {
    path: "/checkout", // dynamic route
    element: <ProtectedRoute><Checkout /></ProtectedRoute>,
  },
  {
    path: "/profile", // dynamic route
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
]);
