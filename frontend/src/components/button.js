import React from "react";

const Button = ({ type, text }) => {
  return (
    <button
      type={type || "submit"}
      className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
    >
      {text}
    </button>
  );
};

export default Button;
