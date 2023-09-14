import React from "react";

const Input = ({ type, name, placeholder, register }) => {
  return (
    <input
      className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
      type={type || "text"}
      {...register(name)}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
