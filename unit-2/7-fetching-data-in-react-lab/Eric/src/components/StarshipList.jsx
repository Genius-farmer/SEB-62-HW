import React from "react";
import StarshipCard from "./StarshipCard";
import "../App.css";

const StarshipList = ({ starships, loading }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h2>Starships</h2>
      <p>Number of results: {starships.length}</p>
      <ul>
        {starships.map((starship) => (
          <StarshipCard key={starship.name} starship={starship} />
        ))}
      </ul>
    </section>
  );
};

export default StarshipList;
