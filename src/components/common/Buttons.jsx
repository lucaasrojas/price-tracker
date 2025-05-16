import { Link } from "react-router-dom";

const COLORS_BY_TYPE = {
  success: "bg-green-500",
  error: "bg-red-500",
  ghost: "bg-transparent",
  neutral: "bg-blue-500",
};

const COLORS_HOVER_BY_TYPE = {
  success: "hover:bg-green-700",
  error: "hover:bg-red-700",
  ghost: "hover:bg-gray-200",
  neutral: "hover:bg-blue-700",
};

const TEXT_COLORS_BY_TYPE = {
  success: "text-white",
  error: "text-white",
  ghost: "text-gray-500",
  neutral: "text-white",
};

export const Button = ({ label, onClick = () => {}, type = "ghost" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${COLORS_BY_TYPE[type]} ${TEXT_COLORS_BY_TYPE[type]} rounded cursor-pointer ${COLORS_HOVER_BY_TYPE[type]} transition duration-200 ease-in-out`}
    >
      {label}
    </button>
  );
};

export const ButtonLink = ({ label, to }) => {
  return (
    <Link to={to}>
      <Button label={label} />
    </Link>
  );
};
