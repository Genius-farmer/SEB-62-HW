import React from "react";

const StarshipCard = ({ ship }) => {
  return (
    <div className="starship-card">
      <h2>{ship.name}</h2>
      <p>class: {ship.starship_class}</p>
      <p>Manufacturer: {ship.manufacturer}</p>
      <p>Model: {ship.model}</p>
    </div>
  );
};

export default StarshipCard;
