import React, { use, useState } from "react";
import Label from "./Label";
import Button from "./Button";
import Input from "./Input";

const Form = ({ addExpense }) => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");

  const submitFn = (e) => {
    e.preventDefault();
    if (!item || !price || !date) return;

    addExpense({
      item,
      price: Number(price),
      date,
    });

    setItem("");
    setPrice(0);
    setDate("");
  };

  return (
    <div>
      <form onSubmit={submitFn}>
        <Label description="Item" htmlFor="item"></Label>
        <Input
          id="item"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
        <Label description="Price" htmlFor="price"></Label>
        <Input
          type="number"
          id="price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <Label description="Date" htmlFor="date"></Label>
        <Input
          type="date"
          id="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <Button type="submit" description="Submit" />
      </form>
    </div>
  );
};

export default Form;
