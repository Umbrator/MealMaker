import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from './Components/Header';
import Form from './Components/form';
import Unique from './Components/single';
import Update from './Components/update';
import Search from './Components/search';
import Login from "./Components/login";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Pagerror from "./Components/pagerror";
import FormRecipe from "./Components/formrecipe";
import Recipe from "./Components/recipe";
import Filter from "./Components/filter";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [auth, setAuth] = useState(!!localStorage.getItem("ACCESS_TOKEN"));
    const [role, setRole] = useState( auth ? localStorage.getItem("role") : null);

    const setAuthState = (newAuthState) => {
        setAuth(newAuthState);
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("ACCESS_TOKEN");
            if (!token) {
                setAuth(false);
            } else {
                try {
                    const response = await axios.post("http://localhost:8000/checkauth", null, {
                        headers: { "access": token },
                    });
                    setAuth(response.data.state);
                } catch (error) {
                    console.error("Error checking authentication:", error);
                    setAuth(false);
                }
            }
        };

        checkAuth();
    }, []);
    return (
        <div className="App">
            {auth && <Header />}
            <Routes>
                <Route path="/" element={auth ? <Home /> : <Login setAuthState={setAuthState} />} />
                {auth ? 
                    <>
                    <Route path="/search/:search" element={<Search />} />
                    <Route path="/user/:iduser" element={<Unique />} />
                    <Route path="/update/:iduser" element={<Update />} />
                    <Route path="/form/recipe" element={<FormRecipe />} />
                    <Route path="/recipe/:idRecipe" element = {<Recipe />} />
                    <Route path="/recipe/filter" element = {<Filter />} />
                    </> : null
                }
                {role === "admin" ? 
                    auth ? 
                        <Route path="/dashboard" element={<Dashboard />} /> : null
                        : 
                    null
                }
                <Route path="/form" element={<Form />} />
                <Route path="*" element={<Pagerror />} />
            
            </Routes>
        </div>
    );
}

export default App;
