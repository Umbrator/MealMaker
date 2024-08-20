import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Update() {
    const { iduser } = useParams();
    const [user, setUser] = useState({});
    const [newdata, setNewData] = useState({
        nom: "",
        email: "",
        telephone: "",
    });
    const nav = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:8000/single", { code: iduser })
             .then((res) => setUser(res.data[0]));
    }, [iduser]);

    useEffect(() => {
        setNewData({
            nom: user.nom || "",
            email: user.email || "",
            telephone: user.telephone || "",
        });
    }, [user]);

    const obj = { nom: newdata.nom, email: newdata.email, telephone: newdata.telephone, code: iduser };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/update", obj).then(() => nav("/"));
    };

    return (
        <div className="container mt-4">
            {Object.keys(user).length === 0 ? (
                <h1 className="text-center">User Not Found</h1>
            ) : (
                <div>
                    <h1 className="text-center mb-4">Update User: {user.nom}</h1>
                    <form className="w-50 m-auto" onSubmit={handleSubmit}>
                        
                        <div className="mb-3">
                            <label className="form-label">Nom</label>
                            <input className="form-control" type="text" value={newdata.nom} onChange={(e) => setNewData({ ...newdata, nom: e.target.value })} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">E-mail</label>
                            <input className="form-control" type="email" value={newdata.email} onChange={(e) => setNewData({ ...newdata, email: e.target.value })} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Telephone</label>
                            <input className="form-control" type="text" value={newdata.telephone} onChange={(e) => setNewData({ ...newdata, telephone: e.target.value })} required />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Update</button>
                    
                    </form>
                </div>
            )}
        </div>
    );
}

export default Update;
