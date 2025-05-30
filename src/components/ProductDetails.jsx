import { Link, useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatDate, getPriceVariation, parsePrice } from "../utils";
import { ButtonLink } from "./common/Buttons";

export default function ProductDetails() {
  const { id } = useParams();
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((product) => product.id === id);
  if (!product) return <p className="text-red-500">Producto no encontrado.</p>;

  return (
    <div className="p-4 gap-4 flex flex-col">
      <ButtonLink to="/" label={"Volver"} type="neutral" />
      <Link to={product.url} target="_blank">
        <h2 className="text-xl text-blue-500">{product.title}</h2>
      </Link>
      <div className="grid grid-cols-2 gap-4">
        <div style={{ maxWidth: "500px" }} className="mx-auto">

          <img 
          className=""
          src={product.image}
          />
          </div>
      <h1>{parsePrice(product.price)}</h1>
      </div>
      <table className="w-full shadow-lg rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-black text-white rounded-2xl">
            <th className=" p-2">Fecha</th>
            <th className=" p-2">Precio</th>
            <th className=" p-2">Variación</th>
          </tr>
        </thead>
        <tbody>
          {product?.history?.map(({ price, timestamp, variation }, index) => {
            const currentVariation = variation || getPriceVariation(
              price,
              index > 0 ? product.history[index - 1].price : price
            );
            return (
            <tr key={index}>
              <td className=" p-2 text-center">{formatDate(timestamp)}</td>
              <td className=" p-2 text-center">{parsePrice(price)}</td>
              <td className={` p-2 text-center ${currentVariation < 0 ? 'text-green-500' : currentVariation > 0 ? 'text-red-500'  : '' }`}>
                {index > 0
                  ? getPriceVariation(price,product.history[index - 1].price).toFixed(2) + "%"
                  : "-"}
              </td>
            </tr>
          )
          })}
        </tbody>
      </table>
      <ResponsiveContainer
        width={"80%"}
        height={300}
        className={"justify-center mx-auto mt-4"}
      >
        <LineChart
          data={product.history.map(({ price, timestamp }, i) => ({
            name: formatDate(timestamp),
            price,
          }))}
        >
          <XAxis dataKey="name" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
