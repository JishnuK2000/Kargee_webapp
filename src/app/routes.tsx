import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductList from "./pages/ProductList/ProductList";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, 
  }, {
    path: "/products",
    element: <ProductList />,
  },
]);