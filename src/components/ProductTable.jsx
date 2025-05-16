import { Link } from "react-router-dom";
import { formatDate, parsePrice } from "../utils";
import { Button, ButtonLink } from "./common/Buttons";

export default function ProductTable({ products, removeProduct }) {
  return (
    <table className="w-full  shadow-lg rounded-xl overflow-hidden">
      <thead>
        <tr className="bg-black text-white rounded-2xl">
          <th className="p-2">Título</th>
          <th className=" p-2">Precio</th>
          <th className=" p-2">Variación</th>
          <th className=" p-2">Ultima Actualizacion</th>
          <th className=" p-2">Acciones</th>
        </tr>
      </thead>
      <tbody className="rounded-2xl">
        {products.map((product, index) =>
          Object.keys(product || {}).length > 0 ? (
            <tr key={index} className="hover:bg-gray-200 transition duration-200 ease-in-out">
              <td className=" p-2">{product.title}</td>
              <td className=" p-2">
                {parsePrice(product.history[product.history.length - 1].price)}
              </td>
              <td className={` p-2`}>
                {product.variation.toFixed(2) + "%"}
              </td>
              <td className={` p-2`}>
                {formatDate(
                  product.history[product.history.length - 1].timestamp
                )}
              </td>
              <td className=" p-2 flex gap-4">
                <ButtonLink 
                    to={`/product/${product.id}`}
                    label={"Detalle"}
                />
                <Button
                    label="Eliminar"
                    onClick={() => removeProduct(index)}
                    type="error"
                />
              </td>
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  );
}
