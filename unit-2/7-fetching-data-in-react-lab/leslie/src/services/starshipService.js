import { useState } from "react";

const useStarshipData = () => {
  const [data, setData] = useState([]);

  const fetchData = async (searchString = "") => {
    try {
      const res = await fetch("https://swapi.info/api/starships");
      if (!res.ok) {
        throw new Error("Fetch error.");
      }

      const resData = await res.json();
      if (searchString) {
        const filtered = resData.filter((starship) => starship.name.toLowerCase().includes(searchString.toLowerCase()));
        setData(filtered);
      } else {
        setData(resData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [data, fetchData];
};

export { useStarshipData };
