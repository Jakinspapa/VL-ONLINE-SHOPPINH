"use client";
import { useState } from "react";

export default function Admin() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "online_shop");

    const res = await fetch("https://api.cloudinary.com/v1_1/tadcjo7u/image/upload", {
      method: "POST",
      body: data
    });
    const result = await res.json();
    setUrl(result.secure_url);
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Product Thlalak Upload</h1>
      <input type="file" onChange={upload} className="border p-2 w-full" />
      {loading && <p className="mt-4">Uploading...</p>}
      {url && (
        <div className="mt-5">
          <img src={url} className="w-full rounded border" />
          <p className="mt-3 bg-gray-100 p-2 break-all text-sm">{url}</p>
          <p className="mt-2 text-green-600 font-bold">He URL hi copy la, i shop ah hmang rawh!</p>
        </div>
      )}
    </div>
  );
}