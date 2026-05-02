import React, { useState } from "react";
import "./App.css";
import survivorPortrait from "./img/survivor.svg";
import scavengerPortrait from "./img/scavenger.svg";
import shadowPortrait from "./img/shadow.svg";
import trackerPortrait from "./img/tracker.svg";
import sharpshooterPortrait from "./img/sharpshooter.svg";
import medicPortrait from "./img/medic.svg";
import engineerPortrait from "./img/engineer.svg";
import brawlerPortrait from "./img/brawler.svg";
import infiltratorPortrait from "./img/infiltrator.svg";
import leaderPortrait from "./img/leader.svg";

function App() {
  const initZombieFighters = [
    {
      id: 1,
      name: "Survivor",
      price: 12,
      strength: 6,
      agility: 4,
      img: survivorPortrait,
    },
    {
      id: 2,
      name: "Scavenger",
      price: 10,
      strength: 5,
      agility: 5,
      img: scavengerPortrait,
    },
    {
      id: 3,
      name: "Shadow",
      price: 18,
      strength: 7,
      agility: 8,
      img: shadowPortrait,
    },
    {
      id: 4,
      name: "Tracker",
      price: 14,
      strength: 7,
      agility: 6,
      img: trackerPortrait,
    },
    {
      id: 5,
      name: "Sharpshooter",
      price: 20,
      strength: 6,
      agility: 8,
      img: sharpshooterPortrait,
    },
    {
      id: 6,
      name: "Medic",
      price: 15,
      strength: 5,
      agility: 7,
      img: medicPortrait,
    },
    {
      id: 7,
      name: "Engineer",
      price: 16,
      strength: 6,
      agility: 5,
      img: engineerPortrait,
    },
    {
      id: 8,
      name: "Brawler",
      price: 11,
      strength: 8,
      agility: 3,
      img: brawlerPortrait,
    },
    {
      id: 9,
      name: "Infiltrator",
      price: 17,
      strength: 5,
      agility: 9,
      img: infiltratorPortrait,
    },
    {
      id: 10,
      name: "Leader",
      price: 22,
      strength: 7,
      agility: 6,
      img: leaderPortrait,
    },
  ];

  const [team, setTeam] = useState([]);
  const [zombieFighters, setZombieFighters] = useState(initZombieFighters);

  let money = 100;
  let totalStrength = 0;
  let totalAgility = 0;
  for (const fighter of team) {
    money -= fighter.price;
    totalStrength += fighter.strength;
    totalAgility += fighter.agility;
  }

  const handleAddFighter = (fighter) => {
    if (money >= fighter.price) {
      const newTeam = [...team, fighter];
      const newFighters = zombieFighters.toSpliced(zombieFighters.indexOf(fighter), 1);

      setTeam(newTeam);
      setZombieFighters(newFighters);
    }
  };

  const handleRemoveFighter = (fighter) => {
    const newFighters = [...zombieFighters, fighter];
    const newTeam = team.toSpliced(team.indexOf(fighter), 1);

    setTeam(newTeam);
    setZombieFighters(newFighters);
  };

  return (
    <div>
      <h1>Zombie Fighters</h1>
      <div className="row">
        <div>Money: {money}</div>
        <div>Team Strength: {totalStrength}</div>
        <div>Team Agility: {totalAgility}</div>
      </div>
      <div className="row">
        <h2>Team</h2>
        <ul>
          {team.length > 0 ? (
            team.map((character, idx) => {
              return (
                <li key={idx}>
                  <img src={character.img} />
                  <div>
                    <b>{character.name}</b>
                  </div>
                  <div>Price: {character.price}</div>
                  <div>Strength: {character.strength}</div>
                  <div>Agility: {character.agility}</div>
                  <div>
                    <button onClick={() => handleRemoveFighter(character)}>Remove</button>
                  </div>
                </li>
              );
            })
          ) : (
            <div>Pick some team members!</div>
          )}
        </ul>
      </div>
      <div className="row">
        <h2>Fighters</h2>
        <ul>
          {zombieFighters.map((character, idx) => {
            return (
              <li key={idx}>
                <img src={character.img} />
                <div>
                  <b>{character.name}</b>
                </div>
                <div>Price: {character.price}</div>
                <div>Strength: {character.strength}</div>
                <div>Agility: {character.agility}</div>
                <div>
                  <button disabled={character.price > money} onClick={() => handleAddFighter(character)}>
                    {character.price > money ? "Not enough money" : "Add"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
