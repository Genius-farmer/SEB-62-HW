import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import React, { useRef } from "react";
import styles from "./Modal.module.css";

const OverLay = (props) => {
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();
  const queryClient = useQueryClient();
  const url = "http://localhost:5001";

  //------------------UPDATE USER--------------------------------
  const updateUser = async () => {
    const res = await fetch(url + "/lab/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: props.id,
        name: nameRef.current.value,
        age: ageRef.current.value,
        country: countryRef.current.value,
      }),
    });

    if (!res.ok) {
      throw new Error("error updating user");
    }
  };
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      props.setShowUpdateModal(false);
    },
  });
  //-----------------RETURN-------------------------------------
  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          {updateUserMutation.isLoading && <p>Loading...</p>}
          {updateUserMutation.isError && (
            <p>{updateUserMutation.error.message}</p>
          )}
          <br />
          <br />
          <div className="row">
            <div className="col-md-3"></div>
            <div className=" col-md-3">User:</div>
            <input
              ref={nameRef}
              type="text"
              className="col-md-3"
              defaultValue={props.name}
            />
            <div className="col-md-3"></div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">Age:</div>
            <input
              ref={ageRef}
              type="text"
              className="col-md-3"
              defaultValue={props.age}
            />{" "}
            <div className="col-md-3"></div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className=" col-md-3">Country:</div>
            <input
              ref={countryRef}
              type="text"
              className="col-md-3"
              defaultValue={props.country}
            />
            <div className="col-md-3"></div>
            <br />
            <div className="row">
              <div className="col-md-3"></div>
              <button onClick={updateUserMutation.mutate} className="col-md-3">
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
    </>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          name={props.name}
          age={props.age}
          country={props.country}
          getData={props.getData}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root"),
      )}
    </>
  );
};

export default UpdateModal;
