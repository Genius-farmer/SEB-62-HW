import React from "react";
import Label from "./Label";
import Button from "./Button";
import styles from "../app.module.css";

const Item = (props) => {
  return (
    <div className={`${styles["display-item"]}`} id={props.id}>
      <Label value={props.item} />
      <Label value={props.price} />
      <Label value={props.date} />
      <Button handleClick={() => props.handleUpdate(props.id)}>Update</Button>
      <Button handleClick={() => props.handleDelete(props.id)}>Delete</Button>
    </div>
  );
};

export default Item;
