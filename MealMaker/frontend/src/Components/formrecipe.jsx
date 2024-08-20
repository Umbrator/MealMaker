import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormRecipe() {
    const [nom, setNom] = useState("");
    const [steps, setSteps] = useState({ 1: "" });
    const [time, setTime] = useState("");
    const [img, setImg] = useState(null);
    const [ing, setIng] = useState({ 1: "" });

    const addStep = () => {
        const newStepNumber = Object.keys(steps).length + 1;
        setSteps({ ...steps, [newStepNumber]: "" });
    };

    const addIngredient = () => {
        const newIngNumber = Object.keys(ing).length + 1;
        setIng({ ...ing, [newIngNumber]: "" });
    };

    const handleStepChange = (stepNumber, value) => {
        setSteps({ ...steps, [stepNumber]: value });
    };

    const handleIngChange = (ingNumber, value) => {
        setIng({ ...ing, [ingNumber]: value });
    };

    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nom", nom);
        formData.append("time", time);
        formData.append("steps", JSON.stringify(steps));
        formData.append("ing", JSON.stringify(ing));
        formData.append("img", img);
        formData.append("user", localStorage.getItem("userID"));

        axios.post("http://localhost:8000/addrecipe", formData)
        .then(() => {
            console.log("Recipe Added");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        nav("/");
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Ajouter une Recette</h2>
            <form className="w-50 m-auto" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Nom de la Recette</label>
                    <input className="form-control" type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Étapes</label>
                    {Object.entries(steps).map(([stepNumber, stepValue]) => (
                        <div className="d-flex align-items-center mt-2" key={stepNumber}>
                            <input className="form-control me-2" type="text" value={stepValue} onChange={(e) => handleStepChange(stepNumber, e.target.value)} required />
                            <button type="button" className="btn btn-warning" onClick={addStep}>+</button>
                        </div>
                    ))}
                </div>

                <div className="mb-3">
                    <label className="form-label">Ingrédients</label>
                    {Object.entries(ing).map(([ingNumber, ingValue]) => (
                        <div className="d-flex align-items-center mt-2" key={ingNumber}>
                            <input className="form-control me-2" type="text" value={ingValue} onChange={(e) => handleIngChange(ingNumber, e.target.value)} required />
                            <button type="button" className="btn btn-warning" onClick={addIngredient}>+</button>
                        </div>
                    ))}
                </div>

                <div className="mb-3">
                    <label className="form-label">Temps de Cuisson</label>
                    <input className="form-control" type="number" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image de la Recette</label>
                    <input className="form-control" type="file" onChange={(e) => setImg(e.target.files[0])} required />
                </div>

                <button type="submit" className="btn btn-primary w-100">Ajouter Recette</button>
            </form>
        </div>
    );
}

export default FormRecipe;
