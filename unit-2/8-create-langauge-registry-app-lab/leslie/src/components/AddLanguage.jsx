import React, { useState } from "react";
import styles from "./App.module.css";

const AddLanguage = (props) => {
  const [input, setInput] = useState("");
  const [notify, setNotify] = useState(false);

  const handleAdd = () => {
    if (props.check(input)) {
      props.handleAdd(input);
      setInput("");
    } else {
      setNotify(true);
    }
  };
  return (
    <div className={styles.card}>
      <div className={styles.title}>Add a new Language</div>
      <div className={styles.form}>
        <input
          type="text"
          maxLength={10}
          placeholder="New language"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>ADD</button>
      </div>
      {notify && <div>language already exist.</div>}
    </div>
  );
};

export default AddLanguage;
