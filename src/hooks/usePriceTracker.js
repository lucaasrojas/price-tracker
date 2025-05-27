import { useEffect } from "react";
import { setProductsToLocalStorage } from "../utils";
import addProduct from "../actions/product/addProduct";

export function usePriceTracker(products, setProducts) {
  useEffect(() => {
    if(products.length === 0) return;
    const interval = setInterval(() => {
      const updatedProducts = products.map(async (product) => {
        if(!product) return;
        const newProduct= await addProduct(product.url)
        return newProduct;
      });
      Promise.all(updatedProducts).then((data) =>{
        if(data){

          setProducts(data)
          setProductsToLocalStorage(data)
        }
      }); 
    }, 4 * 60 * 60 * 1000); // Cada 4 horas

    return () => clearInterval(interval);
  }, [products, setProducts]);

  
}
