const BASE_URL = "https://swapi.info/api/starships/";

const index = async () => {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch starships");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("error:", err);
    return [];
  }
};

export { index };
