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
import { formatDate } from "../utils";

export default function ProductDetails() {
  const { id } = useParams();
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((product) => product.id === id);
  if (!product) return <p className="text-red-500">Producto no encontrado.</p>;

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500">
        <button className="bg-blue-500 text-white p-2 mb-4 cursor-pointer">

        Volver
        </button>
      </Link>

      <Link to={product.url} target="_blank"><h2 className="text-xl text-blue-500">{product.title}</h2></Link>
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Variación</th>
          </tr>
        </thead>
        <tbody>
          {product?.history?.map(({ price, timestamp }, index) => (
            <tr key={index}>
              <td className="border p-2">{formatDate(timestamp)}</td>
              <td className="border p-2">${price}</td>
              <td
                className={`border p-2`}
              >
                {index > 0 ? (price - product.history[index-1].price).toFixed(2)+"%" : "-" }
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ResponsiveContainer width={"80%"} height={300} className={"justify-center mx-auto mt-4"}>
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
