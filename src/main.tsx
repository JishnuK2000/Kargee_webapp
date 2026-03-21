import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import { CartProvider } from "./context/cartContext.tsx";
import { ToastProvider } from "./context/toastContext.tsx";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ToastProvider>
  </React.StrictMode>,
);
