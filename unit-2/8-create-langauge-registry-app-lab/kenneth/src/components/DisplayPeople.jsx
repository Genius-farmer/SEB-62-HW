import React, { useEffect, useState, useRef } from "react";
import Person from "./Person";

const DisplayPeople = ({ languages, refreshLanguages }) => {
  const [people, setPeople] = useState([]);

  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

  const getPeopleData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users/");

      if (!res.ok) {
        throw new Error("fetching error");
      }

      const data = await res.json();
      setPeople(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addUser = async () => {
    // Desmond's comments
    // Good work in trimming and parsing.
    const name = nameRef.current.value.trim();
    const age = parseInt(ageRef.current.value);
    const country = countryRef.current.value.trim();

    if (!name || !age || !country) return;

    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, country }),
    });

    if (res.ok) {
      nameRef.current.value = "";
      ageRef.current.value = "";
      countryRef.current.value = "";
      getPeopleData();
    }
  };

  useEffect(() => {
    getPeopleData();
  }, []);

  return (
    <div>
      <h2>People</h2>

      <input ref={nameRef} placeholder="name" />
      <input ref={ageRef} type="number" placeholder="age" />
      <input ref={countryRef} placeholder="country" />

      <button onClick={addUser}>Add</button>

      {people.map((person) => (
        <Person
          key={person.id}
          person={person}
          availableLanguages={languages}
          refreshLanguages={refreshLanguages}
          getPeopleData={getPeopleData}
        />
      ))}
    </div>
  );
};

export default DisplayPeople;
