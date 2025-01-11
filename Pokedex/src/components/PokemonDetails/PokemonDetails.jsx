import { useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'
import usePokemonDetails from "../../Hooks/usePokemonDetails";
function PokemonDetails({pokemonName}) {

    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [pokemon] = usePokemonDetails(id, setIsLoading, pokemonName);

    return (
        <>
        {(isLoading) ? 
                <div className="pokemon-details-wrapper">
                <img className="pokemon-details-image" src={pokemon.image} alt="#" />
                <div className="pokemon-details-name">{pokemon.name}</div>
                <div className="pokemon-details-height">Height: {pokemon.height}</div>
                <div className="pokemon-details-weight">Weight: {pokemon.weight}</div>
                <div className="pokemon-details-types">Types: {pokemon.types && pokemon.types.map((t,index) => <span key={index}>{t.type.name}</span>)}</div>
                </div>
            : <div className="Loading">Loading....</div> 
        }
        </>
    )
}

export default PokemonDetails;