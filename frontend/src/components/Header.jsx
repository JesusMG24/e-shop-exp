import Login from "./Login"
import Register from "./Register";
import { useState } from "react";
import SearchBar from "./SearchBar";
import shoppingCart from "../assets/shopping-cart.png";

export default function Header(props) {

  const { cartCount } = props
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <header className="flex justify-around md:gap-50 xl:block fixed top-0 left-0 w-full z-50 bg-black font-bold h-20 xl:h-15">
        <h1 className="flex items-center h-full xl:w-full xl:text-center xl:justify-center xl:text-5xl text-4xl">
          <a href="/">e-shop</a>
        </h1>
        <hr className="hidden xl:block"></hr>
        <nav className='gap-3 md:gap-10 text-xl xl:relative xl:text-[1rem] flex h-full justify-end xl:pr-[20px] xl:gap-[20px] items-center xl:bg-black'>
          <button className="cursor-pointer" onClick={() => setShowLogin(true)}>Login</button>
          <p className="hidden xl:block">|</p>
          <button className="cursor-pointer" onClick={() => setShowRegister(true)}>Register</button>
          <p className="hidden xl:block">|</p>
          <a href="/wishlist">
            <p className="text-3xl xl:text-[1rem] xl:flex"><span className="hidden xl:block xl:pr-2">Wishlist</span>♡</p>
          </a>
          <p className="hidden xl:block">|</p>
          <a href="/checkout" className='flex h-full w-8 xl:w-9 items-center gap-1 relative'>
            <img src={shoppingCart} className="h-6 xl:h-5"></img>
            <p className="text-sm xl:text-md absolute top-4 xl:top-[1.25rem] xl:text-[1rem] right-0">{cartCount}</p>
          </a>
          <SearchBar />
        </nav>    
      </header>
      

      {showLogin && (
        <div onClick={() => setShowLogin(false)} className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm">
          <Login />
        </div>
      )}

      {showRegister && (
        <div onClick={() => setShowRegister(false)} className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm">
          <Register />
        </div>
      )}
    </>
  )
};