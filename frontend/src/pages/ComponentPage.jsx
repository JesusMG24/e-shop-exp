import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Header from "../components/Header";
import shoppingCart from "../assets/shopping-cart.png";

export default function ComponentPage() {
    const { id } = useParams();
    const [component, setComponent] = useState(null);
    const [cart, setCart] = useState([]);

    const getComponent = async (id) => {
        const res = await api.get(`/component/${id}/`);
        return res.data;
    };

    const cartCount = useMemo(
        () => cart.reduce((sum, item) => sum + item.count, 0),
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
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart_data")) || [];
        setCart(storedCart);

        if (id) {
            getComponent(id)
            .then(setComponent)
            .catch(console.error);
        }
    }, [id]);

    if (!component) 
        return (
            <>
                <Header cartCount={cartCount} />
                <p className="w-screen text-center text-2xl font-bold absolute top-1/2">Loading...</p>
            </>
    );

    return (
        <>
            <Header cartCount={cartCount} />
            <section className="mt-40 flex flex-col w-screen items-center text-xl md:mt-60 lg:mt-40">
                <figure className="overflow-hidden bg-white w-[80vw] flex justify-center aspect-square rounded-3xl md:w-[50vw] lg:w-100">
                    <img src={component.image_url} className="max-w-full max-h-full object-contain"></img>
                </figure>
                <h1 className="w-screen line-clamp-2 bg-gray-700 font-bold mt-10 h-15 md:w-[60vw] md:rounded-t-2xl md:pl-5 md:pr-5 lg:w-150">{component.name}</h1>
                <div className="w-screen flex text-center font-bold h-10 md:w-[60vw] md:rounded-b-2xl md:overflow-hidden lg:w-150">
                    <div className="w-1/2 bg-blue-500 flex items-center justify-center">
                        <p>${component.price}</p>
                    </div>
                    <button className="w-1/2 flex items-center justify-center gap-2 bg-gray-800 hover:invert cursor-pointer" 
                    onClick={() => handleAddProduct(component)}>
                        <p>Add</p>
                        <img src={shoppingCart} className="w-5"></img>
                    </button>
                </div>
                <ul className="bg-gray-700 w-[90vw] mt-8 rounded-3xl p-2 flex flex-col gap-1 border-1 list-disc list-inside text-base lg:w-200">
                    <li><span className="font-bold">Brand:</span> {component.brand}</li>
                    <li><span className="font-bold">Category:</span> {component.category}</li>
                    <li><span className="font-bold">Published at:</span> {component.created_at}</li>
                    <li><span className="font-bold">Original Source:</span> <a href={component.source_url}>{component.source_url}</a></li>
                </ul>
            </section>
        </>
    )
}