

const Table = ({ columns, values, showActions = false }) => {
    return (
      <table className="w-full shadow-lg rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-black text-white rounded-2xl">
            {columns.map(({ label }, index) => (
              <th className="p-2">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="rounded-2xl">
          {values.map((value) => (
            <tr
              key={value.id}
              className="hover:bg-gray-200 transition duration-200 ease-in-out"
            >
              {columns.map(({ key }, index) => (
                <td className=" p-2">{value[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default Table