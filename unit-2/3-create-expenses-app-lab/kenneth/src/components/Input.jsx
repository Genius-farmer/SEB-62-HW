import React from "react";

const Input = ({ id, onChange, value, type = "text", className = "" }) => {
  return (
    <input
      id={id}
      onChange={onChange}
      value={value}
      type={type}
      className={className}
    />
  );
};

export default Input;
