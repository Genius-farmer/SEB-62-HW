import { useState } from "react";

const StarshipSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    props.searchStarships(searchTerm);
    setPrevSearchTerm(searchTerm);
    setSearchTerm("");
  };

  return (
    <section className="starship-search">
      <p className="search-meta">Number of results: {props.resultCount}</p>
      <p className="search-hint">
        {prevSearchTerm
          ? `Last search: ${prevSearchTerm}`
          : "Search for a starship by name."}
      </p>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          placeholder="e.g. millennium"
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {prevSearchTerm && (
        <button
          className="secondary-button"
          onClick={() => {
            props.resetSearch();
            setPrevSearchTerm("");
          }}
        >
          Show all starships
        </button>
      )}
    </section>
  );
};

export default StarshipSearch;
