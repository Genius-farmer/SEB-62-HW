import React, { useState } from "react";
import Label from "./components/Label";
import Form from "./components/Form";
import Display from "./components/Display";

function App() {
  const [expenses, setExpenses] = useState([]);
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (idx) => {
    setExpenses(expenses.toSpliced(idx, 1));
  };

  return (
    <div className="app-container">
      <h1>Expense app:</h1>
      <Form addExpense={addExpense} />
      <h1>Tasks added:</h1>
      <Display expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;
