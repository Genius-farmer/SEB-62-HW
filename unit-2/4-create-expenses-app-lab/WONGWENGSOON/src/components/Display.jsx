import Item from "./Item";

const Display = (props) => {
  return (
    <section className="expense-list-card">
      <h2 className="section-title">Recent Expenses</h2>
      {props.expenses.length === 0 && (
        <p className="empty-state">
          No expenses yet. Add your first one above.
        </p>
      )}
      {props.expenses.map((expense, index) => (
        <Item key={expense.id} expense={expense} onDelete={props.onDelete} />
      ))}
    </section>
  );
};

export default Display;
