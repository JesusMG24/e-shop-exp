import { useState } from "react";
import api from "../api";

export default function Register() {
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/register/", {username, email, password});
            console.log("Register successful!");
        } catch (err) {
            console.error(err.response?.data || err);
        }
    };
    
    return (
        <form onClick={(e) => e.stopPropagation()} onSubmit={handleRegister} className="flex flex-col w-[500px] h-[250px] text-[20px] bg-gray-800 border-[1px] justify-center items-center gap-[20px]  rounded-[20px] p-[20px]">
            <input className="w-full border-[1px] border-gray-500" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"></input>
            <input className="w-full border-[1px] border-gray-500" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"></input>
            <input className="w-full border-[1px] border-gray-500" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"></input>
            <button className="rounded-full bg-gray-600 w-[150px] hover:invert cursor-pointer" type="submit">Register</button>
        </form>
    )
}