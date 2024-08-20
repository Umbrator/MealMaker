import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Unique() {
    const { iduser } = useParams();
    const nav = useNavigate();
    const [user, setUser] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8000/single", {code : iduser})
            .then(res => setUser(res.data))

        axios.post("http://localhost:8000/getUserRecipes", {id : iduser})
            .then(res => setMeals(res.data));
    }, [iduser])

    return ( 
        <div className="container mt-4">
            {user.length === 0 ? (
                <h1 className="text-center">User Not Found</h1>
            ) : (
                <div>
                    <div className="text-center mb-4">
                        <h1>Bonjour {user[0].prenom}</h1>
                        <img src={`http://localhost:8000/files/Users/${user[0].img}`} className="rounded-circle" style={{width: "10rem"}} alt={user[0].prenom} />
                    </div>
                    <div>
                        {meals.map((m, i) => (
                            <div key={i} className="card mb-3" onClick={() => nav(`/recipe/${m.recipeID}`)}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={`http://localhost:8000/files/recipes/${m.img}`} className="img-fluid rounded-start" alt={m.nom} style={{ height: "100%" }} />
                                    </div>
                                    <div className="col-md-8"> 
                                        <div className="card-body">
                                            <h5 className="card-title">{m.nom}</h5>
                                            <p className="card-text"><small className="text-muted">{m.cookingTime} Min</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Unique;
