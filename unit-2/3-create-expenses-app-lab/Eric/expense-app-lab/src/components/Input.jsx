const Input = ({
  id,
  name = "",
  value = "",
  onChange,
  type = "text",
  className = "w-full px-3 py-2 text-sm text-neutral-700 bg-transparent border border-neutral-200 rounded-md shadow-sm placeholder:text-neutral-400 transition-all duration-200 ease-in-out hover:border-neutral-300 focus:outline-none focus:border-neutral-400 focus:shadow-md",
  ...props
}) => {
  return (
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      className={className}
      {...props}
    />
  );
};

export default Input;
