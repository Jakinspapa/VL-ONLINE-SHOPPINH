"use client";
import { useState, useEffect } from "react";

const initialProducts = [
  { id: 1, name: "Cordless Drill 20V Pro", sku: "VL-CD2000", category: "Drills", stock: 45, price: 89.99, status: "In Stock", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=100" },
  { id: 2, name: "Angle Grinder 900W", sku: "VL-AG900", category: "Grinders", stock: 23, price: 62.5, status: "Low Stock", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100" },
  { id: 3, name: "Impact Wrench 1/2\" Drive", sku: "VL-IW500", category: "Wrenches", stock: 67, price: 112, status: "In Stock", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100" },
  { id: 4, name: "Circular Saw 1500W", sku: "VL-CS1500", category: "Saws", stock: 34, price: 78.25, status: "In Stock", image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=100" },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState(initialProducts);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", sku: "", category: "Drills", stock: "", price: "", image: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vl_products_admin") || "[]");
    if(saved.length) setProducts([...saved, ...initialProducts]);
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "online_shop");
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/tadcjo7u/image/upload", { method: "POST", body: data });
      const result = await res.json();
      setForm({...form, image: result.secure_url});
    } catch { alert("Upload failed, try Cloudinary directly"); }
    setUploading(false);
  };

  const addProduct = () => {
    if(!form.name || !form.price) return alert("Hming leh man a ngai");
    const newP = { id: Date.now(), name: form.name, sku: form.sku || `VL-${Date.now()}`, category: form.category, stock: Number(form.stock)||10, price: Number(form.price), status: Number(form.stock)<30 ? "Low Stock" : "In Stock", image: form.image || "https://picsum.photos/100" };
    const updated = [newP, ...products];
    setProducts(updated);
    localStorage.setItem("vl_products_admin", JSON.stringify(updated.slice(0,20)));
    // also save for shop
    const shopProducts = JSON.parse(localStorage.getItem("vl_products") || "[]");
    localStorage.setItem("vl_products", JSON.stringify([ { ...newP, discount:0 }, ...shopProducts]));
    setShowAdd(false);
    setForm({ name: "", sku: "", category: "Drills", stock: "", price: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f172a] text-white p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8 p-2 bg-white/10 rounded">
          <div className="w-8 h-8 bg-red-600 flex items-center justify-center font-bold">VL</div>
          <span className="font-bold text-sm">VL ONLINE TOOLS STORE</span>
        </div>
        <div className="space-y-1">
          {["Dashboard","Products","Orders","Inventory","Customers","Analytics","Promotions","Reviews","Settings","Help & Support"].map((m,i)=>
            <div key={m} className={`p-3 rounded flex gap-3 text-sm ${i===0?"bg-[#2563eb]":"hover:bg-white/10"}`}>{m}</div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1">
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <input placeholder="Search products, orders, customers..." className="border rounded-full px-4 py-2 w-96 text-sm" />
          <div className="flex items-center gap-4">
            <span>🔔 🔴 ✉️</span>
            <span className="font-bold text-sm">John Admin</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div><h1 className="text-2xl font-bold">Dashboard</h1><p className="text-sm text-gray-500">Welcome back, John - here's your store performance overview for today.</p></div>
            <div className="flex gap-2">
              <button onClick={()=>setShowAdd(true)} className="bg-[#2563eb] text-white px-4 py-2 rounded text-sm font-bold">+ Add Product</button>
              <button className="border px-4 py-2 rounded text-sm font-bold">⬇ Export Report</button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow border"><div className="flex justify-between"><span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">📈</span></div><p className="text-xs text-gray-500 mt-2">Total Sales</p><p className="text-2xl font-bold">$124,568</p><p className="text-xs text-green-600">+12.5% vs last month</p></div>
            <div className="bg-white p-4 rounded-xl shadow border"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">🛒</div><p className="text-xs text-gray-500 mt-2">Total Orders</p><p className="text-2xl font-bold">1,247</p><p className="text-xs text-green-600">+8.2% vs last month</p></div>
            <div className="bg-white p-4 rounded-xl shadow border"><div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">📦</div><p className="text-xs text-gray-500 mt-2">Total Products</p><p className="text-2xl font-bold">342</p><p className="text-xs text-blue-600">+24 added this month</p></div>
            <div className="bg-white p-4 rounded-xl shadow border"><div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">⚠️</div><p className="text-xs text-gray-500 mt-2">Low Stock Items</p><p className="text-2xl font-bold">14</p><p className="text-xs text-red-600">-3 from last week</p></div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 bg-white p-4 rounded-xl shadow border">
              <div className="flex justify-between mb-4"><h3 className="font-bold">Sales Overview</h3><select className="border text-xs rounded px-2 py-1"><option>Last 8 Months</option></select></div>
              <div className="h-40 flex items-end gap-2">
                {[10,15,12,18,22,25,22,38].map((h,i)=><div key={i} className="flex-1 bg-blue-500 rounded-t" style={{height: h*3}}></div>)}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border">
              <h3 className="font-bold mb-4">Inventory Overview</h3>
              <div className="flex justify-center"><div className="w-24 h-24 rounded-full border-8 border-blue-600 border-t-orange-400 border-r-red-500"></div></div>
              <div className="text-xs mt-4 space-y-1"><p>🟡 In Stock — 267 items</p><p>🟠 Low Stock — 48 items</p><p>🔴 Out of Stock — 27 items</p></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow border p-4">
            <div className="flex justify-between mb-4"><h3 className="font-bold">Product Management</h3><input placeholder="Search product..." className="border rounded px-3 py-1 text-sm" /></div>
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 border-b"><tr><th>#</th><th>Product</th><th>Category</th><th>Stock</th><th>Price</th><th>Status</th></tr></thead>
              <tbody>{products.slice(0,6).map((p,i)=><tr key={p.id} className="border-b"><td>{i+1}</td><td className="flex items-center gap-2 py-2"><img src={p.image} className="w-8 h-8 rounded" />{p.name}<br/><span className="text-xs text-gray-400">{p.sku}</span></td><td><span className="bg-yellow-100 text-xs px-2 py-1 rounded">{p.category}</span></td><td>{p.stock} in stock</td><td>${p.price}</td><td><span className={`text-xs px-2 py-1 rounded ${p.status==="In Stock"?"bg-green-100 text-green-700":"bg-orange-100 text-orange-700"}`}>{p.status}</span></td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="font-bold text-lg mb-4">Add New Product</h2>
            <input type="file" onChange={uploadImage} className="border w-full p-2 mb-2" />
            {uploading && <p className="text-sm">Uploading...</p>}
            {form.image && <img src={form.image} className="w-full h-32 object-cover rounded mb-2" />}
            <input placeholder="Product Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border w-full p-2 mb-2 rounded" />
            <input placeholder="SKU" value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})} className="border w-full p-2 mb-2 rounded" />
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="border w-full p-2 mb-2 rounded"><option>Drills</option><option>Grinders</option><option>Wrenches</option><option>Hammers</option><option>Saws</option></select>
            <div className="flex gap-2"><input placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} className="border w-full p-2 mb-2 rounded" /><input placeholder="Price $" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="border w-full p-2 mb-2 rounded" /></div>
            <div className="flex gap-2 mt-4"><button onClick={()=>setShowAdd(false)} className="flex-1 border py-2 rounded">Cancel</button><button onClick={addProduct} className="flex-1 bg-blue-600 text-white py-2 rounded">Save Product</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
