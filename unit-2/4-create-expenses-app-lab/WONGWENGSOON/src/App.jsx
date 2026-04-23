import { useState } from "react";
import Form from "./components/Form";
import Display from "./components/Display";

const App = () => {
  const [expense, setExpense] = useState([]);

  const handleAddExpense = (expense) => {
    setExpense((prevExpense) => [...prevExpense, expense]);
  };

  const handleDelete = (id) => {
    setExpense((prevExpense) =>
      prevExpense.filter((expense) => expense.id !== id),
    );
  };
  return (
    <main className="app-shell">
      <h1 className="app-title">Expense Tracker</h1>
      <Form onAddExpense={handleAddExpense} />
      <Display expenses={expense} onDelete={handleDelete} />
    </main>
  );
};
export default App;
