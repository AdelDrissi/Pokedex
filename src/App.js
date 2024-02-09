import axios from 'axios';
import { useState } from 'react';

function App() {
  const [pokemonName, setPokemonName] = useState('');

  // REQUETE AXIOS (GET)
  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="App">
      <div className="titleSection">
        <h1 className="poke-world">Pokemon World</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Rechercher pokémon</button>
      </div>
    </div>
  );
}

export default App;
