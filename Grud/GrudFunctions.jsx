import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Cruds = () => {
    const [listClients, setListClients] = useState([]);
    const [keySearch, setKeySearch] = useState('');
    const [update, setUpdate] = useState(false);
    const [client, setClient] = useState({
        id: 1,
        fname: '',
        lname: '',
        email: '',
        group: '',
        genre: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const selectedClient = listClients.find(c => c.id === parseInt(id));
            if (selectedClient) {
                setClient(selectedClient);
                setUpdate(true);
            }
        }
    }, [id, listClients]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const addClient = () => {
        setListClients([...listClients, client]);
        resetClient();
        navigate('/');
    };

    const resetClient = () => {
        setClient({
            id: listClients.length + 2,
            fname: '',
            lname: '',
            email: '',
            group: '',
            genre: ''
        });
        setUpdate(false);
    };

    const confirmUpdate = () => {
        const updatedClients = listClients.map(c => (c.id === client.id ? client : c));
        setListClients(updatedClients);
        resetClient();
        navigate('/');
    };

    const deleteClient = (id) => {
        const filteredClients = listClients.filter(c => c.id !== id);
        setListClients(filteredClients);
    };

    const filterClients = () => {
        if (keySearch === '') {
            return listClients;
        }
        return listClients.filter(client =>
            client.fname.toLowerCase().includes(keySearch.toLowerCase()) ||
            client.lname.toLowerCase().includes(keySearch.toLowerCase()) ||
            client.group.toLowerCase().includes(keySearch.toLowerCase())
        );
    };

    return (
        <div className="container mt-5">
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <div className="card shadow p-4 mb-5 bg-body rounded">
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Rechercher un client..."
                                        onChange={(e) => setKeySearch(e.target.value)}
                                    />
                                </div>

                                <table className="table table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Prénom</th>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Groupe</th>
                                            <th>Genre</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterClients().map((cli) => (
                                            <tr key={cli.id}>
                                                <td>{cli.id}</td>
                                                <td>{cli.fname}</td>
                                                <td>{cli.lname}</td>
                                                <td>{cli.email}</td>
                                                <td>{cli.group}</td>
                                                <td>{cli.genre}</td>
                                                <td>
                                                    <Link to={`/edit/${cli.id}`} className="btn btn-primary btn-sm me-2">
                                                        Modifier
                                                    </Link>
                                                    <button className="btn btn-danger btn-sm" onClick={() => deleteClient(cli.id)}>
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Link to="/add" className="btn btn-success">
                                    Ajouter Client
                                </Link>
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/add"
                    element={
                        <ClientForm
                            client={client}
                            update={update}
                            handleInputChange={handleInputChange}
                            confirmUpdate={confirmUpdate}
                            addClient={addClient}
                            resetClient={resetClient}
                        />
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <ClientForm
                            client={client}
                            update={update}
                            handleInputChange={handleInputChange}
                            confirmUpdate={confirmUpdate}
                            addClient={addClient}
                            resetClient={resetClient}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

const ClientForm = ({ client, update, handleInputChange, confirmUpdate, addClient, resetClient }) => {
    return (
        <div className="card shadow p-4 mb-5 bg-body rounded">
            <h2 className="text-center mb-4">{update ? "Modifier Client" : "Ajouter Client"}</h2>
            <form className="mb-3">
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            name="fname"
                            placeholder="Prénom"
                            value={client.fname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            name="lname"
                            placeholder="Nom"
                            value={client.lname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            value={client.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            name="group"
                            value={client.group}
                            onChange={handleInputChange}
                        >
                            <option value="">Sélectionnez un groupe</option>
                            <option value="DEV-200">DEV-200</option>
                            <option value="DEV-201">DEV-201</option>
                            <option value="DEV-202">DEV-202</option>
                        </select>
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="form-check me-3">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="genre"
                                value="homme"
                                checked={client.genre === "homme"}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label">Homme</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="genre"
                                value="femme"
                                checked={client.genre === "femme"}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label">Femme</label>
                        </div>
                    </div>
                    <div className="col-md-6 text-end">
                        {update ? (
                            <>
                                <button type="button" className="btn btn-info me-2" onClick={confirmUpdate}>
                                    Confirmer la mise à jour
                                </button>
                                <button type="button" className="btn btn-warning" onClick={resetClient}>
                                    Annuler
                                </button>
                            </>
                        ) : (
                            <button type="button" className="btn btn-success" onClick={addClient}>
                                Ajouter Client
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

const App = () => (
    <Router>
        <Cruds />
    </Router>
);

export default App;
