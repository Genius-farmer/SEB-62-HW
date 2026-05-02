import React, { useState } from "react";
import Form from "./components/Form";
import Display from "./components/Display";
import styles from "./app.module.css";

function App() {
  const getInitFormData = () => {
    return [
      { label: "Item", name: "item", value: "" },
      { label: "Price", name: "price", value: "" },
      { label: "Date", name: "date", value: new Date().toISOString().split("T")[0], type: "date" },
    ];
  };

  const initDisplayData = [];

  const [formData, setFormData] = useState(getInitFormData());
  const [displayData, setDisplayData] = useState(initDisplayData);

  const handleFormSubmit = () => {
    const newData = { item: formData[0].value, price: formData[1].value, date: formData[2].value };
    const newDisplayData = [...displayData, newData];
    setDisplayData(newDisplayData);
    setFormData(getInitFormData());
  };

  const handleDisplayDelete = (id) => {
    setDisplayData((prevState) => [...prevState].toSpliced(id, 1));
  };

  const handleDisplayUpdate = (id) => {
    const newData = { item: formData[0].value, price: formData[1].value, date: formData[2].value };
    setDisplayData((prevState) => [...prevState].toSpliced(id, 1, newData));
  };

  return (
    <div className={`${styles["app"]}`}>
      <Form data={formData} setData={setFormData} handleSubmit={handleFormSubmit} />
      <Display data={displayData} handleDelete={handleDisplayDelete} handleUpdate={handleDisplayUpdate} />
    </div>
  );
}

export default App;
