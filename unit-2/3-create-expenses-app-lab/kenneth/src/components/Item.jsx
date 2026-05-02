import React from "react";
import Button from "./Button";

const Item = ({ ele, idx, deleteExpense }) => {
  const { item, price, date } = ele;

  return (
    <div className="retro-item mb-3 p-3">
      <h3 className="mb-2">Item: {item}</h3>
      <h3 className="mb-2">Price: ${price}</h3>
      <h3 className="mb-3">Date: {date}</h3>
      <Button
        type="button"
        className="btn retro-delete"
        description="delete"
        onClick={() => deleteExpense(idx)}
      />
    </div>
  );
};

export default Item;
