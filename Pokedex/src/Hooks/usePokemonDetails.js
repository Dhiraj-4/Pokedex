import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetails(id, setIsLoading, pokemonName) {
    const [pokemon, setPokemon] = useState({});
    let response;
    async function downloadPokemon() {
        try{
            setIsLoading(false);
        if(pokemonName) {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        } else {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        }
        const pokemonData = response.data;
        // console.log(pokemonData.sprites.other.home.front_default);
        setPokemon({
            id: pokemonData.id,
            name: pokemonData.name,
            types: pokemonData.types,
            image: (pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.other.home.front_default),
            height: pokemonData.height,
            weight: pokemonData.weight,
        })
        setIsLoading(true);
        }catch(error) {
            console.log("No Pokemon exists by this Name");
        }
    }

    useEffect(() => {
        downloadPokemon();
    },[]);

    return [pokemon];
}

export default usePokemonDetails;