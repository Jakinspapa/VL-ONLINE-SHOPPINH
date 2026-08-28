"use client";
import { useState, useEffect } from "react";

const initialProducts = [
  { id: 1, name: "T-Shirt Mawi", price: 350, discount: 0, image: "https://picsum.photos/300" },
  { id: 2, name: "Bag Chhe Lo", price: 850, discount: 10, image: "https://picsum.photos/301" },
  { id: 3, name: "Sneakers", price: 1500, discount: 0, image: "https://picsum.photos/302" },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vl_products") || "[]");
    if (saved.length > 0) setProducts([...saved,...initialProducts]);
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">VL ONLINE SHOPPING</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg p-2 shadow relative">
            {p.discount > 0 && <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">-{p.discount}%</span>}
            <img src={p.image} className="w-full h-48 object-cover rounded" />
            <h3 className="font-bold mt-3">{p.name}</h3>
            <p>₹{p.price} {p.discount > 0 && <span className="line-through text-sm text-gray-400">₹{Math.round(p.price*100/(100-p.discount))}</span>}</p>
            <button onClick={()=>{setCart([...cart,p]); alert(p.name+" added")}} className="mt-3 w-full bg-black text-white py-2 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}