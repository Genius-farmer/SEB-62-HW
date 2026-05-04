import React, { useState } from "react";
import styles from "./App.module.css";

const AddPeople = (props) => {
  const [inputName, setInputName] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = () => {
    const newPerson = { name: inputName, age: inputAge, country: inputCountry };
    const msg = props.check(newPerson);
    if (!msg) {
      props.handleAdd(newPerson);
      setInputName("");
      setInputAge("");
      setInputCountry("");
    } else {
      setErrorMessage(msg);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>Add a new User</div>
      <div className={styles.form}>
        <input
          type="text"
          maxLength={50}
          placeholder="Name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="text"
          maxLength={3}
          placeholder="Age (Optional)"
          value={inputAge}
          onChange={(e) => setInputAge(e.target.value)}
        />
        <input
          type="text"
          maxLength={50}
          placeholder="Country (Optional)"
          value={inputCountry}
          onChange={(e) => setInputCountry(e.target.value)}
        />
        <button onClick={handleAdd}>ADD</button>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default AddPeople;
