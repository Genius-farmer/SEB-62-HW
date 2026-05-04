import React, { useEffect, useState } from "react";

const Person = ({
  person,
  getPeopleData,
  availableLanguages,
  refreshLanguages,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userLanguages, setUserLanguages] = useState([]);

  const [name, setName] = useState(person.name);
  const [age, setAge] = useState(person.age);
  const [country, setCountry] = useState(person.country);

  const [selectedLanguage, setSelectedLanguage] = useState("");

  const filteredLanguages = availableLanguages.filter(
    (lang) => !userLanguages.includes(lang.language),
  );

  const deleteUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: person.id }),
    });
    if (res.ok) {
      getPeopleData();
    }
  };

  const updateUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: person.id,
        name,
        age: parseInt(age),
        country,
      }),
    });

    if (res.ok) {
      setIsEditing(false);
      getPeopleData();
    }
  };

  const addLanguageToUser = async () => {
    if (!selectedLanguage) return;

    if (userLanguages.includes(selectedLanguage)) return;

    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: person.id,
          language: selectedLanguage,
        }),
      },
    );

    if (res.ok) {
      setSelectedLanguage("");
      await getUserLanguages();
      refreshLanguages();
    }
  };

  const deleteLanguageFromUser = async (language) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: person.id,
          language,
        }),
      },
    );

    if (res.ok) {
      getUserLanguages();
    }
  };

  const getUserLanguages = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: person.id,
        }),
      },
    );

    const data = await res.json();
    setUserLanguages([...new Set(data)]);
  };

  useEffect(() => {
    getUserLanguages();
  }, [person.id]);

  return (
    <div className="person-container">
      {isEditing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <button onClick={updateUser}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div className="person-header">
            <p>
              Name: {person.name} || Aged {person.age} || From: {person.country}
            </p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={deleteUser}>Delete</button>
          </div>
        </>
      )}
      <div>
        <p>Languages for {person.name}</p>

        <ul>
          {userLanguages.map((lang) => (
            <li key={lang} className="language-list-item">
              <span>{lang}</span>
              <button onClick={() => deleteLanguageFromUser(lang)}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">Select language</option>
          {filteredLanguages.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.language}
            </option>
          ))}
        </select>

        <button onClick={addLanguageToUser}>Add Language</button>
      </div>
    </div>
  );
};

export default Person;
