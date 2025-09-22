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
            <section className="flex flex-col gap-[30px] w-full items-center mt-[150px] mb-[50px]">
                {wishlist.map((component) => (
                    <div key={component.id} className="flex bg-gray-800 w-200 h-100 justify-evenly items-center rounded-[50px] font-bold border-[1px]">
                        <div className="relative flex flex-col h-full w-100 gap-[20px] justify-center">
                            <h2>{component.name}</h2>
                            <button className="text-center w-full absolute text-gray-500 underline cursor-pointer hover:text-white bottom-0 mb-[85px]"
                            onClick={() => handleRemoveProduct(component)}>Remove from wishlist</button>
                        </div>
                        <figure className="flex flex-col justify-center items-center">
                            <div className="h-[200px] w-[200px] rounded-t-[20px] bg-white overflow-hidden flex justify-center items-center">
                                <img src={component.image_url} className="max-w-full max-h-full object-contain"/>
                            </div>
                            <div className="flex h-[30px]">
                                <figcaption className="bg-blue-500 w-[100px] flex justify-center items-center rounded-bl-[20px]">
                                    <p className="font-bold text-white">${component.price}</p>
                                </figcaption>
                                <button className="flex items-center justify-center gap-[5px] bg-gray-700 w-[100px] cursor-pointer hover:invert rounded-br-[20px]" onClick={() => handleCartProducts({ ...component, count: 1 })}>
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