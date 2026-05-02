import React from "react";
import StarshipCard from "./StarshipCard";
import styles from "./StarshipList.module.css";

const StarshipList = (props) => {
  const { searchTerm, searchString } = props.searchDetails;
  let resultsString = "";
  if (searchString) {
    resultsString = `Found ${props.starships.length} starship${props.starships.length > 1 ? "s" : ""} with ${searchTerm} like "${searchString}"`;
  } else {
    resultsString = `Showing all ${props.starships.length} starship${props.starships.length > 1 ? "s" : ""}`;
  }

  return (
    <div className={`container`}>
      <h2 className="row">Starships</h2>
      <div className="row">{resultsString}</div>
      <div className={`row ${styles.listing}`}>
        {props.starships.map((starship, idx) => (
          <StarshipCard starship={starship} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default StarshipList;
