import React from "react";
import { useState } from "react";

const StarshipSearch = (props) => {
  const [query, setQuery] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSearch(query);
    setPrevSearchTerm(query);
    setQuery("");
  };

  return (
    <div>
      <p>
        {prevSearchTerm
          ? `Last search: ${prevSearchTerm}`
          : `Search for a starship by name`}
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchInput">Search Term:</label>
        <input
          id="searchInput"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <h3>Starships</h3>
      <p>Number of results: {props.count}</p>
      {prevSearchTerm && (
        <button onClick={props.onReset}>Show all starships</button>
      )}
    </div>
  );
};

export default StarshipSearch;
