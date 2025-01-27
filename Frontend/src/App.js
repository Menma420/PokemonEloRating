import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [pokemons, setPokemons] = useState([]); 
  const [ratings, setRatings] = useState([]);
  const [randomIndices, setRandomIndices] = useState({ random1: 0, random2: 1 });
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    // Fetch Pokémon data from the database
    axios.get("https://pokemonelorating.onrender.com/").then((response) => {
      const data = response.data; 
      setPokemons(data);
      setRatings(data.map((pokemon) => pokemon.rating)); 
    });
  }, []);

  const Probability = (rating1, rating2) => {
    return 1.0 / (1 + Math.pow(10, (rating1 - rating2) / 100.0));
  };

  const eloRating = (Ra, Rb, K, outcome) => {
    let Pa = Probability(Rb, Ra);
    return Math.ceil(Ra + K * (outcome - Pa));
  };

  const getRandomPokemon = () => Math.floor(Math.random() * pokemons.length);

  useEffect(() => {
    if (pokemons.length > 1) {
      const random1 = getRandomPokemon();
      let random2 = getRandomPokemon();
      while (random2 === random1) {
        random2 = getRandomPokemon();
      }
      setRandomIndices({ random1, random2 });
    }
  }, [pokemons]);

  if (pokemons.length < 2) {
    return <div>Loading Pokémon...</div>;
  }

  const poke1 = pokemons[randomIndices.random1].name;
  const poke2 = pokemons[randomIndices.random2].name;
  const poke1Image = pokemons[randomIndices.random1].image;
  const poke2Image = pokemons[randomIndices.random2].image;
  const poke1Rating = ratings[randomIndices.random1];
  const poke2Rating = ratings[randomIndices.random2];

  const handleWin = async (winner) => {
    const winningIndex = winner === "left" ? randomIndices.random1 : randomIndices.random2;
    const losingIndex = winner === "left" ? randomIndices.random2 : randomIndices.random1;

    // Update ratings
    const newRatings = [...ratings];
    newRatings[winningIndex] = eloRating(ratings[winningIndex], ratings[losingIndex], 16, 1);
    newRatings[losingIndex] = eloRating(ratings[losingIndex], ratings[winningIndex], 16, 0);

    setRatings(newRatings);

    try {
      await axios.post("https://pokemonelorating.onrender.com/", {
        updates: [
          { id: pokemons[winningIndex]._id, rating: newRatings[winningIndex] },
          { id: pokemons[losingIndex]._id, rating: newRatings[losingIndex] }
        ]
      });
      console.log("Rating updated successfully");
    } catch (error) {
      console.error("Failed to update ratings:", error.message);
      alert("Failed to update ratings. Please try again.");
    }
    

   // Get new Pokémon to replace the losing side
   let newWinningIndex = getRandomPokemon();
   let newLosingIndex;
   do {
     newLosingIndex = getRandomPokemon();
   } while (newLosingIndex === newWinningIndex);

   setRandomIndices({
     random1: newWinningIndex,
     random2: newLosingIndex,
   });
  };

  return (
    <div className="container">
      <div className="card" id="left" onClick={() => handleWin("left")}>
        {poke1}
        <br />
        <img src={poke1Image} />
        <br />
        {poke1Rating}
      </div>

      <div>
        <h1>Choose one!</h1>
        <button className="open" onClick={() => setShowLeaderboard(true)}>
          Leaderboard
        </button>
      </div>

      <div className="card" id="right" onClick={() => handleWin("right")}>
        {poke2}
        <br />
        <img src={poke2Image} />
        <br />
        {poke2Rating}
      </div>

      {showLeaderboard && (
        <div className="modal">
          <div className="modal-inner">
            <h1>Leaderboard</h1>
            <h2>Top 10</h2>
            <ul>
              {[...pokemons]
                .map((pokemon, index) => ({ name: pokemon.name, rating: ratings[index] }))
                .sort((a, b) => b.rating - a.rating) // Sort in descending order of ratings
                .slice(0, 10) // Take only the top 10
                .map((entry, index) => (
                  <li key={index}>
                    {entry.name}: {entry.rating}
                  </li>
                ))}
            </ul>
            <button className="close" onClick={() => setShowLeaderboard(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
