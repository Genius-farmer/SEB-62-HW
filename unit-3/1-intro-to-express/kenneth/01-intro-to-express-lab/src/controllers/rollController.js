export const rollDice = (req, res) => {
  const number = Number(req.params.number);

  if (isNaN(number)) {
    return res.send(`You must specify a number`);
  }

  const randomNum = Math.floor(Math.random() * (number + 1));
  res.send(`You rolled a ${randomNum}`);
};
