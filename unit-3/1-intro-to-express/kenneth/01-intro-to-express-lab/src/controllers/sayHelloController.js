export const sayHello = (req, res) => {
  const name = req.query.name;
  const age = req.query.age;

  res.send(`Hello there, ${name}! I hear you are ${age} years old!`);
};
