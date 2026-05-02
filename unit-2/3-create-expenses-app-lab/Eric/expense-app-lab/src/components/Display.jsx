import Item from "./Item";

const Display = ({ expenses = [], onDelete }) => {
  return (
    <div className="flex flex-col gap-4 p-16 border border-neutral-200 rounded-md shadow-md bg-neutral-50 max-w-4xl mx-auto p-4">
      {expenses.map((expense) => (
        <Item
          key={expense.id}
          id={expense.id}
          item={expense.item}
          price={expense.price}
          date={expense.date}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Display;
