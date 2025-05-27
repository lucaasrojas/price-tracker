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

export const getTimeDifference = (timestamp) => {
  return new Date().getTime() - new Date(timestamp).getTime();
};

export const getPriceVariation = (currentPrice, previousPrice) => {
  if (previousPrice === 0) return 0;
  return ((currentPrice - previousPrice) / previousPrice) * 100;
};

export const findLastVariation = (history) => {
  for (let i = history.length - 1; i > 0; i--) {
    if (history[i].variation > 0 || history[i].variation < 0) {
      return history[i].variation;
    }
    if(history[i].price !== history[i - 1].price) {
      return getPriceVariation(history[i].price, history[i - 1].price);
    }
  }

  return 0
}

// Remove los valores del historial que son del mismo dia y precio y actualizar el localStorage
export const cleanHistory = (history) => {
  //CHECK THIS
  const cleanedHistory = [];
  let lastEntry = null;

  history.forEach((entry) => {
    if (
      lastEntry &&
      new Date(entry.timestamp).toDateString() ===
        new Date(lastEntry.timestamp).toDateString() &&
      entry.price === lastEntry.price
    ) {
      return; // Skip this entry
    }
    cleanedHistory.push(entry);
    lastEntry = entry;
  });

  return cleanedHistory;
};