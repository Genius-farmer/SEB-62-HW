import React from "react";

const Label = (props) => {
  return (
    <>
      <label className={props.className}>{props.value}</label>
    </>
  );
};

export default Label;
