import { useState } from "react";
import React  from "react";
function Form() {
    const [nom, setNom] = useState("");
    const [password, setPassword] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const [ville, setVille] = useState("");
    const [genre, setGenre] = useState("");
    const [loisirs, setLoisirs] = useState([]);
    const [submittedData, setSubmittedData] = useState(null); 

   
    function handleLoisirs(e) {
        if (!loisirs.includes(e.target.value)) {
            setLoisirs([...loisirs, e.target.value]);
        } else {
            setLoisirs(loisirs.filter((item) => item !== e.target.value));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = { nom, password, dateNaissance, ville, genre, loisirs };
        setSubmittedData(formData); 
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Formulaire d'inscription</h2>

                <label htmlFor="nom">Nom:</label>
                <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                />

                <label htmlFor="password">Mot de passe:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="dateNaissance">Date de naissance:</label>
                <input
                    type="date"
                    id="dateNaissance"
                    value={dateNaissance}
                    onChange={(e) => setDateNaissance(e.target.value)}
                    required
                />

                <label htmlFor="ville">Ville:</label>
                <select
                    id="ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    required
                >
                    <option value="">Choisir une ville</option>
                    <option value="casablanca">Casablanca</option>
                    <option value="khemissat">khemissat</option>
                    <option value="rabat">Rabat</option>
                    <option value="kenitra">kenitra</option>
                    <option value="ifrane">ifrane</option>
                </select>

                <p>Genre:</p>
                <label>
                    <input
                        type="radio"
                        name="genre"
                        value="homme"
                        checked={genre === "homme"}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    /> Homme
                </label>
                <label>
                    <input
                        type="radio"
                        name="genre"
                        value="femme"
                        checked={genre === "femme"}
                        onChange={(e) => setGenre(e.target.value)}
                    /> Femme
                </label>

                <p>Loisirs:</p>
                <label>
                    <input
                        type="checkbox"
                        value="sport"
                        checked={loisirs.includes("sport")}
                        onChange={handleLoisirs}
                    /> Sport
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="lecture"
                        checked={loisirs.includes("lecture")}
                        onChange={handleLoisirs}
                    /> Lecture
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="musique"
                        checked={loisirs.includes("musique")}
                        onChange={handleLoisirs}
                    /> Musique
                </label>

                <button type="submit">S'inscrire</button>
            </form>

            {/* Afficher les données soumises */}
            {submittedData && (
                <div className="submitted-data">
                    <h3>Données Soumises:</h3>
                    <p><strong>Nom:</strong> {submittedData.nom}</p>
                    <p><strong>Mot de passe:</strong> {submittedData.password}</p>
                    <p><strong>Date de naissance:</strong> {submittedData.dateNaissance}</p>
                    <p><strong>Ville:</strong> {submittedData.ville}</p>
                    <p><strong>Genre:</strong> {submittedData.genre}</p>
                    <p><strong>Loisirs:</strong> {submittedData.loisirs.join(", ")}</p>
                </div>
            )}
        </div>
    );
}

export default Form;
