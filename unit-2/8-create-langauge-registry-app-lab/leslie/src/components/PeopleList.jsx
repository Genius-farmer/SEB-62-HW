import React, { use, useEffect } from "react";
import styles from "./App.module.css";
import AddPeople from "./AddPeople";
import {
  useAddPerson,
  useAddPersonLanguage,
  useDeletePerson,
  usePeopleListData,
  useRemovePersonLanguage,
  useUpdatePerson,
} from "../services/dataService";
import PeopleCard from "./PeopleCard";
import DataContext from "../context/data-context";

const PeopleList = () => {
  const dataCtx = use(DataContext);

  const [peopleList, setPeopleList] = usePeopleListData();
  const addPerson = useAddPerson();
  const deletePerson = useDeletePerson();
  const updatePerson = useUpdatePerson();
  const addPersonLanguage = useAddPersonLanguage();
  const removePersonLanguage = useRemovePersonLanguage();

  useEffect(() => {
    setPeopleList();
  }, [addPerson.isAdded, deletePerson.isDeleted, updatePerson.isUpdated]);

  const softCheckIfPersonExist = (newPerson) => {
    switch (true) {
      case !newPerson.name:
        return "Name is required.";
      case peopleList.some(
        (person) =>
          person.name === newPerson.name &&
          `${person.age}` === `${newPerson.age}` &&
          person.country === newPerson.country,
      ):
        return "Person with exact details already exist.";
    }
    return "";
  };

  const handleAdd = (newPerson) => {
    addPerson.addDataRequest(newPerson);
  };

  const handleDelete = (personId) => {
    deletePerson.deleteDataRequest(personId);
  };

  const handleUpdate = (updateData) => {
    updatePerson.patchDataRequest(updateData);
  };

  const handleAddPersonLanguage = (id, newLanguage) => {
    addPersonLanguage.addDataRequest(id, newLanguage);
  };

  const handleRemovePersonLanguage = (id, languageToRemove) => {
    removePersonLanguage.deleteDataRequest(id, languageToRemove);
  };

  return (
    <div className="row">
      <h2>Current Users</h2>
      <div className={`row ${styles.listing}`}>
        {peopleList.map((person, idx) => (
          <PeopleCard
            id={person.id}
            name={person.name}
            age={person.age}
            country={person.country}
            key={idx}
            handleDelete={handleDelete}
            check={softCheckIfPersonExist}
            handleUpdate={handleUpdate}
            languageList={dataCtx.languageList}
            handleAddLanguage={handleAddPersonLanguage}
            handleRemoveLanguage={handleRemovePersonLanguage}
          />
        ))}
        <AddPeople handleAdd={handleAdd} check={softCheckIfPersonExist} />
      </div>
    </div>
  );
};

export default PeopleList;
