import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLogger } from "vite";

const OverLay = (props) => {
  const titleRef = useRef();
  const authorRef = useRef();
  const yearRef = useRef();
  const queryClient = useQueryClient();

  const updateBook = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lesson/books/" + props.id,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleRef.current.value,
          author: authorRef.current.value,
          year: yearRef.current.value,
        }),
      },
    );
    // if (res.ok) {
    //   props.getData();
    //   props.setShowUpdateModal(false);
    // }

    if (!res.ok) {
      throw new Error("error updating book");
    }
  };

  const { mutate } = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      props.setShowUpdateModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message}</p>}
        <br />
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className=" col-md-3">Title</div>
          <input
            ref={titleRef}
            type="text"
            className="col-md-3"
            defaultValue={props.title} // must use defaultState because of useRef
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Author</div>
          <input
            ref={authorRef}
            type="text"
            className="col-md-3"
            defaultValue={props.author}
          />{" "}
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className=" col-md-3">Year Published</div>
          <input
            ref={yearRef}
            type="text"
            className="col-md-3"
            defaultValue={props.yearPublished}
          />
          <div className="col-md-3"></div>
          <br />
          <div className="row">
            <div className="col-md-3"></div>
            <button onClick={mutate} className="col-md-3">
              UPDATE
            </button>
            <button
              onClick={() => props.setShowUpdateModal(false)}
              className="col-md-3"
            >
              CANCEL
            </button>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          title={props.title}
          author={props.author}
          yearPublished={props.yearPublished}
          getData={props.getData}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root"),
      )}
    </>
  );
};

export default UpdateModal;
