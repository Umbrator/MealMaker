import { useState } from "react";
import axios from "axios";
import MealList from "./MealList";

function Filter() {
    const [ing, setIng] = useState({ 1: "" });
    const [state , setState] = useState({exist:false, meals:null});

    const handleIngChange = (ingNumber, value) => {
        setIng({ ...ing, [ingNumber]: value });
    };

    const addIngredient = () => {
        const newIngNumber = Object.keys(ing).length + 1;
        setIng({ ...ing, [newIngNumber]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const ingredientsArray = Object.values(ing).filter(value => value.trim() !== "");
        axios.post("http://localhost:8000/filterMeal", ingredientsArray)
            .then(
                res => {
                    if (res.data.state) {
                        setState({...state,  exist: true, meals : res.data.meals})
                    } else {
                        setState({...state, exist:false, meals:null})
                        console.log("no records")
                    }
                }
            );
    }
    
    return (
        <div>
            {!state.exist ? 
                <div className="container m-auto w-75">
                    <h1>Filter Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-3 mb-3">
                            <label className="form-label">Ingredients</label>
                            {Object.entries(ing).map(([ingNumber, ingValue]) => (
                                <span className="d-flex mt-1" key={ingNumber}>
                                    <input
                                        className="form-control text-center"
                                        type="text"
                                        value={ingValue}
                                        onChange={(e) => handleIngChange(ingNumber, e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-warning ms-1 text-light"
                                        onClick={addIngredient}
                                    >
                                        +
                                    </button>
                                </span>
                            ))}
                            <input type="submit" value="Search" className="btn btn-primary mt-2" />
                        </div>
                    </form>
                </div>
            : 
                <MealList meals={state.meals}/>
            }
        </div>
    );
}

export default Filter;
