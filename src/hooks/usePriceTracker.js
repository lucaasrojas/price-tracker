import { useEffect } from "react";
import { handleAdd } from "../components/AddProductForm";
import { setProductsToLocalStorage } from "../utils";

export function usePriceTracker(products, setProducts) {
  useEffect(() => {
    if(products.length === 0) return;
    const interval = setInterval(() => {
      const updatedProducts = products.map(async (product) => {
        if(!product) return;
        const newProduct= await handleAdd(product.url)
        console.log("NEW PRODUCT", newProduct)
        return newProduct;
      });
      console.log("update", updatedProducts)
      Promise.all(updatedProducts).then((data) =>{
        console.log("PROMISE DATA", data)
        if(data){

          setProducts(data)
          setProductsToLocalStorage(data)
        }
      }); 
    }, 4 * 60 * 60 * 1000); // Cada 4 horas

    return () => clearInterval(interval);
  }, [products, setProducts]);
}
