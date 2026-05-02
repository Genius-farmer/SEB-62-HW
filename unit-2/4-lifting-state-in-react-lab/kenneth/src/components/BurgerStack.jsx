import React from "react";

const BurgerStack = ({ stack, removeFromBurger }) => {
  return (
    <ul>
      {stack.map((ingredient, idx) => {
        return (
          <li key={idx} style={{ backgroundColor: ingredient.color }}>
            {ingredient.name}
            <button
              onClick={() => {
                removeFromBurger(idx);
              }}
            >
              x
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default BurgerStack;
