import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

const AddPersonLanguage = (props) => {
  const filteredList = props.languageList.filter((item) => !props.personLanguageList.includes(item.language));
  const [language, setLanguage] = useState(filteredList.length > 0 ? filteredList[0].language : "");

  return (
    <>
      <select className={styles.select} value={language} onChange={(e) => setLanguage(e.target.value)}>
        {filteredList.map((item, idx) => (
          <option value={item.language} key={idx}>
            {item.language}
          </option>
        ))}

        {filteredList.length === 0 && <option value="">No language available</option>}
      </select>
      <div className={styles.actions}>
        <button onClick={() => props.handleAdd(language)} disabled={filteredList.length === 0}>
          ADD
        </button>
        <button onClick={props.handleCancel}>CANCEL</button>
      </div>
    </>
  );
};

export default AddPersonLanguage;
