import React, { use, useEffect } from "react";
import styles from "./App.module.css";
import { useAddLanguage, useDeleteLanguage, useLanguageListData } from "../services/dataService";
import LanguageCard from "./LanguageCard";
import AddLanguage from "./AddLanguage";
import DataContext from "../context/data-context";

const LanguageList = () => {
  const dataCtx = use(DataContext);

  const [languageList, setLanguageList] = useLanguageListData();
  const addLanguageData = useAddLanguage();
  const deleteLanguageData = useDeleteLanguage();

  useEffect(() => {
    setLanguageList();
  }, [addLanguageData.isAdded, deleteLanguageData.isDeleted]);

  useEffect(() => {
    dataCtx.setLanguageList(languageList);
  }, [languageList]);

  const softCheckBeforeAdd = (newLanguage) => {
    return !languageList.some((item) => item.language.toLowerCase() === newLanguage.toLowerCase());
  };

  const handleAdd = (languageName) => {
    addLanguageData.addDataRequest(languageName);
  };

  const handleDelete = (languageName) => {
    deleteLanguageData.deleteDataRequest(languageName);
  };

  return (
    <div className="row">
      <h2>Current Available Languages</h2>
      <div className={`row ${styles.listing}`}>
        {languageList.map((item, idx) => (
          <LanguageCard
            languageName={item.language}
            createdDate={item.created_at}
            key={idx}
            handleDelete={handleDelete}
          />
        ))}
        <AddLanguage handleAdd={handleAdd} check={softCheckBeforeAdd} />
      </div>
    </div>
  );
};

export default LanguageList;
