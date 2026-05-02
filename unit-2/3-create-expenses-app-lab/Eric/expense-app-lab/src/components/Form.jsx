// import {expense} from "../App";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";

const Form = ({ onSubmit, onChange, formData }) => {
  return (
    <div className="flex flex-col gap-2 p-16 border border-neutral-200 rounded-md shadow-md bg-neutral-50 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold my-8 text-center text-neutral-700">
        Expense Tracker
      </h1>
      <Label>Item</Label>
      <Input id="item" name="item" value={formData.item} onChange={onChange} />
      <Label>Price</Label>
      <Input
        id="price"
        name="price"
        value={formData.price}
        onChange={onChange}
      />
      <Label>Date</Label>
      <Input id="date" name="date" value={formData.date} onChange={onChange} />
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
};

export default Form;
