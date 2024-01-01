import {useState} from "react";
// import {Axios} from "axios";


function App() {

const [setPokemon] = useState("")

  return (
    <div className="App">
      <div className="titleSection">
        <h1>Pokemon World</h1>
        <input type="text"  onChange={(event) => {setPokemon(event.target.value)}}/>
        <button>Rechercher pokémon</button>
      </div>
    </div>
  );
}

export default App;
