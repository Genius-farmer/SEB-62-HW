export const greetUser = (req, res) => {
  const username = req.params.username;

  res.send(`Hello there, ${username}!`);
};
