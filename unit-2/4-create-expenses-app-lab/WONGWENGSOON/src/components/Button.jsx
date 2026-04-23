const Button = (props) => {
  return (
    <button
      className={`btn ${props.className || ""}`.trim()}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
