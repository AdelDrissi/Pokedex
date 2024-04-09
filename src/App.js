import axios from 'axios';
import { useState } from 'react';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonChoice, setPokemonChoice] = useState(false);
  const [pokemon, setPokemon] = useState({
    
    name: '',
    species: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    type: '',
  });

  // REQUETE AXIOS (GET)
  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        console.log(response);
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChoice(true);
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
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChoice ? (
          <h1> Choice a pokemon</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} />
            <h1>Species : {pokemon.species}</h1>
            <h1>HP : {pokemon.hp}</h1>
            <h1>defense : {pokemon.defense}</h1>
            <h1>attack : {pokemon.attack}</h1>
            <h1>type : {pokemon.type}</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
