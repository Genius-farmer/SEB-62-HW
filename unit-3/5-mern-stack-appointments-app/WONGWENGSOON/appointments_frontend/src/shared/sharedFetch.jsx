export const fetchData = async (endpoint, method = "GET", body, token) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) options.body = JSON.stringify(body);
  if (token) options.headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(import.meta.env.VITE_SERVER + endpoint, options);
  return res.json();
};
