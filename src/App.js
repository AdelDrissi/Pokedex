import axios from 'axios';
import { useState } from 'react';

// Définir les couleurs des types de Pokémon
const typeColors = {
  fire: '#f08030',
  water: '#6890f0',
  grass: '#78c850',
  electric: '#f8d030',
  psychic: '#f85888',
  ice: '#98d8d8',
  dragon: '#7038f8',
  ghost: '#705898',
  dark: '#705848',
  fairy: '#ee99ac',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#e0c068',
  flying: '#a890f0',
  rock: '#b8a038',
  bug: '#a8b820',
  normal: '#a8a878',
  steel: '#b8b8d0',
};

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
        const type = response.data.types[0].type.name; // Récupérer le type principal du Pokémon
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type,
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
          <h1> Choose a pokemon</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} alt={`${pokemon.name} sprite`} />
            <h1>Species : {pokemon.species}</h1>
            <h1 style={{ color: typeColors[pokemon.type] }}>
              HP : {pokemon.hp}
            </h1>
            <h1 style={{ color: typeColors[pokemon.type] }}>
              Defense : {pokemon.defense}
            </h1>
            <h1 style={{ color: typeColors[pokemon.type] }}>
              Attack : {pokemon.attack}
            </h1>
            <h1 style={{ color: typeColors[pokemon.type] }}>
              Type : {pokemon.type}
            </h1>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
