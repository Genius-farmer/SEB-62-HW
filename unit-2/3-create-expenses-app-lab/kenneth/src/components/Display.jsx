import React from "react";
import Item from "./Item";

const Display = ({ expenses, deleteExpense }) => {
  return (
    <div className="display-container">
      {expenses.map((ele, idx) => (
        <Item ele={ele} idx={idx} key={idx} deleteExpense={deleteExpense} />
      ))}
    </div>
  );
};

export default Display;
