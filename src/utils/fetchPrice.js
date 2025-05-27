import { getProductIdFromUrl } from ".";

// FIX CORS ERROR FROM LOCAL

export async function fetchPrice(url) {
  const id = getProductIdFromUrl(url)
  if (!url || !id) return null;

  try {
    const fetchUrl = id.includes("-") ? `https://articulo.mercadolibre.com.ar/${id}` : `https://www.mercadolibre.com.ar/p/${id}`;

    const res = await fetch(fetchUrl);
    const body = await res.text();
    const parsed = new DOMParser().parseFromString(body, 'text/html');

    const price = parsed.querySelector('[itemprop="price"]').content
    const title = parsed.querySelector('h1.ui-pdp-title').innerText
    const image = parsed.querySelector('.ui-pdp-image.ui-pdp-gallery__figure__image').src;
  
    return { title, price, id, url:fetchUrl, image };
  } catch (error) {
    console.log("ERR", error)
    return null;
  }
}

// https://articulo.mercadolibre.com.ar/MLA-1758691986
// https://www.mercadolibre.com.ar/p/MLA40162626?pdp_filters=deal:MLA779357-1#wid=MLA1452808737&sid=search&searchVariation=MLA40162626&position=2&search_layout=stack&type=product&tracking_id=6ca8034f-a1a8-4e49-9fe3-85dddb840d93&c_container_id=MLA779357-1&c_id=%2Fsplinter%2Fcarouseldynamicitem&c_element_order=1&c_campaign=aprovecha-las-mejores-ofertas-%F0%9F%92%A3&c_label=%2Fsplinter%2Fcarouseldynamicitem&c_uid=63ce40c4-3271-11f0-8f69-c107511de3a6&c_element_id=63ce40c4-3271-11f0-8f69-c107511de3a6&c_global_position=8&deal_print_id=63debb80-3271-11f0-9bb7-9fc22a07e55b&c_tracking_id=63debb80-3271-11f0-9bb7-9fc22a07e55b