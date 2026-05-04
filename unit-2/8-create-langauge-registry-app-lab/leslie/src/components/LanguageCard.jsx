import React, { useState } from "react";
import styles from "./App.module.css";

const LanguageCard = (props) => {
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = () => {
    props.handleDelete(props.languageName);
    setIsDelete(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>{props.languageName}</div>
      <div className={styles.sub}>{`Added on ${props.createdDate}`}</div>
      <div className={styles.break}></div>
      {!isDelete ? (
        <>
          <div className={styles.actions}>
            <button onClick={() => setIsDelete(true)}>DELETE</button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.emphasis}>Please confirm delete request:</div>
          <div className={styles.actions}>
            <button onClick={handleDelete}>CONFIRM</button>
            <button onClick={() => setIsDelete(false)}>CANCEL</button>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageCard;
