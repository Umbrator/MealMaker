import { useNavigate } from "react-router-dom";

function MealList(props) {
    const nav = useNavigate();
    return (
        <div className="container mt-4">
            <div className="row">
                {props.meals.map((m, i) => (
                    <div key={i} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={`http://localhost:8000/files/Recipes/${m.img}`} className="card-img-top" alt={`Recipe ${i + 1}`} />
                            <div className="card-body">
                                <h5 className="card-title">{m.nom}</h5>
                                <p className="card-text">Temps de cuisson : {m.time} minutes</p>
                                <ul className="card-text">
                                    {Object.values(JSON.parse(m.steps)).slice(0, 3).map((s, j) => (
                                        <li key={j}>{s}</li>
                                    ))}
                                </ul>
                                <button onClick={() => nav(`/recipe/${m.recipeID}`)} className="btn btn-primary">Voir la recette</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MealList;
