import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Search() {
    const { search } = useParams();
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8000/search', { search: search })
            .then(res => setRecipe(res.data));
    }, [search]);

    return (
        <div className="container mt-4">
            {recipe.length === 0 ? (
                <h1 className="text-center">Aucune recette trouvée pour "{search}"</h1>
            ) : (
                <div className="row">
                    {recipe.map((m, i) => (
                        <div key={i} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src={`http://localhost:8000/files/Recipes/${m.img}`} className="card-img-top" alt={`Recette ${i + 1}`} />
                                <div className="card-body">
                                    <h5 className="card-title">{m.nom}</h5>
                                    <p className="card-text">Temps de cuisson : {m.time} minutes</p>
                                    <ul>
                                        {Object.values(JSON.parse(m.steps)).slice(0, 3).map((s, j) => (
                                            <li key={j}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
