import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Recipe() {
    const { idRecipe } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [rate, setRate] = useState(1);
    const [rateAvg, setRateAvg] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8000/singleRecipe", { code: idRecipe })
            .then(res => setRecipe(res.data[0]))
            .catch(err => console.log(err));
    }, [idRecipe]);

    const handleRate = (e) => {
        e.preventDefault();
        const user = localStorage.getItem("userID");
        const data = { value: rate, user: user, recipe: recipe.recipeID }
        axios.post("http://localhost:8000/AddRate", data)
    }

    useEffect(() => {
        axios.post("http://localhost:8000/getcomments", { recipe: idRecipe })
            .then(res => setComments(res.data));
    }, [idRecipe])

    useEffect(() => {
        axios.post("http://localhost:8000/getRateAvg", { code: idRecipe }).then(res => setRateAvg(res.data[0]))
    }, [idRecipe])

    const handleComments = (e) => {
        e.preventDefault();
        const data = { body: comment, recipe: idRecipe, user: localStorage.getItem("userID") };

        axios.post("http://localhost:8000/addcomment", data)
            .then(() => {
                console.log("Comment submitted successfully");
                setComment("");
            })
            .catch(err => console.log(err));
    }

    if (recipe === null) {
        return <div className="text-center"><p>Loading...</p></div>
    }

    return (
        <div className="container my-4">
            <h1 className="text-center">{recipe.nom}</h1>
            <div className="row mt-4">
                <div className="col-md-6">
                    <img src={`http://localhost:8000/files/recipes/${recipe.img}`} className="img-fluid rounded-circle" alt={recipe.nom} />
                </div>
                <div className="col-md-6">
                    <form onSubmit={handleRate} className="mb-3">
                        <p>The Rate of this is <b>{rateAvg.avg}</b></p>
                        <div className="input-group">
                            <select className="form-select" onChange={(e) => setRate(e.target.value)}>
                                <option value="1" defaultValue>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <button type="submit" className="btn btn-primary">Rate</button>
                        </div>
                    </form>
                    <h3>{recipe.nom}</h3>
                    <div className="mb-4">
    <h5>Ingrédients :</h5>
    <ul className="list-group list-group">
        {Object.values(JSON.parse(recipe.ingredient)).map((s, j) => (
            <li key={j} className="list-group-item">{s}</li>
        ))}
    </ul>
</div>
<div>
    <h5>Steps</h5>
    <ol className="list-group list-group-numbered">
        {Object.values(JSON.parse(recipe.steps)).map((s, j) => (
            <li key={j} className="list-group-item">{s}</li>
        ))}
    </ol>
</div>
                </div>
            </div>
            <div className="mt-4">
    <h4>Comments:</h4>
    <form onSubmit={handleComments} className="d-flex mt-3">
        <textarea className="form-control me-2" style={{ height: "40px" }} onChange={(e) => setComment(e.target.value)} required value={comment}></textarea>
        <button type="submit" className="btn btn-primary align-self-end" style={{ height: "40px" }}>Ajouter</button>
    </form>
    <div className="mt-4">
        {comments.length === 0 ? 
            <h5 className="text-center">No Comments To Display</h5> :
            comments.map((c, i) => (
                <div key={i} className="d-flex align-items-start my-3 p-2 bg-light rounded">
                    <img src={`http://localhost:8000/files/users/${c.userImg}`} className="me-3 rounded-circle" width="40px" height="40px" alt="User" />
                    <div>
                        <strong>{c.userName}</strong>
                        <p>{c.body}</p>
                    </div>
                </div>
            ))
        }
    </div>
</div>
        </div>
    );
}

export default Recipe;
