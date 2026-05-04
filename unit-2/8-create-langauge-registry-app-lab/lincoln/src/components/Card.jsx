import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import UpdateModal from "./UpdateModal";
import ShowModal from "./ShowModal";

const Card = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const queryClient = useQueryClient();
  const url = "http://localhost:5001";

  //---------------Delete User----------------------------------------
  const deleteUser = async () => {
    const res = await fetch(url + "/lab/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: props.id }),
    });
    if (!res.ok) {
      throw new Error("Cannot delete user, check url or connection");
    }
  };

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  //---------------Delete Language----------------------------------------
  const deleteLanguage = async () => {
    const res = await fetch(url + "/lab/languages/" + props.language, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Cannot delete language, check url or connection");
    }
  };

  const deleteLanguageMutation = useMutation({
    mutationFn: deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  //----------------------RETURN-------------------------------------------
  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          name={props.user}
          age={props.age}
          country={props.country}
          getData={props.getData}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      {showMoreModal && (
        <ShowModal
          id={props.id}
          name={props.user}
          setShowMoreModal={setShowMoreModal}
        />
      )}

      {props.language && (
        <div className="language-container">
          {deleteLanguageMutation.isLoading && <h3>Loading...</h3>}
          {deleteLanguageMutation.isError && (
            <h3>{deleteLanguageMutation.error.message}</h3>
          )}
          <div className="row">
            <div className="col-md-4">{props.language}</div>
            <div className="col-md-2"></div>
            <div className="col-md-2"></div>
            <div className="col-md-2"></div>
            <button
              className="col-md-2"
              onClick={deleteLanguageMutation.mutate}
            >
              DELETE
            </button>
          </div>
          <br />
        </div>
      )}

      {props.user && (
        <div className="user-container">
          {deleteUserMutation.isLoading && <h3>Loading...</h3>}
          {deleteUserMutation.isError && (
            <h3>{deleteUserMutation.error.message}</h3>
          )}
          <div className="row">
            <div className="col-md-2">{props.user}</div>
            <div className="col-md-2">{props.age}</div>
            <div className="col-md-2">{props.country}</div>
            <button className="col-md-2" onClick={() => setShowMoreModal(true)}>
              USER LANGUAGE
            </button>
            <button
              className="col-md-2"
              onClick={() => setShowUpdateModal(true)}
            >
              UPDATE USER INFO
            </button>
            <button className="col-md-2" onClick={deleteUserMutation.mutate}>
              DELETE USER
            </button>
          </div>
          <br />
        </div>
      )}
    </>
  );
};

export default Card;
