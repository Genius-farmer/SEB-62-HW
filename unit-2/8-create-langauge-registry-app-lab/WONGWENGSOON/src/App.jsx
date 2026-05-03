import { useEffect, useState } from "react";

function App() {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [personError, setPersonError] = useState("");
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [updatedAge, setUpdatedAge] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [newUserLanguage, setNewUserLanguage] = useState("");
  const [selectedViewPersonId, setSelectedViewPersonId] = useState(null);

  const deleteUserLanguage = async (userId, language) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            language: language,
          }),
        },
      );
      const data = await res.json();
      console.log("Delete status:", res.status); // ← what status?
      console.log("Delete response:", data); // ← what does server say?
      getUserLanguage(userId);
    } catch (error) {
      console.error(error);
    }
  };

  const addUserLanguage = async (userId, language) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            language: language,
          }),
        },
      );
      if (!res.ok) throw new Error("Failed to add user language");
      getUserLanguage(userId); // refresh the list
    } catch (error) {
      console.error(error);
    }
  };

  const getUserLanguage = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: id,
          }),
        },
      );
      const data = await res.json();
      console.log("Status:", res.status);
      console.log("Data:", data);
      setSelectedLanguage(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPeople = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users");
      if (!res.ok) {
        throw new Error("Failed to fetch people");
      }
      const data = await res.json();
      setPeople(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPerson = async () => {
    try {
      const trimmedPersonName = newPerson.trim();

      if (!trimmedPersonName) {
        setPersonError("Please enter a name");
        return;
      }
      if (trimmedPersonName.length > 20) {
        setPersonError("Name must be within 20 characters or less");
        return;
      }
      console.error("Sending:", trimmedPersonName);

      const alreadyExists = people.some(
        (personObj) =>
          personObj.name.toLowerCase() === trimmedPersonName.toLowerCase(),
      );
      if (alreadyExists) {
        setPersonError("Name already exists");
        return;
      }

      setPersonError(""); // clear before sending
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedPersonName,
        }),
      });
      if (!res.ok) {
        setPersonError("Failed to add new person");
        return;
      }
      getPeople(); // refresh list
      setNewPerson(""); // clear input
    } catch (error) {
      setPersonError("Something went wrong");
    }
  }; // close addPerson

  const deletePerson = async (id) => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: id,
        }),
      });

      if (!res.ok) {
        setPersonError("Failed to delete person");
        return;
      }
      getPeople();
      setPersonError("");
    } catch (error) {
      setPersonError("Something went wrong");
    }
  };

  const updatePerson = async () => {
    try {
      const trimmedUpdatedAge = updatedAge.trim();

      if (!trimmedUpdatedAge) {
        setPersonError("Please enter an age");
        return;
      }
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: selectedPersonId,
          age: Number(trimmedUpdatedAge),
        }),
      });
      if (!res.ok) {
        setPersonError("Failed to update person info");
        return;
      }
      getPeople();
      setSelectedPersonId(null);
      setUpdatedAge("");
    } catch (error) {
      setPersonError("Something went wrong");
    }
  };

  const getLanguages = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");

      // over here, i should add a check to see if the response is ok or not, if not then i should throw an error
      if (!res.ok) {
        throw new Error("Failed to fetch languages");
      }

      const data = await res.json();
      setLanguages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLanguages();
    getPeople();
  }, []);

  //THIS IS ADD LANGUAGE FUNCTION, THIS FUNCTION IS CALLED WHEN THE USER CLICKS ON THE ADD LANGUAGE BUTTON,
  // THIS FUNCTION WILL SEND A PUT REQUEST TO THE SERVER TO ADD A NEW LANGUAGE TO THE DATABASE,
  // AND THEN IT WILL REFRESH THE LIST OF LANGUAGES BY CALLING THE GETLANGUAGES FUNCTION AGAIN,
  // AND THEN IT WILL CLEAR THE INPUT FIELD BY SETTING THE NEWLANGUAGE STATE TO AN EMPTY STRING
  const addLanguage = async () => {
    try {
      const trimmed = newLanguage.trim();

      if (!trimmed) {
        setLanguageError("Please enter a language");
        return;
      }
      if (trimmed.length > 10) {
        setLanguageError("Language must be within 10 characters or less");
        return;
      }

      //AT CONSOLE CHECK ERRORS, CHECK WHAT IS BEING SENT TO THE SERVER,
      // CHECK IF THE LANGUAGE ALREADY EXISTS IN THE DATABASE,
      // IF IT DOES THEN SHOW AN ERROR MESSAGE, IF IT DOESN'T THEN SEND THE REQUEST
      // TO THE SERVER
      console.error("Sending:", trimmed);

      const alreadyExists = languages.some(
        (languageObj) =>
          languageObj.language.toLowerCase() === trimmed.toLowerCase(),
      );
      if (alreadyExists) {
        setLanguageError("Language already exists");
        return;
      }

      setLanguageError(""); // clear before sending

      // SEND THE PUT REQUEST TO THE SERVER TO ADD THE NEW LANGUAGE
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: trimmed,
        }),
      });

      // CHECK IF THE RESPONSE IS OK, IF NOT THEN SHOW AN ERROR MESSAGE
      if (!res.ok) {
        setLanguageError("Failed to add new language");
        return;
      }
      // IF THE RESPONSE IS OK, THEN REFRESH THE LIST OF LANGUAGES A
      // ND CLEAR THE INPUT FIELD
      getLanguages(); // refresh list
      setNewLanguage(""); // clear input
    } catch (error) {
      setLanguageError("Something went wrong");
    }
  }; // close addLanguage

  // start of delete language function
  const deleteLanguage = async (language) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER +
          "/lab/languages/" +
          encodeURIComponent(language),
        {
          method: "DELETE",
        },
      );

      // CHECK IF THE RESPONSE IS OK, IF NOT THEN SHOW AN ERROR MESSAGE
      if (!res.ok) {
        setLanguageError("Failed to delete language");
        return;
      }

      getLanguages();
      setLanguageError("");
    } catch (error) {
      setLanguageError("Something went wrong");
    }
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title}>🗣️ Language Registry App</h1>
        <p style={styles.subtitle}>
          Manage programming languages and track who knows what
        </p>
      </header>

      <div style={styles.mainContainer}>
        {/* Languages Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📚 Available Languages</h2>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Enter language name (e.g., JavaScript)"
              style={styles.input}
            />
            <button onClick={addLanguage} style={styles.buttonPrimary}>
              + Add Language
            </button>
          </div>
          {languageError && <p style={styles.error}>{languageError}</p>}

          <div style={styles.itemGrid}>
            {languages.length === 0 ? (
              <p style={styles.emptyState}>
                No languages registered yet. Add one to get started!
              </p>
            ) : (
              languages.map((languageObj) => (
                <div key={languageObj.language} style={styles.card}>
                  <p style={styles.cardTitle}>{languageObj.language}</p>
                  <button
                    onClick={() => deleteLanguage(languageObj.language)}
                    style={styles.buttonDanger}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* People Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>👥 People</h2>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
              placeholder="Enter person's name"
              style={styles.input}
            />
            <button onClick={addPerson} style={styles.buttonPrimary}>
              + Add Person
            </button>
          </div>
          {personError && <p style={styles.error}>{personError}</p>}

          <div style={styles.itemGrid}>
            {people.length === 0 ? (
              <p style={styles.emptyState}>
                No people registered yet. Add one to get started!
              </p>
            ) : (
              people.map((person) => (
                <div key={person.id} style={styles.card}>
                  <p style={styles.cardTitle}>{person.name}</p>
                  <p style={styles.cardSubtitle}>
                    Age: {person.age ?? "Not Set"}
                  </p>
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={() => {
                        getUserLanguage(person.id);
                        setSelectedViewPersonId(person.id);
                      }}
                      style={styles.buttonSecondary}
                    >
                      Languages
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPersonId(person.id);
                        setUpdatedAge(person.age || "");
                      }}
                      style={styles.buttonSecondary}
                    >
                      Edit Age
                    </button>
                    <button
                      onClick={() => deletePerson(person.id)}
                      style={styles.buttonDanger}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Update Person Modal */}
        {selectedPersonId && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3 style={styles.modalTitle}>Update Person's Age</h3>
              <input
                type="number"
                value={updatedAge}
                onChange={(e) => setUpdatedAge(e.target.value)}
                placeholder="Enter age"
                style={styles.input}
              />
              <div style={styles.modalButtons}>
                <button onClick={updatePerson} style={styles.buttonPrimary}>
                  Save
                </button>
                <button
                  onClick={() => setSelectedPersonId(null)}
                  style={styles.buttonSecondary}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Languages Modal */}
        {selectedLanguage !== null && selectedViewPersonId && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3 style={styles.modalTitle}>Languages Known</h3>
              <div style={styles.languagesList}>
                {selectedLanguage.length === 0 ? (
                  <p style={styles.emptyState}>
                    This person knows no languages yet.
                  </p>
                ) : (
                  selectedLanguage.map((language, index) => (
                    <div key={index} style={styles.languageItem}>
                      <span>{language}</span>
                      <button
                        onClick={() =>
                          deleteUserLanguage(selectedViewPersonId, language)
                        }
                        style={styles.buttonDanger}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div style={styles.addLanguageGroup}>
                <input
                  type="text"
                  value={newUserLanguage}
                  onChange={(e) => setNewUserLanguage(e.target.value)}
                  placeholder="Add a language to this person"
                  style={styles.input}
                />
                <button
                  onClick={() => {
                    if (!newUserLanguage.trim()) return;
                    addUserLanguage(
                      selectedViewPersonId,
                      newUserLanguage.trim(),
                    );
                    setNewUserLanguage("");
                  }}
                  style={styles.buttonPrimary}
                >
                  Add
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedLanguage(null);
                  setSelectedViewPersonId(null);
                }}
                style={styles.buttonSecondary}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: '"Oxygen", sans-serif',
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
    borderBottom: "2px solid #fff",
    paddingBottom: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    margin: "0 0 0.5rem 0",
    color: "#fff",
  },
  subtitle: {
    fontSize: "1rem",
    margin: 0,
    color: "#ccc",
  },
  mainContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "3rem",
    padding: "2rem",
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    border: "1px solid #333",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    marginTop: 0,
    marginBottom: "1.5rem",
    color: "#fff",
    borderBottom: "2px solid #444",
    paddingBottom: "0.5rem",
  },
  inputGroup: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  input: {
    flex: 1,
    padding: "0.75rem",
    backgroundColor: "#000",
    color: "#fff",
    border: "2px solid #444",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  itemGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#000",
    border: "2px solid #fff",
    borderRadius: "6px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  cardTitle: {
    fontSize: "1.2rem",
    margin: 0,
    fontWeight: "bold",
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: "0.9rem",
    margin: 0,
    color: "#aaa",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  buttonPrimary: {
    padding: "0.6rem 1rem",
    backgroundColor: "#00d4ff",
    color: "#000",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  buttonSecondary: {
    padding: "0.6rem 1rem",
    backgroundColor: "#444",
    color: "#fff",
    border: "1px solid #666",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  buttonDanger: {
    padding: "0.6rem 1rem",
    backgroundColor: "#ff4444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  error: {
    color: "#ff6b6b",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  emptyState: {
    gridColumn: "1 / -1",
    textAlign: "center",
    color: "#888",
    padding: "2rem",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    border: "2px solid #fff",
    borderRadius: "8px",
    padding: "2rem",
    maxWidth: "500px",
    width: "90%",
  },
  modalTitle: {
    fontSize: "1.5rem",
    marginTop: 0,
    marginBottom: "1.5rem",
    color: "#fff",
  },
  modalButtons: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1.5rem",
  },
  languagesList: {
    marginBottom: "1.5rem",
    maxHeight: "300px",
    overflowY: "auto",
  },
  languageItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem",
    backgroundColor: "#000",
    borderRadius: "4px",
    marginBottom: "0.5rem",
    border: "1px solid #444",
  },
  addLanguageGroup: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
};
export default App;
