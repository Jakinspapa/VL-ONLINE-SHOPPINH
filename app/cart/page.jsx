"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <Link href="/" className="text-blue-600">← Shop ah kir leh</Link>
      <h1 className="text-2xl font-bold mt-4">I Cart ({cart.length})</h1>

      {cart.map((item, i) => (
        <div key={i} className="flex gap-4 border-b py-4">
          <img src={item.image} className="w-20 h-20 object-cover rounded" />
          <div>
            <p className="font-bold">{item.name}</p>
            <p>₹{item.price}</p>
          </div>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-5">Total: ₹{total}</h2>
      <button onClick={clearCart} className="mt-4 w-full bg-red-600 text-white py-3 rounded-lg">
        Cart Clear
      </button>
      <button className="mt-2 w-full bg-green-600 text-white py-3 rounded-lg">
        Order Place (WhatsApp ah)
      </button>
    </div>
  );
}