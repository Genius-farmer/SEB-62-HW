export const getGreeting = (req, res) => {
  res.send(`Hello there, ${req.params.id}!`);
};
