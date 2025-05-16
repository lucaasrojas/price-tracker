const region = Intl.DateTimeFormat().resolvedOptions().locale;
const currenciesCodes = {
  "en-US": "USD",
  "es-AR": "ARS",
}
export function formatDate(isoString) {
  
  return new Date(isoString).toLocaleDateString(region, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
export const parsePrice = (price)=>{
  return Intl.NumberFormat(region, {
    style: "currency",
    currency: currenciesCodes[region] || "ARS",
  }).format(price);
}

export const findProductById = (id) => {
  const products = JSON.parse(localStorage.getItem("products")) || []
  if(products.length === 0) return null
  console.log("PRODUCTS", products)
  return products?.filter(
    (product) => product?.id === id
  )[0];
};

export const getProductsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("products"));
};

export const setProductsToLocalStorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
}

export const getProductIdFromUrl = (url)=>{
  return new URL(url).pathname.match(/MLA-\d+/)?.[0] || url.match(/MLA\d+/)?.[0];
}