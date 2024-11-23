import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddClient = ({ addClient }) => {
    const [client, setClient] = useState({
        id: Date.now(),
        fname: '',
        lname: '',
        email: '',
        group: '',
        genre: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleSubmit = () => {
        addClient(client);
        navigate("/");
    };

    return (
        <div className="card shadow p-4 mb-5 bg-body rounded">
            <h2 className="text-center mb-4">Ajouter un Client</h2>
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
                <button type="button" className="btn btn-success" onClick={handleSubmit}>Ajouter Client</button>
            </form>
        </div>
    );
};

export default AddClient;
