const API_URL = "http://localhost:5001";

export const getLanguages = () =>
  fetch(`${API_URL}/lab/languages`).then((r) => r.json());

export const addLanguage = (name) =>
  fetch(`${API_URL}/lab/languages`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language: name }),
  });

export const deleteLanguage = (name) =>
  fetch(`${API_URL}/lab/languages/${encodeURIComponent(name)}`, {
    method: "DELETE",
  });

export const getUsers = () =>
  fetch(`${API_URL}/lab/users`).then((r) => r.json());

export const addUser = (name) =>
  fetch(`${API_URL}/lab/users`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

export const updateUser = (userId, name) =>
  fetch(`${API_URL}/lab/users`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, name }),
  });

export const deleteUser = (userId) =>
  fetch(`${API_URL}/lab/users`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });

export const addUserLanguage = (userId, languageName) =>
  fetch(`${API_URL}/lab/users/languages`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, language: languageName }),
  });

export const deleteUserLanguage = (userId, languageName) =>
  fetch(`${API_URL}/lab/users/languages`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, language: languageName }),
  });

export const getUserLanguages = (userId) =>
  fetch(`${API_URL}/lab/users/languages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  }).then((r) => r.json());
