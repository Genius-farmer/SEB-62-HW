import React from "react";

const Input = (props) => {
  return (
    <>
      <input
        type={props.type}
        className={props.className}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};

export default Input;
