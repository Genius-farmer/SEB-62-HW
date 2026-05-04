import React, { useState } from "react";
import DataContext from "./context/data-context";
import LanguageList from "./components/LanguageList";
import PeopleList from "./components/PeopleList";

function App() {
  const [languageList, setLanguageList] = useState([]);
  return (
    <div className="container">
      <h1 className="row">Languages Register</h1>
      <DataContext.Provider value={{ languageList, setLanguageList }}>
        <LanguageList />
        <PeopleList />
      </DataContext.Provider>
    </div>
  );
}

export default App;
