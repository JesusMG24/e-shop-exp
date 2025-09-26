import { useEffect, useMemo, useState, useCallback } from "react"
import Header from "../components/Header";

export default function Wishlist() {
    
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist_data")) || [];
        const storedCart = JSON.parse(localStorage.getItem("cart_data")) || [];
        setWishlist(storedWishlist);
        setCart(storedCart);
    }, []);

    let cartCount = useMemo(
        () => cart.reduce((sum, item) => sum + item.count, 0),
        [cart]
    );

    function handleCartProducts(component) {
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
        setWishlist((prevWishlist) => {
            const updatedWishlist = [...prevWishlist];
            const index = updatedWishlist.findIndex(item => item.id === component.id);

            updatedWishlist.splice(index, 1);

            localStorage.setItem("wishlist_data", JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    };

    function handleRemoveProduct(component) {
        setWishlist((prevWishlist) => {
            const updatedWishlist = [...prevWishlist];
            const index = updatedWishlist.findIndex(item => item.id === component.id);

            updatedWishlist.splice(index, 1);

            localStorage.setItem("wishlist_data", JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    };
    
    return (
        <>
            <Header cartCount={cartCount}/>
            <section className="flex flex-col gap-5 w-screen items-center mt-40 mb-20">
                {wishlist.map((component) => (
                    <div key={component.id} className="flex bg-gray-800 w-full h-50 justify-evenly items-center rounded-[50px] font-bold border-[1px] md:h-70 md:w-150 xl:h-90 xl:w-200">
                        <div className="relative flex flex-col h-full w-50 gap-[20px] justify-center xl:w-80">
                            <h2 className="line-clamp-2 absolute top-17 hover:underline md:top-22 md:line-clamp-3 xl:line-clamp-4 xl:top-26">
                                <a href={`/component/${component.id}`}>{component.name}</a>
                            </h2>
                            <button className="text-center w-full absolute text-gray-500 underline cursor-pointer hover:text-white bottom-7 md:bottom-15 xl:bottom-20"
                            onClick={() => handleRemoveProduct(component)}>Remove from wishlist</button>
                        </div>
                        <figure className="flex flex-col justify-center items-center">
                            <div className="h-25 w-30 rounded-t-[20px] bg-white overflow-hidden flex justify-center items-center md:h-45 md:w-50 xl:h-55 xl:w-60">
                                <img src={component.image_url} className="max-w-full max-h-full object-contain"/>
                            </div>
                            <div className="flex flex-col h-10 w-full md:flex-row xl:h-8">
                                <figcaption className="bg-blue-500 w-full flex justify-center items-center md:rounded-bl-[20px]">
                                    <p className="font-bold text-white">${component.price}</p>
                                </figcaption>
                                <button className="flex items-center justify-center gap-[5px] bg-gray-700 w-full cursor-pointer hover:invert rounded-bl-[20px] rounded-br-[20px] md:rounded-bl-none" onClick={() => handleCartProducts({ ...component, count: 1 })}>
                                    <p>Add</p>
                                    <img src="/src/assets/shopping-cart.png" className="h-[18px] w-[18px]"/>
                                </button>
                            </div>
                        </figure>
                    </div>
                ))}
            </section>
        </>
    )
}