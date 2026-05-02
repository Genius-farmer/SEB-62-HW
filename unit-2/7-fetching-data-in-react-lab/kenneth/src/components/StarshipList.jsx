import React from "react";
import StarshipCard from "./StarshipCard";

const StarshipList = ({ starships }) => {
  if (!starships.length) return <p>Please enter a valid Starship name</p>;

  return (
    <div className="starship-grid">
      {starships.map((ship, idx) => (
        <StarshipCard key={idx} ship={ship} />
      ))}
    </div>
  );
};

export default StarshipList;
