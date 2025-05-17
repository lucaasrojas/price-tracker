import { useState } from "react";
import { fetchPrice } from "../utils/fetchPrice";
import { findProductById, getPriceVariation, getProductIdFromUrl, getTimeDifference } from "../utils";
import { toast } from "react-toastify";
import { Button } from "./common/Buttons";

const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

export const handleAdd = async (url) => {
  try {
    const id = getProductIdFromUrl(url);
    const productFromLocalStorage = id ? findProductById(id) : null;
    let timeDifference = 0;

    if (productFromLocalStorage) {
      const lastUpdateTimestamp =
        productFromLocalStorage?.history[
          productFromLocalStorage?.history?.length - 1
        ].timestamp;
      timeDifference = getTimeDifference(lastUpdateTimestamp);
    }

    if(productFromLocalStorage && timeDifference < fiveMinutes){
      toast.error("Espera que pasen al menos 5 minutos para obtener la informacion");
      return;
    }

    const data = await fetchPrice(url);

    let newProduct = {...productFromLocalStorage, ...data};
    if (newProduct && productFromLocalStorage) {
      newProduct = {
        ...data,
        history: [
          ...productFromLocalStorage.history,
          { price: data.price, timestamp: new Date().toISOString() },
        ],
        variation: getPriceVariation(
          data.price,
          productFromLocalStorage.history[
            productFromLocalStorage.history.length - 1
          ].price
        ),
      };
    } else if (data) {
      newProduct = {
        ...data,
        history: [{ price: data.price, timestamp: new Date().toISOString() }],
        variation: 0,
      };
    }

    return newProduct;
  } catch (error) {
    console.error("Error fetching product data:", error);
    toast.error(
      "Error al obtener los datos del producto. Asegúrate de que la URL sea válida."
    );
    return;
  }
};

export default function AddProductForm({ setProducts }) {
  const [url, setUrl] = useState("");

  const handleAddProduct = async (url) => {
    const product = await handleAdd(url);
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
