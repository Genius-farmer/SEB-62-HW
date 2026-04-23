import { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";

const currentDate = new Date().toISOString().split("T")[0];

const Form = (props) => {
  const [formData, setFormData] = useState({
    item: "",
    price: "",
    date: currentDate,
  });

  const handleChange = (event) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
    // console.log(event.target.name, event.target.value);
  };

  const handleSubmit = () => {
    props.onAddExpense({
      ...formData,
      id: Date.now(),
    });
    // props.onAddExpense(formData);
  };

  return (
    <section className="expense-form-card">
      <h2 className="section-title">Add Expense</h2>
      {/* <p>{JSON.stringify(formData)}</p> */}
      <div className="form-grid">
        <Label>Item</Label>
        <Input name="item" value={formData.item} onChange={handleChange} />
        <Label>Price</Label>
        <Input name="price" value={formData.price} onChange={handleChange} />
        <Label>Date</Label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleSubmit}>Add Expense</Button>
    </section>
  );
};

export default Form;
