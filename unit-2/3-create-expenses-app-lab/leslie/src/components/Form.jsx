import React from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import styles from "../app.module.css";

const Form = (props) => {
  const handleChange = (e) => {
    const newData = [...props.data];
    newData.find((row) => row.name === e.target.name).value = e.target.value;
    props.setData(newData);
  };

  return (
    <div className={`${styles["form"]}`}>
      {props.data.map((row, idx) => {
        return (
          <div key={idx}>
            <Label value={row.label} className={`${styles["form-label"]}`} />
            <Input
              type={row.type || "text"}
              name={row.name}
              value={row.value}
              onChange={handleChange}
              className={`${styles["form-input"]}`}
            />
          </div>
        );
      })}
      <Button handleClick={props.handleSubmit}>Submit</Button>
    </div>
  );
};

export default Form;
