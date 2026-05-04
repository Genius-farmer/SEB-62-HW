export const index = async () => {
  try {
    const res = await fetch("https://swapi.info/api/starships/");
    if (!res.ok) {
      throw new Error("Failed to fetch starships.");
    }
    const data = await res.json();
    console.log("Full API response:", data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
