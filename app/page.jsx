"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const initialProducts = [
  { id: 1, name: "Mizo Puan Chei", price: 1500, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
  { id: 2, name: "Sneaker Mawi", price: 2500, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  // LocalStorage atangin cart load
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert(`${product.name} cart ah a lut e!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Ka Online Shop</h1>
          <Link href="/cart" className="bg-black text-white px-5 py-2 rounded-full">
            Cart ({cart.length})
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-xl p-3 shadow">
              <img src={p.image} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="font-bold mt-3">{p.name}</h3>
              <p className="text-gray-600">₹{p.price}</p>
              <button onClick={() => addToCart(p)} className="mt-3 w-full bg-black text-white py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 bg-yellow-100 rounded-lg">
          <p className="text-sm"><b>Tip:</b> /admin a i upload URL kha copy la, he initialProducts ah hian paste la, i product tak tak a lo ni mai ang.</p>
        </div>
      </div>
    </div>
  );
}