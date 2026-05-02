import React from "react";
import Item from "./Item";
import styles from "../app.module.css";

const Display = (props) => {
  return (
    <div className={`${styles["display"]}`}>
      {props.data.map((row, idx) => {
        return (
          <Item
            item={row.item}
            price={row.price}
            date={row.date}
            key={idx}
            id={idx}
            handleDelete={props.handleDelete}
            handleUpdate={props.handleUpdate}
          />
        );
      })}
    </div>
  );
};

export default Display;
