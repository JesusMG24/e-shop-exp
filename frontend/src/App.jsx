import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./components/Header";
import api from "./api";
import Carousel from "./components/Carousel";

function App() {
  const [components, setComponents] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const getComponents = async () => {
    try {
      const response = await api.get("/components/");
      setComponents(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCartProducts = useCallback((productData) => {
    let cartData;
    try {
      cartData = JSON.parse(localStorage.getItem("cart_data"));
    } catch {
      cartData = [];
    }
    if (!Array.isArray(cartData)) cartData = [];

    const index = cartData.findIndex((item) => item.id === productData.id);
    if (index !== -1) cartData[index].count += productData.count;
    else cartData.push(productData);

    localStorage.setItem("cart_data", JSON.stringify(cartData));
    setCartCount(cartData.reduce((sum, item) => sum + item.count, 0));
  }, []);

  const handleWishlist = useCallback((productData) => {
    let wishlistData;
    try {
      wishlistData = JSON.parse(localStorage.getItem("wishlist_data"));
    } catch {
      wishlistData = [];
    }
    if (!Array.isArray(wishlistData)) wishlistData = [];

    const index = wishlistData.findIndex((item) => item.id === productData.id);
    if (index !== -1) wishlistData[index] = productData;
    else wishlistData.push(productData);

    localStorage.setItem("wishlist_data", JSON.stringify(wishlistData));
  }, []);

  useEffect(() => {
    getComponents();
    const cart = JSON.parse(localStorage.getItem("cart_data")) || [];
    setCartCount(cart.reduce((sum, item) => sum + item.count, 0));
  }, []);

  const categories = [
    "GPU",
    "CPU",
    "RAM",
    "Motherboard",
    "Computer Case",
    "Power Supply",
  ];

  const categorizedItems = useMemo(() => {
    return categories.map((category) => ({
      category,
      items: components.filter((c) => c.category === category)
    }));
  }, [components]);

  function pluralizeCategory(category) {
    if (category.endsWith("y")) {
      return category.slice(0, -1) + "ies";
    }
    return category + "s"
  }

  return (
    <>
      <Header cartCount={cartCount}/>
      <section className="mt-35 mb-10 flex flex-col gap-5">
        {categorizedItems.map(({ category, items }) => (
          <div key={category} className="h-120">
            <h2 className="font-bold text-4xl text-center">{pluralizeCategory(category)}</h2>
            <Carousel items={items} handleCartProducts={handleCartProducts} handleWishlist={handleWishlist}/>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
