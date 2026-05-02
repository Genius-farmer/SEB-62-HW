// Reusable Button component partial codes
const Button = (props) => {
  return (
    <button
      className={
        "px-4 py-2 text-sm font-medium text-white bg-emerald-700 border border-transparent rounded-md shadow-sm transition-all duration-200 ease-in-out hover:bg-emerald-800 hover:shadow-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
      }
      type="text"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
