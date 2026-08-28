"use client";
import { useState } from "react";

export default function AdminPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.secure_url);
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Product Thlalak Upload</h1>

      <input type="file" onChange={handleUpload} className="border p-2 w-full" />

      {loading && <p className="mt-4 text-blue-500">Uploading mek...</p>}

      {imageUrl && (
        <div className="mt-5">
          <p className="text-green-600 font-bold">A lut ta!</p>
          <img src={imageUrl} className="w-full mt-2 rounded border" />
          <p className="text-xs break-all mt-2 bg-gray-100 p-2">{imageUrl}</p>
        </div>
      )}
    </div>
  );
}