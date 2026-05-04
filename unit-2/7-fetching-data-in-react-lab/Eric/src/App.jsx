import { useState } from "react";
import StarshipSearch from "./components/StarshipSearch";
import StarshipList from "./components/StarshipList";
import { useEffect } from "react";
import { index } from "./services/starShipService";
import "./App.css";

function App() {
  const [starShipData, setStarShipData] = useState([]);
  const [displayedStarships, setDisplayedStarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStarships = async () => {
      const data = await index();
      console.log("API returned:", data);
      setStarShipData(data);
      setDisplayedStarships(data);
      setLoading(false);
    };

    fetchStarships();
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredStarships = starShipData.filter((starship) =>
      starship.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setDisplayedStarships(filteredStarships);
  };

  return (
    <>
      <h1>Starwars Starship</h1>
      <StarshipSearch onSearch={handleSearch} />
      <StarshipList starships={displayedStarships} loading={loading} />
    </>
  );
}

export default App;
