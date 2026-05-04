import React, { useRef } from "react";

const DisplayLanguages = ({ languages, refreshLanguages }) => {
  const languageRef = useRef();

  const addLanguage = async () => {
    const value = languageRef.current.value.trim();

    if (!value) return;

    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: value,
        }),
      });

      languageRef.current.value = "";
      await refreshLanguages();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLanguage = async (language) => {
    const encoded = encodeURIComponent(language);

    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/languages/" + encoded,
        {
          method: "DELETE",
        },
      );

      await refreshLanguages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <h2>Languages</h2>
        <input type="text" placeholder="New language..." ref={languageRef} />
        <button onClick={addLanguage}>Add</button>
      </div>

      <div className="languages-grid">
        {languages.map((lang) => (
          <div key={lang.language} className="language-item">
            <span>{lang.language}</span>
            <button onClick={() => deleteLanguage(lang.language)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayLanguages;
