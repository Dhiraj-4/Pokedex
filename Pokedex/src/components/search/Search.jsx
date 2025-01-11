import useDebounce from "../../Hooks/useDebounce";
import "./Search.css"

function Search({search}) {

    return (
        <>
            <input
                type="text"
                placeholder="Pokemon name...."
                id="search-field"
                onChange={useDebounce((event) => {
                    search(event.target.value.toLowerCase());
                },600)}
            />
        </>
    )
}

export default Search;