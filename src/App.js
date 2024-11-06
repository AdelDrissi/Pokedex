import axios from 'axios';
import { useState } from 'react';
import './App.css'; // Assurez-vous que le fichier CSS est importé

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
  const [searchCount, setSearchCount] = useState(0); // Nouveau compteur de recherches
  const [addedPokemons, setAddedPokemons] = useState([]); // Liste des Pokémon ajoutés

  // REQUETE AXIOS (GET)
  const searchPokemon = () => {
    // Vérifier si le Pokémon est déjà dans la liste
    if (addedPokemons.includes(pokemonName.toLowerCase())) {
      alert(`${pokemonName} has already been added!`);
      return;
    }

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        const type = response.data.types[0].type.name; // Récupérer le type principal du Pokémon
        const newPokemon = {
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type,
        };

        setPokemon(newPokemon);
        setPokemonChoice(true);
        setSearchCount((prevCount) => prevCount + 1); // Incrémenter le compteur de recherche
        setAddedPokemons([...addedPokemons, pokemonName.toLowerCase()]); // Ajouter le Pokémon à la liste
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
            <h1 key={searchCount} className="slide-in">
              {pokemon.name}
            </h1>{' '}
            {/* Utilisation de searchCount comme clé */}
            <img
              key={searchCount}
              className="slide-in"
              src={pokemon.img}
              alt={`${pokemon.name} sprite`}
            />
            <h1 key={searchCount} className="slide-in">
              Species : {pokemon.species}
            </h1>
            <h1
              key={searchCount}
              className="slide-in"
              style={{ color: typeColors[pokemon.type] }}
            >
              HP : {pokemon.hp}
            </h1>
            <h1
              key={searchCount}
              className="slide-in"
              style={{ color: typeColors[pokemon.type] }}
            >
              Defense : {pokemon.defense}
            </h1>
            <h1
              key={searchCount}
              className="slide-in"
              style={{ color: typeColors[pokemon.type] }}
            >
              Attack : {pokemon.attack}
            </h1>
            <h1
              key={searchCount}
              className="slide-in"
              style={{ color: typeColors[pokemon.type] }}
            >
              Type : {pokemon.type}
            </h1>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
