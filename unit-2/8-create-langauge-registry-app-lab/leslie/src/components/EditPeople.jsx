import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

const EditPeople = (props) => {
  const [inputName, setInputName] = useState(props.name);
  const [inputAge, setInputAge] = useState(props.age || "");
  const [inputCountry, setInputCountry] = useState(props.country || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const handleUpdate = () => {
    const updateData = { user_id: props.id, name: inputName, age: inputAge, country: inputCountry };
    const msg = props.check(updateData);
    if (!msg) {
      props.handleUpdate(updateData);
    } else {
      setErrorMessage(msg);
    }
  };

  useEffect(() => {
    setHasChanges(inputName !== props.name || `${inputAge}` !== `${props.age}` || inputCountry !== props.country);
  }, [inputName, inputAge, inputCountry]);

  return (
    <>
      <div className={styles.title}>Update particulars</div>
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
        <div>
          <button disabled={!hasChanges} onClick={handleUpdate}>
            UPDATE
          </button>
          <button onClick={props.handleCancel}>CANCEL</button>
        </div>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
};

export default EditPeople;
