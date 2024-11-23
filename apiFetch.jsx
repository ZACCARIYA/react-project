import { useEffect, useState } from "react";

export default function Fetchapi() {
    const [idusr, setid] = useState(1);
    const [users, setusers] = useState(null);

    const handlechange = (e) => {
        setid(e.target.value);
    };

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${idusr}`)
            .then((rep) => rep.json())
            .then((user) => setusers(user))
            .catch((error) => console.error("Error fetching data:", error));
    }, [idusr]);

    return (
        <div>
            <h1>Info Users</h1>

            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="userId">Saisir l'ID à rechercher:</label>
                <input
                    id="userId"
                    type="text"
                    value={idusr}
                    onChange={handlechange}
                />
                <input type="submit" value="Recherche" />
            </form>

            <h1>Résultat de la recherche:</h1>
            <div>
                {(users) ? (
                    <div>
                        <p>ID: {users.id}</p>
                        <p>Nom: {users.name}</p>
                        <p>Email: {users.email}</p>
                        {users.address && (
                            <div>
                                <h2>Address:</h2>
                                <p>Street: {users.address.street}</p>
                                <p>City: {users.address.city}</p>
                                <p>Code Postal: {users.address.zipcode}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Aucun utilisateur ne correspond à cet ID.</p>
                )}
            </div>
        </div>
    );
}
