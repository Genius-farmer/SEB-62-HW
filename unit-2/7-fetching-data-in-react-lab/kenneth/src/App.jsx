import React from "react";
import { index } from "../services/starshipService.js";
import { useState } from "react";
import { useEffect } from "react";
import StarshipSearch from "./components/StarshipSearch.jsx";
import StarshipList from "./components/StarshipList.jsx";

function App() {
  const [starshipsData, setStarshipsData] = useState([]);
  const [displayedStarships, setDisplayedStarships] = useState([]);
  const [lastSearch, setLastSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await index();
      setStarshipsData(data);
      setDisplayedStarships(data);
    };
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setLastSearch(query);

    const filtered = starshipsData.filter((ship) =>
      ship.name.toLowerCase().includes(query.toLowerCase()),
    );

    setDisplayedStarships(filtered);
  };

  const handleReset = () => {
    setDisplayedStarships(starshipsData);
    setLastSearch("");
  };

  return (
    <>
      <h1>Star Wars API</h1>
      <StarshipSearch
        onSearch={handleSearch}
        count={displayedStarships.length}
        lastSearch={lastSearch}
        onReset={handleReset}
      />

      <StarshipList starships={displayedStarships} />
    </>
  );
}

export default App;
