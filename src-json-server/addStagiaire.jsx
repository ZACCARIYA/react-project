import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.css"

export default function AddStagiaire() {
    const [idStg, setIdStg] = useState(1)
    const [nomStg, setNomStg] = useState("")
    const [groupeStg, setGroupeStg] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const nvStg = { id: idStg, nom: nomStg, groupe: groupeStg }
        fetch("http://localhost:3004/posts", {
            method: "POST",
            body: JSON.stringify(nvStg),
            headers: { "content-type": "application/json" }
        })
        
            .then(rep => alert("stagiaire Ajouté"))

        setNomStg("")
        setGroupeStg("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <p className="alert alert-warning fw-bold text-center">AJOUTER STAGIAIRE</p>
            <div className="mb-3">
                <label htmlFor="ids" className="form-label">ID STAGIAIRE</label>
                <input type="number" className="form-control" id="ids" required onChange={(e) => setIdStg(e.target.value)} />

                <label htmlFor="nm" className="form-label">NOM STAGIAIRE</label>
                <input type="text" className="form-control" id="nm" required onChange={(e) => setNomStg(e.target.value)} />

                <label htmlFor="gr" className="form-label">GROUPE STAGIAIRE</label>
                <input type="texte" className="form-control" id="gr" required onChange={(e) => setGroupeStg(e.target.value)} />

            </div>
            <button type="submit" className="btn btn-primary">Ajouter</button>
        </form>
    )

}
