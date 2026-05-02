import React from "react";

const Button = ({ description, className = "", type = "button", onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {description}
    </button>
  );
};

export default Button;
