export const getGreeting = (req, res) => {
  res.send(`Hello there, ${req.params.id}!`);
};

export const getDiceRoll = (req, res) => {
  if (req.params.max && req.params.max.trim().length > 0) {
    // Note: this is assuming general coding definition of between 0 and max where max is excluded.
    res.send(`You rolled a ${Math.floor(Math.random() * Number(req.params.max))}.`);
  } else {
    res.status(400).send("You must specify a number.");
  }
};
