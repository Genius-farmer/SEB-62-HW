import { useState } from "react";

const domain = import.meta.env.VITE_SERVER;

const useLanguageListData = () => {
  const [data, setData] = useState([]);

  const fetchDataRequest = async () => {
    try {
      const res = await fetch(domain + "/lab/languages");
      if (!res.ok) {
        throw new Error("Fetch error.");
      }

      const resData = await res.json();
      setData(resData);
    } catch (error) {
      console.error(error);
    }
  };

  return [data, fetchDataRequest];
};

const useAddLanguage = () => {
  const [isAdded, setIsAdded] = useState(false);

  const addDataRequest = async (languageName) => {
    setIsAdded(false);

    try {
      const res = await fetch(domain + "/lab/languages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: languageName,
        }),
      });

      if (res.ok) {
        setIsAdded(true);
      } else {
        throw new Error("Fetch error.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isAdded, addDataRequest };
};

const useDeleteLanguage = () => {
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteDataRequest = async (languageName) => {
    setIsDeleted(false);

    try {
      const res = await fetch(domain + "/lab/languages/" + encodeURIComponent(languageName), {
        method: "DELETE",
      });

      if (res.ok) {
        setIsDeleted(true);
      } else {
        throw new Error("Fetch error.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isDeleted, deleteDataRequest };
};

const usePeopleListData = () => {
  const [data, setData] = useState([]);

  const fetchDataRequest = async () => {
    try {
      const res = await fetch(domain + "/lab/users");
      if (!res.ok) {
        throw new Error("Fetch error.");
      }

      const resData = await res.json();
      setData(resData);
    } catch (error) {
      console.error(error);
    }
  };

  return [data, fetchDataRequest];
};

const useAddPerson = () => {
  const [isAdded, setIsAdded] = useState(false);

  const addDataRequest = async (newPerson) => {
    setIsAdded(false);

    try {
      const res = await fetch(domain + "/lab/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newPerson.name,
          ...(newPerson.age && { age: newPerson.age }),
          ...(newPerson.country && { country: newPerson.country }),
        }),
      });

      if (res.ok) {
        setIsAdded(true);
      } else {
        throw new Error("Fetch error.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isAdded, addDataRequest };
};

const useDeletePerson = () => {
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteDataRequest = async (personId) => {
    setIsDeleted(false);

    try {
      const res = await fetch(domain + "/lab/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: personId,
        }),
      });

      if (res.ok) {
        setIsDeleted(true);
      } else {
        throw new Error("Fetch error.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isDeleted, deleteDataRequest };
};

const useUpdatePerson = () => {
  const [isUpdated, setIsUpdated] = useState(false);

  const patchDataRequest = async (newPerson) => {
    setIsUpdated(false);

    try {
      const res = await fetch(domain + "/lab/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: newPerson.user_id,
          ...(newPerson.name && { name: newPerson.name }),
          ...(newPerson.age && { age: newPerson.age }),
          ...(newPerson.country && { country: newPerson.country }),
        }),
      });

      if (res.ok) {
        setIsUpdated(true);
      } else {
        throw new Error("Fetch error.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isUpdated, patchDataRequest };
};

const usePersonLanguageListData = () => {
  const [data, setData] = useState([]);

  const fetchDataRequest = async (personId) => {
    try {
      const res = await fetch(domain + "/lab/users/languages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: personId,
        }),
      });

      if (!res.ok) {
        throw new Error("Fetch error.");
      }

      const resData = await res.json();
      setData(resData);
    } catch (error) {
      console.error(error);
    }
  };

  return [data, fetchDataRequest];
};

const useAddPersonLanguage = () => {
  const [isAdded, setIsAdded] = useState(false);

  const addDataRequest = async (personId, newLanguage) => {
    setIsAdded(false);

    try {
      const res = await fetch(domain + "/lab/users/languages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: personId,
          language: newLanguage,
        }),
      });

      if (res.ok) {
        setIsAdded(true);
      } else {
        throw new Error("Fetch error.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isAdded, addDataRequest };
};

const useRemovePersonLanguage = () => {
  const [isRemoved, setIsRemoved] = useState(false);

  const deleteDataRequest = async (personId, languageToRemove) => {
    setIsRemoved(false);

    try {
      const res = await fetch(domain + "/lab/users/languages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: personId,
          language: languageToRemove,
        }),
      });

      if (res.ok) {
        setIsRemoved(true);
      } else {
        throw new Error("Fetch error.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isRemoved, deleteDataRequest };
};

export {
  useLanguageListData,
  useAddLanguage,
  useDeleteLanguage,
  usePeopleListData,
  useAddPerson,
  useDeletePerson,
  useUpdatePerson,
  usePersonLanguageListData,
  useAddPersonLanguage,
  useRemovePersonLanguage,
};
