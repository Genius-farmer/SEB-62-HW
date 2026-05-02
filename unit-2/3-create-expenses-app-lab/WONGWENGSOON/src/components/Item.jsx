import Button from "./Button";
const Item = (props) => {
  return (
    <article className="expense-item">
      <p className="expense-item-name">{props.expense.item}</p>
      <p className="expense-item-price">${props.expense.price}</p>
      <p className="expense-item-date">{props.expense.date}</p>

      <Button
        className="btn-danger"
        onClick={() => props.onDelete(props.expense.id)}
      >
        Delete
      </Button>
    </article>
  );
};

export default Item;
