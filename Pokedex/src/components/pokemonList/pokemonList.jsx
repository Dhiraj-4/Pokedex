import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import "./pokemonList.css"


function PokedexList() {

    // const [isLoading, setIsLoading] = useState(false);
    // const [pokemonList, setPokemonList] = useState([]);

    // const [POKEDEX_URL, setPOKEDEX_URL] = useState('https://pokeapi.co/api/v2/pokemon')
    
    // const [prevUrl, setPrevUrl] = useState('');
    // const [nextUrl, setNextUrl] = useState('');

    const [pokemonListState, setPokemonListState] = useState({
        isLoading: false,
        pokemonList: [],
        POKEDEX_URL: 'https://pokeapi.co/api/v2/pokemon',
        prevUrl: '',
        nextUrl: '',
    })

    async function downloadPokemon() {
        // setIsLoading(false);
        setPokemonListState((state) => (
            {
                ...state, isLoading: false
            }
        ));

        const response = await axios.get(pokemonListState.POKEDEX_URL);
        const pokemonResults = response.data.results;
        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);
        setPokemonListState((state) => (
            {
                ...state,
                nextUrl: response.data.next,
                prevUrl: response.data.previous,
            }
        ));
        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all( pokemonResultsPromise);
        console.log(pokemonData);

        const res = pokemonData.map((pokeData) => {
           const  pokemon = pokeData.data;
           return {
               id: pokemon.id,
               name: pokemon.name,
               image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_default,
               types: pokemon.types
           }
        });
        // console.log(res);
        // setPokemonList(res);
        // setIsLoading(true);

        setPokemonListState((state) => (
            {
                ...state,
                pokemonList: res,
                isLoading: true,
            }
        ));
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.POKEDEX_URL]);

    return (
        <>            
            <div className="pokemonListWrapper">
                {(pokemonListState.isLoading) ? 
                pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} types={p.types} id={p.id}/>) :
                "Loading...."
                }
            </div>

            <div className="controls">
                <button 
                disabled={pokemonListState.prevUrl == null} 
                onClick = {() => {
                    setPokemonListState(
                        (state) => 
                        (
                            {
                                ...state, POKEDEX_URL: pokemonListState.prevUrl
                            }
                        ))
                }}>Previous</button>

                <button 
                disabled={pokemonListState.nextUrl == null}
                onClick={() => {
                    setPokemonListState(
                    (state) => (
                        {
                            ...state, POKEDEX_URL: pokemonListState.nextUrl
                        }
                    ))
                }}>Next</button>
            </div>
        </>
    )
}

export default PokedexList;