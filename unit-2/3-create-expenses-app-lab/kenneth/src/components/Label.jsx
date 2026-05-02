import React from "react";

const Label = ({ description, htmlFor }) => {
  return (
    <label className="retro-label form-label" htmlFor={htmlFor}>
      {description}:
    </label>
  );
};

export default Label;
