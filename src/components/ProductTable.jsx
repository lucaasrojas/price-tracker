import { findLastVariation, formatDate, parsePrice } from "../utils";
import { Button, ButtonLink } from "./common/Buttons";
import { EyeIcon, TrashIcon } from "@heroicons/react/16/solid";

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
        {products.map((product, index) => {
          const lastVariation = findLastVariation(product.history);
          const lastHistory = product.history[product.history.length - 1];
          return Object.keys(product || {}).length > 0 ? (
            <tr
              key={index}
              className="hover:bg-gray-200 transition duration-200 ease-in-out"
            >
              <td className=" p-2">{product.title}</td>
              <td className=" p-2">{parsePrice(lastHistory.price)}</td>
              <td
                className={`p-2 ${
                  lastVariation < 0
                    ? "text-green-500"
                    : lastVariation > 0
                      ? "text-red-500"
                      : ""
                }`}
              >
                {lastVariation.toFixed(2) + "%"}
              </td>
              <td className={` p-2`}>{formatDate(lastHistory.timestamp)}</td>
              <td className=" p-2 flex gap-4">
                <ButtonLink to={`/product/${product.id}`}>
                  <EyeIcon className="size-5 text-neutral-500" />
                </ButtonLink>

                <Button onClick={() => removeProduct(index)} type="error">
                  <TrashIcon className="text-white size-5" />
                </Button>
              </td>
            </tr>
          ) : null;
        })}
      </tbody>
    </table>
  );
}
