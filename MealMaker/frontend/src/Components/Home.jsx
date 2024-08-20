import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const [meal, setMeal] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/getrecipe")
            .then(res => setMeal(res.data))
            .catch(error => console.error("Error:", error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Meal Maker</h1>
            <div className="row">
                {meal.map((m, i) => (
                    <div key={i} className="col-md-4 mb-4">
                        <div className="card h-100" onClick={() => nav(`/recipe/${m.recipeID}`)}>
                            <img src={`http://localhost:8000/files/Recipes/${m.img}`} className="card-img-top" alt={m.nom} />
                            <div className="card-body">
                                <h5 className="card-title">{m.nom}</h5>
                                <p className="card-text">{m.cookingTime} min</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
