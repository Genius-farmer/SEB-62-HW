const Label = (props) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {props.children}
    </label>
  );
};

export default Label;
