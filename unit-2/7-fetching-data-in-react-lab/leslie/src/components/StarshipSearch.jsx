import React, { useState } from "react";
import styles from "./StarshipSearch.module.css";

const StarshipSearch = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    props.setStarships(searchInput);
    props.setSearchDetails({ searchTerm: "name", searchString: searchInput });
    setSearchInput("");
  };

  const handleKeyDown = (isEnterKey) => {
    if (isEnterKey) {
      handleSearch(searchInput);
    }
  };

  const resetSearch = () => {
    setSearchInput("");
    props.setStarships(searchInput);
    props.setSearchDetails({ searchTerm: "name", searchString: searchInput });
  };

  return (
    <div className={`container ${styles.search}`}>
      <h2 className="row">Search</h2>
      <div className={`row ${styles.baseline}`}>
        <div className={`col-md-2 ${styles["padding-left-0"]}`}>Search Term:</div>
        <div className="col-md-8">
          <input
            type="text"
            name="searchBy"
            placeholder="starship name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e.key === "Enter")}
          />
          <button onClick={handleSearch}>Search</button>
          {props.isSearchApplied && (
            <button className={styles.reset} onClick={resetSearch}>
              Reset
            </button>
          )}
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default StarshipSearch;
