import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function UpdateStagiaire() {
    const [idStg, setIdStg] = useState(1);
    const [nomStg, setNomStg] = useState("");
    const [groupeStg, setGroupeStg] = useState("");

    const [stagiaires, setStagiaires] = useState([]);

    useEffect(() => {
        const getStagiaires = async () => {
            const lesStagiaires = await fetch("http://localhost:3000/stagiaires", {
                method: "GET"
            })
            .then((rep) => rep.json())
            .then((data) => setStagiaires(data))
            .catch((error) => console.error("Error fetching stagiaires:", error));
        };
        getStagiaires();
    }, []);

    const verifierStagiaire = (ids) => {
        return stagiaires.find((stg) => stg.id === Number(ids));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const upStg = { id: idStg, nom: nomStg, groupe: groupeStg };

        fetch(`http://localhost:3000/stagiaires/${idStg}`, {
            method: "PUT",
            body: JSON.stringify(upStg),
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            if (response.ok) {
                alert("Stagiaire modifié avec succès");
                // Optional: Update the stagiaires list in the state after modification
                setStagiaires((prev) =>
                    prev.map((stg) =>
                        stg.id === idStg ? { ...stg, nom: nomStg, groupe: groupeStg } : stg
                    )
                );
            } else {
                alert("Erreur lors de la modification");
            }
        })
        .catch((error) => console.error("Error updating stagiaire:", error));

        setNomStg("");
        setGroupeStg("");
    };

    const handleModify = () => {
        const selectedStagiaire = verifierStagiaire(idStg);
        if (selectedStagiaire) {
            setNomStg(selectedStagiaire.nom);
            setGroupeStg(selectedStagiaire.groupe);
        } else {
            alert("Erreur : Aucun stagiaire avec cet ID.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="alert alert-warning fw-bold text-center">Modifier Stagiaire</p>
            <div className="mb-3">
                <label htmlFor="ids" className="form-label">ID STAGIAIRE</label>
                <input
                    type="number"
                    className="form-control"
                    id="ids"
                    value={idStg}
                    required
                    onChange={(e) => setIdStg(e.target.value)}
                />

                <label htmlFor="nm" className="form-label">NOM STAGIAIRE</label>
                <input
                    type="text"
                    className="form-control"
                    id="nm"
                    value={nomStg}
                    required
                    onChange={(e) => setNomStg(e.target.value)}
                />

                <label htmlFor="gr" className="form-label">GROUPE STAGIAIRE</label>
                <input
                    type="text"
                    className="form-control"
                    id="gr"
                    value={groupeStg}
                    required
                    onChange={(e) => setGroupeStg(e.target.value)}
                />
            </div>

            <button type="button" className="btn btn-primary" onClick={handleModify}>
                Modifier
            </button>
            <button type="submit" className="btn btn-primary">
                Valider
            </button>
        </form>
    );
}
