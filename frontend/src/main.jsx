import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./style.css"
import ProductForm from "./pages/ProductForm";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import ComponentPage from "./pages/ComponentPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/component/:id" element={<ComponentPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
