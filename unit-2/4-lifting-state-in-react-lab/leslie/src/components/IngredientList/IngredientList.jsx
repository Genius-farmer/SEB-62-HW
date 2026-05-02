const IngredientList = (props) => {
  return (
    <ul>
      {props.data.map((ingredient, idx) => {
        return (
          <li style={{ backgroundColor: ingredient.color }}>
            {ingredient.name}
            <button onClick={() => props.handleClick(ingredient)}>+</button>
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientList;
