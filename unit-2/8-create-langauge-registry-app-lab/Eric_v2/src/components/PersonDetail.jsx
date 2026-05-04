import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PersonDetail = ({ person, languages, url }) => {
  const queryClient = useQueryClient();
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const userLanguagesQuery = useQuery({
    queryKey: ["userLanguages", person.id],
    queryFn: async () => {
      const res = await fetch(url + "/lab/users/languages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: person.id }),
      });
      if (!res.ok) throw new Error("Cannot fetch user languages");
      return res.json();
    },
  });

  const addLanguageToUserMutation = useMutation({
    mutationFn: async (languageName) => {
      const res = await fetch(url + "/lab/users/languages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: person.id, language: languageName }),
      });
      if (!res.ok) throw new Error("Cannot add language to user");
      return res.json();
    },
    onSuccess: () => {
      setSelectedLanguage("");
      queryClient.invalidateQueries({ queryKey: ["userLanguages", person.id] });
    },
  });

  const removeLanguageFromUserMutation = useMutation({
    mutationFn: async (languageName) => {
      const res = await fetch(url + "/lab/users/languages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: person.id, language: languageName }),
      });
      if (!res.ok) throw new Error("Cannot remove language from user");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userLanguages", person.id] });
    },
  });

  const userLanguages = userLanguagesQuery.data || [];

  return (
    <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #ddd" }}>
      <h3>{person.name}</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (selectedLanguage.trim()) {
            addLanguageToUserMutation.mutate(selectedLanguage);
          }
        }}
        style={{ marginBottom: "15px" }}
      >
        <select value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value)}>
          <option value="">Add a language</option>
          {languages.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.language}
            </option>
          ))}
        </select>
        <button type="submit" disabled={addLanguageToUserMutation.isPending}>Add</button>
      </form>

      <h4>Languages Known</h4>
      {userLanguagesQuery.isPending && <p>Loading...</p>}
      {addLanguageToUserMutation.isError && <p style={{ color: "red" }}>Error adding language</p>}
      {removeLanguageFromUserMutation.isError && <p style={{ color: "red" }}>Error removing language</p>}
      {userLanguages.length === 0 ? (
        <p>No languages yet</p>
      ) : (
        <ul>
          {userLanguages.map((lang) => (
            <li key={lang}>
              {lang}
              <button
                onClick={() => removeLanguageFromUserMutation.mutate(lang)}
                className="icon-button delete"
                disabled={removeLanguageFromUserMutation.isPending}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PersonDetail;
