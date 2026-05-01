import StarshipCard from "../StarshipCard/StarshipCard";

const StarshipList = (props) => {
  if (props.starships.length === 0) {
    return <p className="empty-state">Loading...</p>;
  }

  return (
    <section className="starship-list">
      <ul className="starship-grid">
        {props.starships.map((starship) => (
          <StarshipCard key={starship.name} starship={starship} />
        ))}
      </ul>
    </section>
  );
};

export default StarshipList;
