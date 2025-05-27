import { Link } from "react-router-dom";

const COLORS_BY_TYPE = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  ghost: "bg-transparent text-gray-500",
  neutral: "bg-blue-500 text-white",
};

const COLORS_HOVER_BY_TYPE = {
  success: "hover:bg-green-700",
  error: "hover:bg-red-700",
  ghost: "hover:bg-gray-400 hover:text-white",
  neutral: "hover:bg-blue-700",
};

export const Button = ({ label, onClick = () => {}, type = "ghost", children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${COLORS_BY_TYPE[type]} rounded cursor-pointer ${COLORS_HOVER_BY_TYPE[type]} transition duration-200 ease-in-out`}
    >
      {label}
      {children}
    </button>
  );
};

export const ButtonLink = ({ label, to,children }) => {
  return (
    <Link to={to}>
      <Button label={label} children={children} />
    </Link>
  );
};
