import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useRef } from "react";
import Card from "./Card";

const Display = () => {
  const queryClient = useQueryClient();
  const userRef = useRef();
  const langRef = useRef();
  const url = "http://localhost:5001";

  //--------------------GET LANGUAGES---------------------------

  const getData = async () => {
    const res = await fetch(url + "/lab/languages");

    if (!res.ok) {
      throw new Error("cannot fetch, check url or connection");
    }
    return await res.json();
  };

  const query = useQuery({ queryKey: ["cards"], queryFn: getData });
  //--------------------GET USER-------------------------------
  const getData2 = async () => {
    const res = await fetch(url + "/lab/users");

    if (!res.ok) {
      throw new Error("cannot fetch, check url or connection");
    }

    return await res.json();
  };

  const query2 = useQuery({ queryKey: ["users"], queryFn: getData2 });

  //--------------------ADD USER-------------------------------
  const addUser = async () => {
    const res = await fetch(url + "/lab/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userRef.current.value }),
    });

    if (!res.ok) {
      throw new Error("cannot fetch user data, check url or connection");
    }

    return await res.json();
  };

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      userRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  //--------------------ADD LANGUAGES---------------------------
  const addLanguage = async () => {
    const res = await fetch(url + "/lab/languages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: langRef.current.value }),
    });

    if (!res.ok) {
      throw new Error("cannot fetch language data, check url or connection");
    }

    return await res.json();
  };

  const addLanguageMutation = useMutation({
    mutationFn: addLanguage,
    onSuccess: () => {
      langRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
  //---------------------RETURN--------------------------------
  return (
    <div className="container">
      {JSON.stringify(query.data)}
      <br />
      {JSON.stringify(query2.data)}
      <h1>User-Language Management System</h1>
      <div className="row">
        <input
          type="text"
          ref={userRef}
          placeholder="user name"
          className="col-md-4"
        />
        <div className="col-md-2"></div>
        <button className="col-md-4" onClick={addUserMutation.mutate}>
          ADD
        </button>
      </div>
      <br />
      <div className="row">
        <input
          type="text"
          ref={langRef}
          placeholder="language"
          className="col-md-4"
        />
        <div className="col-md-2"></div>
        <button className="col-md-4" onClick={addLanguageMutation.mutate}>
          ADD
        </button>
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">List of recorded LANGUAGES</div>
        <div className="col-md-6"></div>
      </div>
      {addLanguageMutation.isLoading && <h3>Loading...</h3>}
      {addLanguageMutation.isError && (
        <h3>{addLanguageMutation.error.message}</h3>
      )}
      {query.isPending && <h3>Loading...</h3>}
      {query.isError && <h3>{query.error.message}</h3>}

      {query.isSuccess &&
        query.data.map((item) => {
          return (
            <Card
              key={item.language}
              id={item.id}
              language={item.language}
              getData={getData}
            />
          );
        })}
      <br />
      <div className="row">
        <div className="col-md-6">List of USERS</div>
        <div className="col-md-6"></div>
      </div>
      {addUserMutation.isLoading && <h3>Loading...</h3>}
      {addUserMutation.isError && <h3>{addUserMutation.error.message}</h3>}
      {query2.isPending && <h3>Loading...</h3>}
      {query2.isError && <h3>{query2.error.message}</h3>}

      {query2.isSuccess &&
        query2.data.map((item) => {
          return (
            <Card
              key={item.name}
              id={item.id}
              user={item.name}
              getData={getData2}
            />
          );
        })}
    </div>
  );
};

export default Display;
