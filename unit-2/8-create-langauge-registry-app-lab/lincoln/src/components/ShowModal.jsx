import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import React, { useRef } from "react";
import styles from "./Modal.module.css";

const OverLay = (props) => {
  const queryClient = useQueryClient();
  const url = "http://localhost:5001";
  const languageRef = useRef();

  // --------------GET USER LANGUAGE BY POST----------------------------------
  const getUserLanguages = async () => {
    const res = await fetch(url + "/lab/users/languages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: props.id }),
    });
    if (!res.ok) {
      throw new Error("Cannot fetch user languages");
    }
    return await res.json(); // Returns array of language strings
  };

  // useQuery hook to fetch and cache the languages
  const languageQuery = useQuery({
    queryKey: ["userLanguages", props.id], // unique key includes user ID
    queryFn: getUserLanguages,
  });

  // --------------DELETE LANGUAGE FROM USER----------------------------------
  const deleteLanguageFromUser = async () => {
    const res = await fetch(url + "/lab/users/languages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: props.id,
        language: languageRef.current.value,
      }),
    });
    if (!res.ok) {
      throw new Error("Cannot delete language from user");
    }
    return await res.json();
  };

  const deleteLanguageMutation = useMutation({
    mutationFn: deleteLanguageFromUser,
    onSuccess: () => {
      // Refresh the language list after deletion
      queryClient.invalidateQueries({
        queryKey: ["userLanguages", props.id],
      });
      languageRef.current.value = "";
    },
  });

  // --------------ADD LANGUAGE TO USER----------------------------------
  const addLanguageToUser = async () => {
    const res = await fetch(url + "/lab/users/languages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: props.id,
        language: languageRef.current.value,
      }),
    });
    if (!res.ok) {
      throw new Error("Cannot add language to user");
    }
    return await res.json();
  };

  const addLanguageMutation = useMutation({
    mutationFn: addLanguageToUser,
    onSuccess: () => {
      // Refresh the language list after adding
      queryClient.invalidateQueries({
        queryKey: ["userLanguages", props.id],
      });
      languageRef.current.value = "";
    },
  });
  //----------------------------RETURN---------------------------------------------
  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <h3>Languages for {props.name}</h3>

          {languageQuery.isPending && <p>Loading languages...</p>}
          {languageQuery.isError && <p>Error: {languageQuery.error.message}</p>}
          {addLanguageMutation.isPending && <p>Adding languages...</p>}
          {addLanguageMutation.isError && (
            <p>Add Error: {addLanguageMutation.error.message}</p>
          )}
          {deleteLanguageMutation.isPending && <p>deleting languages...</p>}
          {deleteLanguageMutation.isError && (
            <p>Delete Error: {deleteLanguageMutation.error.message}</p>
          )}

          {languageQuery.isSuccess && (
            <div>
              <h4>User Languages:</h4>
              {languageQuery.data.length > 0 ? (
                <ul>
                  {languageQuery.data.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              ) : (
                <p>No languages added yet</p>
              )}
            </div>
          )}

          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-md-3"></div>
            <div className="col-md-3">Input Language:</div>
            <input
              ref={languageRef}
              type="text"
              className="col-md-3"
              placeholder="Enter language name"
            />
            <div className="col-md-3"></div>
          </div>

          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-md-2"></div>
            <button
              onClick={addLanguageMutation.mutate}
              className="col-md-2"
              //    prevent multiple click during loading
              disabled={addLanguageMutation.isPending}
            >
              ADD
            </button>
            <button
              onClick={deleteLanguageMutation.mutate}
              className="col-md-2"
              //    prevent multiple click during loading
              disabled={deleteLanguageMutation.isPending}
            >
              DELETE
            </button>
            <button
              onClick={() => props.setShowMoreModal(false)}
              className="col-md-2"
            >
              CANCEL
            </button>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const ShowModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          name={props.name}
          setShowMoreModal={props.setShowMoreModal}
        />,
        document.querySelector("#modal-root"),
      )}
    </>
  );
};

export default ShowModal;
