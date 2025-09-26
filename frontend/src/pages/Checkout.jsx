import { useEffect, useState, useMemo } from "react"
import Header from "../components/Header";

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart_data")) || [];
    setCart(storedCart);
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.count, 0),
    [cart]
  );
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.count * item.price, 0),
    [cart]
  );

  function handleAddProduct(component) {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const index = updatedCart.findIndex(item => item.id === component.id);

      if (index !== -1) {
        updatedCart[index] = {
          ...updatedCart[index],
          count: updatedCart[index].count + 1,
        };
      } else {
        updatedCart.push({ ...component, count: 1 });
      }

      localStorage.setItem("cart_data", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  function handleRemoveProduct(component) {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const index = updatedCart.findIndex(item => item.id === component.id);
      if (index === -1) return prevCart;

      const updatedItem = { ...updatedCart[index], count: updatedCart[index].count - 1 };

      if (updatedItem.count <= 0) {
        updatedCart.splice(index, 1);
      } else {
        updatedCart[index] = updatedItem;
      }

      localStorage.setItem("cart_data", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <section className="flex flex-col items-center gap-5 mt-40 mb-30">
        {cart.map((component) => (
          <div key={component.id} className="flex bg-gray-800 h-50 w-screen justify-evenly items-center rounded-3xl font-bold border-1 md:w-150 md:h-70 xl:w-200 xl:h-80">
            <div className="h-full w-50 flex flex-col justify-center items-center md:w-70">
              <div className="flex flex-col items-center gap-5">
                <div>
                  <a href={`/component/${component.id}`} className="font-bold line-clamp-3 md:line-clamp-4 hover:underline">{component.name}</a>
                </div>
                <div className="flex gap-5 rounded-full bg-gray-700 justify-center w-30">
                  <button onClick={() => handleRemoveProduct(component)} className="w-5 font-bold cursor-pointer">-</button>
                  <p>{component.count}</p>
                  <button onClick={() => handleAddProduct(component)} className="w-5 font-bold cursor-pointer">+</button>
                </div>
              </div>
            </div>
            <figure className="flex flex-col justify-center items-center">
              <div className="h-30 w-30 rounded-t-3xl bg-white overflow-hidden flex justify-center items-center md:h-40 md:w-40 xl:h-50 xl:w-50">
                <img src={component.image_url} className="max-w-full max-h-full object-contain"/>
              </div>
              <figcaption className="rounded-b-3xl bg-blue-500 w-30 flex justify-center md:w-40 xl:w-50">
                <p className="font-bold text-white">${component.price}</p>
              </figcaption>
            </figure>
          </div>
        ))}
        <div className="fixed bottom-[50px] font-bold bg-gray-800 rounded-full w-[400px] text-center border-[1px] text-[20px]">
          <p>Subtotal: ${subtotal}</p>
        </div>
      </section>
    </>
  )
}
