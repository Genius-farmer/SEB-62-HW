import { useEffect, useState } from "react";
import * as starshipService from "./services/starshipService";
import StarshipSearch from "./components/StarshipSearch/StarshipSearch";
import StarshipList from "./components/StarshipList/StarshipList";

const App = () => {
  const [starshipsData, setStarshipsData] = useState([]);
  const [displayedStarships, setDisplayedStarships] = useState([]);

  useEffect(() => {
    const getStarships = async () => {
      const data = await starshipService.index();
      setStarshipsData(data);
      setDisplayedStarships(data);
    };

    getStarships();
  }, []);

  const searchStarships = (searchTerm) => {
    const filteredStarships = starshipsData.filter((starship) =>
      starship.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setDisplayedStarships(filteredStarships);
  };

  const resetSearch = () => {
    setDisplayedStarships(starshipsData);
  };

  return (
    <main className="app">
      <h1 className="app-title">Star Wars API</h1>

      <StarshipSearch
        searchStarships={searchStarships}
        resultCount={displayedStarships.length}
        resetSearch={resetSearch}
      />

      <StarshipList starships={displayedStarships} />
    </main>
  );
};

export default App;
