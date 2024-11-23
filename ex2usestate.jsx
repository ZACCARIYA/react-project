import React, { useState } from 'react';

export default function FormComponent() {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [sbmit, setsbmit] = useState([]);

  const handleClick = () => {
    if (prenom && nom) {
      
      setsbmit([...sbmit, { prenom, nom }]);
      setPrenom(''); 
      setNom('');
    } else {
      alert("Veuillez remplir");
    }
  };

  return (
    <div className="container">
      <h3>Formulaire</h3>
      <div>
        <label>
          Prénom:
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Entrez votre prénom"
          />
        </label>
        <br />
        <label>
          Nom:
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Entrez votre nom"
          />
        </label>
        <br />
        <button onClick={handleClick}>Envoyer</button>
      </div>


      <h3>Données soumises:</h3>
      {sbmit.length > 0 ? (
        <ul>
          {sbmit.map((data, index) => (
            <li key={index}>
              {data.prenom} {data.nom}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune donnée soumise.</p>
      )}
    </div>
  );
}
