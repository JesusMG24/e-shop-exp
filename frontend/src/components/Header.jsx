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
      <header className="fixed top-0 left-0 w-full z-50 bg-black font-bold">
        <h1 className="w-full text-center text-[50px]">
          <a href="/" className="">e-shop</a>
        </h1>
        <hr></hr>
        <nav className='flex justify-end pr-[20px] gap-[20px] items-center h-[40px]'>
          <button className="cursor-pointer" onClick={() => setShowLogin(true)}>Login</button>
          <p>|</p>
          <button className="cursor-pointer" onClick={() => setShowRegister(true)}>Register</button>
          <p>|</p>
          <a href="/wishlist">
            <p>Wishlist ♡</p>
          </a>
          <p>|</p>
          <a href="/checkout" className={'flex justify-center items-center gap-1'}>
            <img src={shoppingCart} className="h-5 w-5"></img>
            <p>{cartCount}</p>
          </a>
        </nav>
      </header>
      <SearchBar />

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