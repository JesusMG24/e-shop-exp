import { useState } from "react";
import api from "../api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/token/", { username, password });
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            console.log("Logged in!");
        } catch (err) {
            console.error(err.response?.data || err);
        }
    };

    return (
        <form onClick={(e) => e.stopPropagation()} onSubmit={handleLogin} className="flex flex-col w-[500px] h-[175px] text-[20px] bg-gray-800 border-[1px] items-center gap-[20px] p-[20px] rounded-[20px]">
            <input className="w-full border-[1px] border-gray-500" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
            <input className="w-full border-[1px] border-gray-500" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            <button className="rounded-full bg-gray-600 w-[150px] hover:invert cursor-pointer" type="submit">Login</button>
        </form>
    );
}