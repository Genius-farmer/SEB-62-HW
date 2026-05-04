import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import EditPeople from "./EditPeople";
import { usePersonLanguageListData } from "../services/dataService";
import AddPersonLanguage from "./AddPersonLanguage";
import RemovePersonLanguage from "./RemovePersonLanguage";

const PeopleCard = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [personLanguageList, setPersonLanguageList] = usePersonLanguageListData();
  const [isAddLanguage, setIsAddLanguage] = useState(false);
  const [isRemoveLanguage, setIsRemoveLanguage] = useState(false);

  useEffect(() => {
    setPersonLanguageList(props.id);
  }, [isAddLanguage, isRemoveLanguage]);

  const handleDelete = () => {
    props.handleDelete(props.id);
    setIsDelete(false);
  };

  const handleEnableEdit = () => {
    setIsEdit(true);
  };

  const handleUpdate = (updateData) => {
    setIsEdit(false);
    props.handleUpdate(updateData);
  };

  const handleAddLanguage = (newLanguage) => {
    setIsAddLanguage(false);
    props.handleAddLanguage(props.id, newLanguage);
  };

  const handleRemoveLanguage = (languageToRemove) => {
    setIsRemoveLanguage(false);
    props.handleRemoveLanguage(props.id, languageToRemove);
  };

  return (
    <div className={styles.card}>
      {isEdit ? (
        <EditPeople
          id={props.id}
          name={props.name}
          age={props.age}
          country={props.country}
          check={props.check}
          handleUpdate={handleUpdate}
          handleCancel={() => setIsEdit(false)}
        />
      ) : (
        <>
          <div className={styles.cardSection}>
            <div className={styles.title}>{props.name}</div>
            <div className={styles.sub}>{`Age: ${props.age}`}</div>
            <div className={styles.sub}>{`Country: ${props.country}`}</div>
            <div className={styles.break}></div>
            {!isDelete ? (
              <>
                <div className={styles.actions}>
                  <button onClick={handleEnableEdit}>EDIT</button>
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
          <br />
          <div className={styles.cardSection}>
            <div className={styles.sub}>Known Languages:</div>
            {personLanguageList.map((language, idx) => (
              <div className={styles.sub} key={idx}>{`${idx + 1}. ${language}`}</div>
            ))}
            <div className={styles.break}></div>
            <>
              {isAddLanguage && (
                <>
                  <div className={styles.emphasis}>Select language to add:</div>

                  <AddPersonLanguage
                    languageList={props.languageList}
                    personLanguageList={personLanguageList}
                    handleAdd={handleAddLanguage}
                    handleCancel={() => setIsAddLanguage(false)}
                  />
                </>
              )}
              {isRemoveLanguage && (
                <>
                  <div className={styles.emphasis}>Select language to remove:</div>
                  <RemovePersonLanguage
                    personLanguageList={personLanguageList}
                    handleRemove={handleRemoveLanguage}
                    handleCancel={() => setIsRemoveLanguage(false)}
                  />
                </>
              )}
              {!isAddLanguage && !isRemoveLanguage && (
                <>
                  <div className={styles.actions}>
                    <button onClick={() => setIsAddLanguage(true)}>ADD</button>
                    <button onClick={() => setIsRemoveLanguage(true)} disabled={personLanguageList.length === 0}>
                      REMOVE
                    </button>
                  </div>
                </>
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default PeopleCard;
