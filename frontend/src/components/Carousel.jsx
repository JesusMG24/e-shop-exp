import { useRef, useEffect, useState } from "react";
import shoppingCart from "../assets/shopping-cart.png";

export default function Carousel({ items, handleCartProducts, handleWishlist }) {
  const carouselRef = useRef(null);
  const [clonedItems, setClonedItems] = useState([]);

  useEffect(() => {
    setClonedItems([...items, ...items, ...items]);
  }, [items]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    container.scrollLeft = container.scrollWidth / 3;
  }, []);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollAmount = 440;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      if (container.scrollLeft <= 0) {
        container.scrollLeft += container.scrollWidth / 3;
      } else if (container.scrollLeft >= (container.scrollWidth * 2) / 3) {
        container.scrollLeft -= container.scrollWidth / 3;
      }
    }, 300);
  };

  return (
    <section className="flex w-full gap-4 mb-24 text-center relative">
      <button className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white px-3 py-1 rounded cursor-pointer"
        onClick={() => scroll("left")}>
        ◀
      </button>

      <div ref={carouselRef} className="flex gap-10 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory">
        {clonedItems.map((component, index) => (
          <article key={index} className="h-[400px] w-[400px] flex flex-col bg-gray-600 flex-shrink-0 snap-center items-center justify-end overflow-hidden rounded-[30px]">
            <div className="w-full flex justify-end">
              <button className="bg-gray-800 rounded-full w-[30px] cursor-pointer hover:invert mt-[10px] mr-[10px] text-[20px]"
              onClick={() => handleWishlist(component)}>♡</button>
            </div>
            <figure className="h-[250px] w-[250px] flex items-center justify-center bg-white rounded-[30px] overflow-hidden mb-6">
              <img src={component.image_url} className="max-w-full max-h-full object-contain"/>
            </figure>
            <h2 className="w-full h-[48px] font-bold bg-gray-700 line-clamp-2">
              {component.name}
            </h2>
            <div className="grid grid-cols-2 w-full h-[40px] font-bold">
              <div className="flex items-center justify-center bg-gray-800 h-full">
                <p className="text-blue-500">${component.price}</p>
              </div>
              <button className="flex items-center justify-center gap-2 bg-gray-900 h-full hover:invert cursor-pointer"
                onClick={() =>
                  handleCartProducts({ ...component, count: 1 })
                }>
                <p>Add</p>
                <img src={shoppingCart} className="h-5 w-5"/>
              </button>
            </div>
          </article>
        ))}
      </div>

      <button className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white px-3 py-1 rounded cursor-pointer"
        onClick={() => scroll("right")}>
        ▶
      </button>
    </section>
  );
}
