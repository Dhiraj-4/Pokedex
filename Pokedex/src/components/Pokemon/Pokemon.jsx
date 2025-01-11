import { Link } from "react-router-dom";
import "./Pokemon.css";
function Pokemon({name, image, types, id}) {

    return (
        <Link to={`/pokemon/${id}`}>
        <div className="pokemon">
            <div className="pokemon-name">{name} </div>
            <div><img className="pokemon-Image" src={image}/></div>
        </div>
        </Link>
    )
}

export default Pokemon;