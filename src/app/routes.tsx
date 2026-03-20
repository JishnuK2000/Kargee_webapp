import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductList from "./pages/ProductList/ProductList";
import ProductDetail from "./pages/ProductList/ProductDetail"; // make sure path is correct

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
]);