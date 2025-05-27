import { useState } from "react";
import { Button } from "./common/Buttons";
import addProduct from "../actions/product/addProduct";

export default function AddProductForm({ setProducts }) {
  const [url, setUrl] = useState("");

  const handleAddProduct = async (url) => {
    const product = await addProduct(url);
    if (!product) return;
    setProducts(product);
    setUrl("");
  };

  return (
    <div className="pb-4 gap-4 flex">
      <input
        className="border rounded-lg p-2 w-full"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL del producto"
      />
      <Button
        label="Agregar"
        onClick={() => handleAddProduct(url)}
        type="neutral"
      />
    </div>
  );
}
