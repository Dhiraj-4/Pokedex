import { useState } from "react";
import PokedexList from "../pokemonList/pokemonList";
import Search from "../search/Search";
import "./Pokedex.css"
import PokemonDetails from './../PokemonDetails/PokemonDetails';
function Pokedex() {

    const [search, setSearch] = useState('');
    return (
        <div id="pokedexWrapper">
        <Search search={setSearch}/>
        {(!search) ? <PokedexList/> : <PokemonDetails key={search} pokemonName={search}/>}
        </div>
    )
}

export default Pokedex;