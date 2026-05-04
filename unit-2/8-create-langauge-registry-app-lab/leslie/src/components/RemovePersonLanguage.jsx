import React, { useState } from "react";
import styles from "./App.module.css";

const RemovePersonLanguage = (props) => {
  const [language, setLanguage] = useState(props.personLanguageList[0]);

  return (
    <>
      <select className={styles.select} value={language} onChange={(e) => setLanguage(e.target.value)}>
        {props.personLanguageList.map((item, idx) => (
          <option value={item} key={idx}>
            {item}
          </option>
        ))}

        {props.personLanguageList.length === 0 && <option value="">No language available</option>}
      </select>
      <div className={styles.actions}>
        <button onClick={() => props.handleRemove(language)} disabled={props.personLanguageList.length === 0}>
          REMOVE
        </button>
        <button onClick={props.handleCancel}>CANCEL</button>
      </div>
    </>
  );
};

export default RemovePersonLanguage;
