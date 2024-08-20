import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const [users, setUsers] = useState([]);
    const nav = useNavigate()
    
    useEffect(() => {
        axios.get("http://localhost:8000/").
        then(res => setUsers(res.data))
    },[]) 

    const handleDelete = async (id) => {
        await axios.post("http://localhost:8000/delete", {id})
        setUsers(users.filter((u) => u.code != id));
    }

    const handleUpdate = (id) => {
        nav(`/update/${id}`);
    }

    return ( 
        <div>
            <h1>DashBoard</h1>
            
            {users.length == 0 ? <h1>No Users To show...</h1>  : 
                <div>
                    <h1>All Users</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Nom</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Telephone</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {users.map((u, i) => {
                                return(
                                <tr key={i}>
                                    <th scope="row">{u.code}</th>
                                    <td>{u.nom}</td>
                                    <td>{u.email}</td>
                                    <td>{u.telephone}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => handleUpdate(u.code)}>Update</button>
                                        <button className="btn btn-danger ms-1" onClick={()=>handleDelete(u.code)}>Delete</button>
                                        <button className="btn btn-primary ms-1" onClick={()=>nav(`/user/${u.code}`)}>Show</button>
                                    </td>
                                </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default Dashboard;