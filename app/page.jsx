"use client";
import { useState, useEffect } from "react";

const allProducts = [
  { id: 1, name: "Cordless Drill 20V Pro", sku: "VL-CD2000", category: "Drills", price: 8999, oldPrice: 11999, rating: 4.8, stock: 45, image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400", badge: "30% OFF" },
  { id: 2, name: "Angle Grinder 900W", sku: "VL-AG900", category: "Grinders", price: 6250, oldPrice: 0, rating: 4.6, stock: 23, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400", badge: "Stock tlem" },
  { id: 3, name: "Impact Wrench Half Inch", sku: "VL-IW500", category: "Wrenches", price: 11200, oldPrice: 14500, rating: 4.9, stock: 67, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400", badge: "" },
  { id: 4, name: "Circular Saw 1500W", sku: "VL-CS1500", category: "Saws", price: 7825, oldPrice: 0, rating: 4.7, stock: 34, image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400", badge: "Thar" },
  { id: 5, name: "Hammer Drill 750W", sku: "VL-HD750", category: "Drills", price: 9500, oldPrice: 12000, rating: 4.5, stock: 12, image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400", badge: "" },
  { id: 6, name: "Jigsaw 600W Pro", sku: "VL-JS600", category: "Saws", price: 5499, oldPrice: 0, rating: 4.6, stock: 56, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400", badge: "Lar ber" },
];

export default function CustomerShop() {
  const [products, setProducts] = useState(allProducts);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  useEffect(() => {
    const savedAdmin = JSON.parse(localStorage.getItem("vl_products_admin") || "[]");
    const saved = JSON.parse(localStorage.getItem("vl_products") || "[]");
    const combined = [...saved, ...savedAdmin, ...allProducts];
    const map = new Map();
    combined.forEach(p => { if(!map.has(p.id)) map.set(p.id, p); });
    setProducts(Array.from(map.values()));
    setCart(JSON.parse(localStorage.getItem("vl_cart") || "[]"));
  }, []);

  useEffect(() => { localStorage.setItem("vl_cart", JSON.stringify(cart)); }, [cart]);

  const filtered = products.filter(p => 
    (cat==="All" || p.category===cat) && 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (p) => {
    const exist = cart.find(c=>c.id===p.id);
    if(exist) setCart(cart.map(c=>c.id===p.id?{...c,qty:c.qty+1}:c));
    else setCart([...cart,{...p,qty:1}]);
    setShowCart(true);
  };

  const total = cart.reduce((s,c)=>s+c.price*c.qty,0);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 text-white flex items-center justify-center font-bold">VL</div>
            <div><p className="font-bold leading-none">VL ONLINE TOOLS</p><p className="font-bold leading-none">STORE</p></div>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Drill, Grinder zawng rawh..." className="hidden md:block w-[380px] border rounded-full px-5 py-2 text-sm bg-gray-50" />
          <div className="flex items-center gap-5">
            <button onClick={()=>setShowCart(true)} className="relative bg-[#0f172a] text-white px-4 py-2 rounded-full text-sm font-bold">🛒 Cart {cart.length>0 && <span className="bg-red-500 text-white text-xs px-1.5 rounded-full ml-1">{cart.reduce((a,b)=>a+b.qty,0)}</span>}</button>
            <span className="text-sm font-bold">Customer</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        <div className="w-60 hidden md:block">
          <div className="bg-white rounded-xl p-4 shadow border">
            <h3 className="font-bold mb-3">Category</h3>
            {["All","Drills","Grinders","Wrenches","Saws","Hammers"].map(c=>(
              <div key={c} onClick={()=>setCat(c)} className={`px-3 py-2 rounded text-sm cursor-pointer mb-1 ${cat===c?"bg-[#2563eb] text-white":"hover:bg-gray-100"}`}>{c}</div>
            ))}
            <h3 className="font-bold mt-6 mb-2">Hlawkna</h3>
            <div className="text-xs space-y-2 text-gray-600"><p>🚚 Free Delivery Aizawl chhung</p><p>🛡️ Kum 2 Warranty</p><p>📞 24/7 Biak theih</p><p>↩️ Thleng theih</p></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] rounded-xl p-6 text-white mb-6 flex justify-between items-center">
            <div><h2 className="text-2xl font-bold">Professional Power Tools</h2><p className="text-blue-200">30% thleng Discount - Tunlai chauh!</p><button className="mt-3 bg-white text-black px-4 py-2 rounded font-bold text-sm">Lei nghal rawh →</button></div>
            <div className="text-6xl opacity-20">🔧</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map(p=>(
              <div key={p.id} className="bg-white rounded-xl border shadow-sm p-3 hover:shadow-md transition">
                <div className="relative"><img src={p.image} className="w-full h-36 object-cover rounded-lg" />{p.badge && <span className={`absolute top-2 left-2 text-xs px-2 py-1 rounded font-bold ${p.badge==="Stock tlem"?"bg-orange-500 text-white":"bg-red-600 text-white"}`}>{p.badge}</span>}</div>
                <p className="text-xs text-gray-400 mt-2">{p.sku} • {p.category}</p>
                <h3 className="font-bold text-sm mt-1 leading-tight">{p.name}</h3>
                <p className="text-xs text-yellow-500">{"★".repeat(Math.floor(p.rating))} {p.rating} ({p.stock} awm)</p>
                <div className="flex items-center gap-2 mt-2"><span className="font-bold text-lg">₹{p.price.toLocaleString("en-IN")}</span>{p.oldPrice>0 && <span className="text-xs line-through text-gray-400">₹{p.oldPrice.toLocaleString("en-IN")}</span>}</div>
                <button onClick={()=>addToCart(p)} className="mt-3 w-full bg-[#2563eb] text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700">+ Cart ah dah</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="flex-1 bg-black/40" onClick={()=>setShowCart(false)}></div>
          <div className="w-full max-w-sm bg-white h-full shadow-2xl p-5 flex flex-col">
            <div className="flex justify-between items-center mb-5"><h2 className="font-bold text-lg">I Cart ({cart.reduce((a,b)=>a+b.qty,0)})</h2><button onClick={()=>setShowCart(false)} className="border rounded-full w-8 h-8">✕</button></div>
            <div className="flex-1 overflow-auto space-y-3">
              {cart.length===0 && <p className="text-gray-400 text-sm">Cart a la ruak</p>}
              {cart.map(c=>(
                <div key={c.id} className="flex gap-3 border rounded-lg p-2">
                  <img src={c.image} className="w-14 h-14 rounded object-cover" />
                  <div className="flex-1"><p className="text-sm font-bold">{c.name}</p><p className="text-xs text-gray-500">₹{c.price.toLocaleString("en-IN")} x {c.qty}</p>
                    <div className="flex gap-2 mt-1"><button onClick={()=>setCart(cart.map(x=>x.id===c.id?{...x,qty:Math.max(1,x.qty-1)}:x))} className="border w-6 h-6 rounded">-</button><span className="text-sm">{c.qty}</span><button onClick={()=>setCart(cart.map(x=>x.id===c.id?{...x,qty:x.qty+1}:x))} className="border w-6 h-6 rounded">+</button>
                    <button onClick={()=>setCart(cart.filter(x=>x.id!==c.id))} className="ml-auto text-red-500 text-xs">Paihlak</button></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4"><div className="flex justify-between font-bold"><span>Belhkhawm</span><span>₹{total.toLocaleString("en-IN")}</span></div><button className="w-full bg-black text-white py-3 rounded-lg mt-4 font-bold">Checkout - ₹{total.toLocaleString("en-IN")}</button><button onClick={()=>setShowCart(false)} className="w-full border py-3 rounded-lg mt-2 font-bold">Leizel rawh</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
