"use client";
import { useState } from "react";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [url, setUrl] = useState("");

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "online_shop");
    const res = await fetch("https://api.cloudinary.com/v1_1/tadcjo7u/image/upload", { method: "POST", body: data });
    const result = await res.json();
    setUrl(result.secure_url);
    setLoading(false);
    alert("Thlalak upload zo!");
  };

  const saveProduct = () => {
    if (!name ||!price ||!url) return alert("Hming, Man leh Thlalak a ngai!");
    const newProduct = { id: Date.now(), name, price: Number(price), discount: Number(discount) || 0, image: url };
    const old = JSON.parse(localStorage.getItem("vl_products") || "[]");
    localStorage.setItem("vl_products", JSON.stringify([newProduct,...old]));
    alert(name + " chu Shop ah a lut ta! Home ah lut la refresh rawh!");
    setName(""); setPrice(""); setDiscount(""); setUrl("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">VL ADMIN - Thil Thar Dah</h1>

      <input type="file" onChange={upload} className="border p-3 w-full mb-4" />
      {loading && <p>Uploading...</p>}
      {url && <img src={url} className="w-full h-48 object-cover rounded mb-4 border" />}

      <input placeholder="Hming (eg: Drill Machine)" value={name} onChange={e=>setName(e.target.value)} className="border p-3 w-full mb-3 rounded" />
      <input placeholder="Man (eg: 3500)" type="number" value={price} onChange={e=>setPrice(e.target.value)} className="border p-3 w-full mb-3 rounded" />
      <input placeholder="Discount % (eg: 10) - Awm loh chuan 0" type="number" value={discount} onChange={e=>setDiscount(e.target.value)} className="border p-3 w-full mb-4 rounded" />

      <button onClick={saveProduct} className="w-full bg-black text-white py-3 rounded font-bold">UPLOAD & SHOP AH DAH</button>

      <p className="text-xs mt-6 text-gray-500">He phone/laptop a i upload chu he device ah hian a lang nghal ang. Mi zawng zawng hmu tur chuan Vercel a a lang hnu ah a URL ka lo copy sak ang che.</p>
    </div>
  );
}