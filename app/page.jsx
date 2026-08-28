"use client";
import { useState } from "react";

const initialProducts = [
  { id: 1, name: "T-Shirt Mawi", price: 350, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Bag Chhe Lo", price: 850, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Sneakers", price: 1500, image: "https://via.placeholder.com/300" },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [products] = useState(initialProducts);

  const addToCart = (p) => {
    setCart([...cart, p]);
    alert(p.name + " Cart ah a lut e!");
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2">VL ONLINE SHOPPING</h1>
      <p className="text-center mb-6 text-gray-600">Thil thar, man tlawm!</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg p-2 shadow">
            <img src={p.image} className="w-full h-48 object-cover rounded" />
            <h3 className="font-bold mt-3">{p.name}</h3>
            <p className="text-gray-600">₹{p.price}</p>
            <button onClick={() => addToCart(p)} className="mt-3 w-full bg-black text-white py-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 p-4 bg-yellow-100 rounded-lg">
        <p className="text-sm"><b>Tip:</b> /admin ah i thlalak upload URL kha copy la, hetah hian i thlak dawn nia. Cart: {cart.length}</p>
      </div>
    </div>
  );
}