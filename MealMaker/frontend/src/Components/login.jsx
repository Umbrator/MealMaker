import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ setAuthState }) {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [exist, setExist] = useState(true);
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { email: user.email, password: user.password };
        axios.post("http://localhost:8000/login", data)
            .then(res => {
                if (res.data.state) {
                    localStorage.setItem("ACCESS_TOKEN", res.data.token);
                    localStorage.setItem("userID", res.data.iduser);
                    localStorage.setItem("role", res.data.role);
                    setAuthState(true);
                    nav('/');
                } else {
                    setExist(false);
                }
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card p-4 w-50">
                <form onSubmit={handleSubmit}>
                    {!exist && <p className="text-danger">Your Data is Incorrect</p>}
                    <div className="mb-3">
                        <label className="form-label">E-mail</label>
                        <input type="email" className="form-control" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="mt-3 text-center">
                    <Link to="/form" className="text-decoration-none">Create Account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
