import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ItemCard from "./ItemCard";
import PersonDetail from "./PersonDetail";

const Display = () => {
  const queryClient = useQueryClient();
  const url = "http://localhost:5001";
  const personRef = useRef();
  const languageRef = useRef();
  const [selectedPersonId, setSelectedPersonId] = useState(null);

  const languagesQuery = useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      const res = await fetch(url + "/lab/languages");
      if (!res.ok) throw new Error("Cannot fetch languages");
      return res.json();
    },
  });

  const peopleQuery = useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      const res = await fetch(url + "/lab/users");
      if (!res.ok) throw new Error("Cannot fetch people");
      return res.json();
    },
  });

  const addPersonMutation = useMutation({
    mutationFn: async (name) => {
      const res = await fetch(url + "/lab/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Cannot add person");
      return res.json();
    },
    onSuccess: () => {
      personRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });

  const deletePersonMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(url + "/lab/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id }),
      });
      if (!res.ok) throw new Error("Cannot delete person");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });

  const addLanguageMutation = useMutation({
    mutationFn: async (name) => {
      const res = await fetch(url + "/lab/languages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: name }),
      });
      if (!res.ok) throw new Error("Cannot add language");
      return res.json();
    },
    onSuccess: () => {
      languageRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["languages"] });
    },
  });

  const deleteLanguageMutation = useMutation({
    mutationFn: async (name) => {
      const res = await fetch(
        url + "/lab/languages/" + encodeURIComponent(name),
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("Cannot delete language");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
    },
  });

  return (
    <div className="container">
      <h1>Languages Registry</h1>

      <div className="grid">
        <div className="column">
          <h2>Add Person</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (personRef.current.value.trim()) {
                addPersonMutation.mutate(personRef.current.value);
              }
            }}
          >
            <input
              ref={personRef}
              type="text"
              placeholder="Enter person's name"
            />
            <button type="submit">Add Person</button>
          </form>

          <h2>People</h2>
          {peopleQuery.isPending && <p>Loading...</p>}
          {peopleQuery.isError && (
            <p style={{ color: "red" }}>{peopleQuery.error.message}</p>
          )}
          <ul>
            {(peopleQuery.data || []).map((person) => (
              <ItemCard
                key={person.id}
                item={person}
                onDelete={() => deletePersonMutation.mutate(person.id)}
                onSelect={() => setSelectedPersonId(person.id)}
                isSelected={selectedPersonId === person.id}
                type="person"
              />
            ))}
          </ul>

          {selectedPersonId &&
            (() => {
              const selectedPerson = (peopleQuery.data || []).find(
                (p) => p.id === selectedPersonId,
              );
              return selectedPerson ? (
                <PersonDetail
                  person={selectedPerson}
                  languages={languagesQuery.data || []}
                  url={url}
                />
              ) : null;
            })()}
        </div>

        <div className="column">
          <h2>Add Language</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (languageRef.current.value.trim()) {
                addLanguageMutation.mutate(languageRef.current.value);
              }
            }}
          >
            <input
              ref={languageRef}
              type="text"
              placeholder="Enter language name"
            />
            <button type="submit">Add Language</button>
          </form>

          <h2>Available Languages ({(languagesQuery.data || []).length})</h2>
          {languagesQuery.isPending && <p>Loading...</p>}
          {languagesQuery.isError && (
            <p style={{ color: "red" }}>{languagesQuery.error.message}</p>
          )}
          <div>
            {(languagesQuery.data || []).map((lang) => (
              <ItemCard
                key={lang.language}
                item={lang}
                onDelete={() => deleteLanguageMutation.mutate(lang.language)}
                type="language"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
