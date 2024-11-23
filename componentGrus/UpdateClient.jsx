import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateClient = ({ clients, updateClient }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({
        id: '',
        fname: '',
        lname: '',
        email: '',
        group: '',
        genre: ''
    });

    useEffect(() => {
        const clientToUpdate = clients.find(cli => cli.id === Number(id));
        if (clientToUpdate) {
            setClient(clientToUpdate);
        }
    }, [id, clients]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleSubmit = () => {
        updateClient(client);
        navigate("/");
    };

    return (
        <div className="card shadow p-4 mb-5 bg-body rounded">
            <h2 className="text-center mb-4">Modifier Client</h2>
            <form>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="fname"
                        placeholder="Prénom"
                        value={client.fname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="lname"
                        placeholder="Nom"
                        value={client.lname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={client.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <select className="form-select" name="group" value={client.group} onChange={handleInputChange}>
                        <option value="">Sélectionnez un groupe</option>
                        <option value="DEV-200">DEV-200</option>
                        <option value="DEV-201">DEV-201</option>
                        <option value="DEV-202">DEV-202</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-check-label me-2">Genre: </label>
                    <input
                        className="form-check-input me-2"
                        type="radio"
                        name="genre"
                        value="homme"
                        checked={client.genre === "homme"}
                        onChange={handleInputChange}
                    /> Homme
                    <input
                        className="form-check-input ms-2"
                        type="radio"
                        name="genre"
                        value="femme"
                        checked={client.genre === "femme"}
                        onChange={handleInputChange}
                    /> Femme
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Confirmer Modification</button>
            </form>
        </div>
    );
};

export default UpdateClient;
