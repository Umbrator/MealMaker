import { Link , useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Header() {
    
    const role = localStorage.getItem("role") ? localStorage.getItem("role") : "user"; 
    
    const id = localStorage.getItem("userID") ? localStorage.getItem("userID") : null;
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (id) {
            axios.post("http://localhost:8000/single", {code : id}).then(res => setUser(res.data[0]))
        } 
    },[id]);
    
    
    
    
    const [search, setSearch] = useState();
    const nav = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        nav(`/search/${search}`)
    }

    return ( 
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Meal Maker</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {role === "admin" ? 
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/dashboard">Dashboard</Link>
                                </li> : null
                            }
                            <li className="nav-item ms-3">
                                <Link to="/form/recipe" className="nav-link active btn btn-success text-light">+ Ajouter Recipe</Link>
                            </li>
                            <li className="nav-item ms-3">
                                <Link to="/recipe/filter" className="nav-link active btn btn-warning text-light">Filter Recipe</Link>
                            </li>
                        </ul>
                        <img src={`http://localhost:8000/files/Users/${user.img}`} onClick={() => nav(`/user/${id}`)} width="2%" height="1%" className="mx-2" style={{borderRadius:"30px"}}/>
                        <form className="d-flex" role="search" onSubmit={(e) => handleSearch(e)}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            );
}
export default Header;