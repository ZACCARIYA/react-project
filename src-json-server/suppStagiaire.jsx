import { useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.css"

export default function SuppStg() {
    const [idStg, setIdStg] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIdStg('');
        //verifier si le stagiaire à supp existe
        fetch(`http://localhost:3000/stagiaires/${idStg}`, {
            method: "delete"
        }).then(() => alert("stagiaire supprimé"));
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="">Id Stagiaire</label>
                <input type="number" className="form-control"
                    placeholder="Enter Groupe" required onChange={(e) => setIdStg(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Supprimer</button>
        </form>
    )
}
