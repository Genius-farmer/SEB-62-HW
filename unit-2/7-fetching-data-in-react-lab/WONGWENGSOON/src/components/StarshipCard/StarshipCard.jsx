const StarshipCard = (props) => {
  return (
    <li className="starship-card">
      <h2>{props.starship.name}</h2>
      <p>Class: {props.starship.starship_class}</p>
      <p>Manufacturer: {props.starship.manufacturer}</p>
      <p>Model: {props.starship.model}</p>
    </li>
  );
};

export default StarshipCard;
