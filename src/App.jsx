import { useEffect, useState } from "react";
import AddProductForm, { handleAdd } from "./components/AddProductForm";
import ProductTable from "./components/ProductTable";
import { usePriceTracker } from "./hooks/usePriceTracker";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import { findProductById, getProductsFromLocalStorage, setProductsToLocalStorage } from "./utils";
import { toast, ToastContainer } from "react-toastify";
export default function App() {
  const [products, setProducts] = useState(
    getProductsFromLocalStorage() || []
  );

  // Move products state to hook
  
  usePriceTracker(products, setProducts);

  const handleAddProducts = (newProduct) => {
    const productsList = getProductsFromLocalStorage() || [];

    if (findProductById(newProduct.id)) {
      const index = productsList.findIndex(
        (product) => product.id === newProduct.id
      );
      productsList[index] = newProduct;
    } else {
      productsList.push(newProduct);
    }

    setProducts(productsList);
    setProductsToLocalStorage(productsList);
    toast.success("Producto agregado correctamente");
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    setProductsToLocalStorage(newProducts);
    toast.success("Producto eliminado correctamente");
  };

  // check on load last update for each product that is older than 4 hours and update it
  const checkLastUpdate = () => {
    const productsList = getProductsFromLocalStorage() || [];
    const updatedProducts = productsList.map((product) => {
      const lastUpdate = new Date(
        product.history[product.history.length - 1].timestamp
      );
      const now = new Date();
      const diff = now - lastUpdate;
      if (diff > 4 * 60 * 60 * 1000) {
        return handleAdd(product.url);
      }
      return product;
    });
    setProducts(updatedProducts);
    setProductsToLocalStorage(updatedProducts);
  };

  useEffect(() => {
    checkLastUpdate()
  }, []);

  return (
    <Router>
      <ToastContainer />
      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
              <h1 className="text-5xl font-bold mb-4 text-center">Price Tracker</h1>
                <AddProductForm setProducts={handleAddProducts} />
                <ProductTable
                  products={products}
                  removeProduct={handleRemoveProduct}
                />
              </>
            }
          />

          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
