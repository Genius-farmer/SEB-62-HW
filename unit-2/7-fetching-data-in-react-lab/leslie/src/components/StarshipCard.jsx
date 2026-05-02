import React from "react";
import styles from "./StarshipCard.module.css";

const StarshipCard = (props) => {
  const starship = props.starship;
  return (
    <div className={styles.card}>
      <div className={styles.title}>{starship.name}</div>
      <div>{`Class: ${starship.starship_class}`}</div>
      <div>{`Manufacturer: ${starship.manufacturer}`}</div>
      <div>{`Model: ${starship.model}`}</div>
    </div>
  );
};

export default StarshipCard;
