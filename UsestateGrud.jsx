import { useEffect, useState } from "react";

export default function Grud() {
    const [Client, setClient] = useState({
        idclient: 1,
        nom: "",
        prenom: "",
        email: "",
        gender: "" 
    });
    const [listClient, setlistClient] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [modifierClicked, setmodifierClicked] = useState(false);

    const getClient = (event) => {
        setClient((preClient) => ({
            ...preClient, [event.target.name]: event.target.value
        }));
    };

    const AjouterClient = () => {
        if (Client.nom && Client.prenom && Client.email && Client.gender) {
            const newClient = { ...Client, idclient: Client.idclient };
            setlistClient((preListClient) => [
                ...preListClient,
                newClient
            ]);
            setClient({
                idclient: Client.idclient + 1,
                nom: '',
                prenom: '',
                email: '',
                gender: ''
            });
        } else {
            alert("error: ");
        }
    };

    const supprimerClient = (idclient) => {
        setlistClient(listClient.filter((key) => key.idclient !== idclient));
    };

    const modifierClient = (key) => {
        setClient(key);
        setmodifierClicked(true);
    };

    const ValiderModifierClient = () => {
        setlistClient(listClient.map((key) => {
            if (Client.idclient === key.idclient) {
                return Client;
            }
            return key;
        }));

        setClient({
            idClient:listClient[listClient.length-1].idClient+1,
            nom: '',
            prenom: '',
            email: '',
            gender: ''
        });
        setmodifierClicked(false);
    };

    return (
        <div>
            <fieldset>
                <legend>Ajouter un client</legend>
                <table>
                    <tbody>
                        <tr>
                            <td>Nom</td>
                            <td><input type="text" value={Client.nom} name="nom" onChange={getClient} /></td>
                        </tr>
                        <tr>
                            <td>Prenom</td>
                            <td><input type="text" name="prenom" value={Client.prenom} onChange={getClient} /></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="email" name="email" value={Client.email} onChange={getClient} /></td>
                        </tr>
                        <tr>
                            <td>Genre</td>
                            <td>
                                <input type="radio" name="gender" value="Femme" checked={Client.gender === "Femme"} onChange={getClient} /> Femme
                                <input type="radio" name="gender" value="Homme" checked={Client.gender === "Homme"} onChange={getClient} /> Homme
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                {modifierClicked ? (
                                    <input type="button" value="Modifier" onClick={ValiderModifierClient} />
                                ) : (
                                    <input type="button" value="Ajouter" onClick={AjouterClient} />
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>

            <h4>Liste Client</h4>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Email</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listClient.slice(startIndex, startIndex + 3).map((cli, index) => (
                            <tr key={cli.idclient}>
                                <td>{cli.idclient}</td>
                                <td>{cli.nom}</td>
                                <td>{cli.prenom}</td>
                                <td>{cli.email}</td>
                                <td>{cli.gender}</td>
                                <td>
                                    <input type="button" value="Supprimer" onClick={() => supprimerClient(cli.idclient)} />
                                    <input type="button" value="Modifier" onClick={() => modifierClient(cli)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            Pages:
            {Array.from({ length: Math.ceil(listClient.length / 3) }, (_, index) => (
                <button key={index} onClick={() => setStartIndex(index * 3)}>
                    {index + 1}
                </button>
            ))}
        </div>
    );
}
