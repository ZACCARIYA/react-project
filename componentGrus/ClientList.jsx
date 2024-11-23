import React from "react";
import { Link } from "react-router-dom";

const ClientList = ({ clients, deleteClient }) => {
    return (
        <div className="card shadow p-4 mb-5 bg-body rounded">
            <h2 className="text-center mb-4">Liste des Clients</h2>
            <Link to="/add" className="btn btn-success mb-3">Ajouter un Client</Link>

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
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.fname}</td>
                            <td>{client.lname}</td>
                            <td>{client.email}</td>
                            <td>{client.group}</td>
                            <td>{client.genre}</td>
                            <td>
                                <Link to={`/update/${client.id}`} className="btn btn-primary btn-sm me-2">Modifier</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteClient(client.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
