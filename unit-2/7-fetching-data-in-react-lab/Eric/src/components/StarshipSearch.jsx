import React from "react";
import { useState } from "react";
import "../App.css";

const StarshipSearch = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setPrevSearchTerm(search);
    setSearch("");
    onSearch(search);
  };

  const handleReset = () => {
    setSearch("");
    setPrevSearchTerm("");
    onSearch("");
  };

  return (
    <section>
      <h2>Search</h2>
      <form onSubmit={handleSubmit}>
        <label>Search Term:</label>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Look for a starship..."
        />
        <button type="submit">Search</button>
      </form>
      {prevSearchTerm
        ? `Last Searched: ${prevSearchTerm}`
        : "Search for a starship!"}
      {prevSearchTerm && <button onClick={handleReset}>Show all starships</button>}
    </section>
  );
};

export default StarshipSearch;
