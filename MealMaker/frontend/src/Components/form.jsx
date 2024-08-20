import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
    const [user, setUser] = useState({
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        password: "",
        img: null,
        role: "user",
    });

    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const form = new FormData();
        form.append('nom', user.nom); 
        form.append('prenom', user.prenom);
        form.append('telephone', user.telephone);
        form.append('email', user.email);
        form.append('password', user.password);
        form.append('img', user.img);
        form.append('role', user.role);

        axios.post("http://localhost:8000/adduser", form).then(() => {nav("/");})
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Inscription Utilisateur</h2>
            <form className="w-50 m-auto" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input className="form-control" type="text" onChange={(e) => setUser({ ...user, nom: e.target.value })} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Prenom</label>
                    <input className="form-control" type="text" onChange={(e) => setUser({ ...user, prenom: e.target.value })} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input className="form-control" type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Telephone</label>
                    <input className="form-control" type="text" onChange={(e) => setUser({ ...user, telephone: e.target.value })} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input className="form-control" type="file" onChange={(e) => setUser({ ...user, img: e.target.files[0] })} />
                </div>

                <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
            </form>
        </div>
    );
}

export default Form;
