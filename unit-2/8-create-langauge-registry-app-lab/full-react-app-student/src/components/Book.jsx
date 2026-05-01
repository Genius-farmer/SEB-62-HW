import React, { useState } from "react";
import styles from "./Book.module.css";
import UpdateModal from "./UpdateModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Book = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const queryClient = useQueryClient();
  const deleteBook = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lesson/books/" + props.id,
      { method: "DELETE", headers: { "Content-Type": "application/json" } },
    );

    // if (res.ok) {
    //   props.getData();
    // }

    if (!res.ok) {
      throw new Error("book deletion error");
    }
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          title={props.title}
          author={props.author}
          yearPublished={props.yearPublished}
          getData={props.getData}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      <div className={`row ${styles.book}`}>
        <div className="col-sm-3">{props.title}</div>
        <div className="col-sm-3">{props.author}</div>
        <div className="col-sm-2">{props.yearPublished}</div>
        <button className="col-sm-2" onClick={() => setShowUpdateModal(true)}>
          UPDATE
        </button>
        <button className="col-sm-2" onClick={mutate}>
          DELETE
        </button>
      </div>
    </>
  );
};

export default Book;
