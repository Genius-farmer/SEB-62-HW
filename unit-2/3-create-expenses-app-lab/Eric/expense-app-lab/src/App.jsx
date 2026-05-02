import { useState } from "react";
import "./App.css";
import "./index.css";
import Button from "./components/Button";
import Form from "./components/Form";
import Input from "./components/Input";
import Label from "./components/Label";
import Item from "./components/Item";
import Display from "./components/Display";

function App() {
  const [expense, setExpense] = useState([]);
  const [myInput, setMyInput] = useState({
    item: "",
    price: "",
    date: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMyInput({
      ...myInput,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const myInputWithId = { ...myInput, id: Math.random() };
    console.log("myInput:", myInput);
    console.log("myInputWithId:", myInputWithId);

    setExpense([...expense, myInputWithId]);
    setMyInput({ item: "", price: "", date: "" });
  };

  const deleteExpense = (id) => {
    setExpense(expense.filter((exp) => exp.id !== id));
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        formData={myInput}
      />
      <Display expenses={expense} onDelete={deleteExpense} />
    </>
  );
}

export default App;
