import React from "react";
import "../App.css";

const StarshipCard = ({ starship }) => {
  return (
    <li>
      <h3>{starship.name}</h3>
      <p>
        <strong>Class:</strong> {starship.starship_class}
      </p>
      <p>
        <strong>Manufacturer:</strong> {starship.manufacturer}
      </p>
      <p>
        <strong>Model:</strong> {starship.model}
      </p>
    </li>
  );
};

export default StarshipCard;
