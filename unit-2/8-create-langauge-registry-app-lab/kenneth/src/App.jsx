import React, { useEffect, useState } from "react";
import DisplayPeople from "./components/DisplayPeople";
import DisplayLanguages from "./components/DisplayLanguages";

const App = () => {
  const [languages, setLanguages] = useState([]);

  const getLanguagesData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages/");

      if (!res.ok) {
        throw new Error("fetch error");
      }

      const data = await res.json();
      setLanguages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLanguagesData();
  }, []);

  return (
    <div className="container">
      <h1 className="app-title">Languages Register App</h1>

      <div className="app-layout">
        <div className="languages-section-container">
          <DisplayLanguages
            languages={languages}
            refreshLanguages={getLanguagesData}
          />
        </div>

        <div className="people-section-container">
          <DisplayPeople
            languages={languages}
            refreshLanguages={getLanguagesData}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
