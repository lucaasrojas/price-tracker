import { Link } from "react-router-dom";
import { formatDate, parsePrice } from "../utils";
import { Button, ButtonLink } from "./common/Buttons";

export default function ProductTable({ products, removeProduct, showDetail }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Título</th>
          <th className="border p-2">Precio</th>
          <th className="border p-2">Variación</th>
          <th className="border p-2">Ultima Actualizacion</th>
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) =>
          Object.keys(product || {}).length > 0 ? (
            <tr key={index}>
              <td className="border p-2">{product.title}</td>
              <td className="border p-2">
                {parsePrice(product.history[product.history.length - 1].price)}
              </td>
              <td className={`border p-2`}>
                {product.variation.toFixed(2) + "%"}
              </td>
              <td className={`border p-2`}>
                {formatDate(
                  product.history[product.history.length - 1].timestamp
                )}
              </td>
              <td className="border p-2 flex gap-4">
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
