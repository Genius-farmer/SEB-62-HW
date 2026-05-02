import Button from "./Button";

const Item = ({ id, item, price, date, onDelete }) => {
  return (
    <div className="flex flex-row gap-4 p-8 border border-neutral-200 rounded-md shadow-md bg-lime-50 max-w-full items-center justify-between p-4">
      <h3>
        <strong>Item:</strong> {item}
      </h3>
      <h3>
        <strong>Price:</strong> ${price}
      </h3>
      <h3>
        <strong>Date:</strong> {date}
      </h3>
      <Button
        onClick={() => onDelete(id)}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        Delete
      </Button>
    </div>
  );
};

export default Item;
