
import { Component } from "react";


export default class Cruds extends Component {

    constructor(props) {
        super(props);
        // État initial du composant
        this.state = {
            listClients: [], // Liste des clients
            keySearch: '', // Clé de recherche
            update: false, // État d'update
            client: {
                id: 1, // ID du client
                fname: '', // Prénom du client
                lname: '', // Nom de famille du client
                email: '', // Email du client
                group: '', // Groupe du client
                genre: '' // Genre du client
            },
            firstpage: 1, // Première page
            lastPage: 3, // Dernière page
            totalClients: 0 // Nombre total de clients
        }
    }

    // Soumettre le formulaire
    submitForm = (e) => {
        e.preventDefault()
    }

    // Récupérer les informations du client à partir des champs de saisie
    getClient = (e) => {
        const { name, value } = e.target
        this.setState((prevState) => ({
            client: { ...prevState.client, [name]: value.toLowerCase() }
        }))
    }

    // Ajouter un client à la liste
    AjouterClient = () => {
        const { client, totalClients, lastPage } = this.state
        // if (client.lname !== "" && client.fname !== "" && client.email !== "" && client.genre !== "" && client.group !== "") {
        this.setState((prevState) => ({
            listClients: [...prevState.listClients, prevState.client] // Ajouter le client à la liste
        }))
        this.setState(prevState => ({
            client: {
                id: prevState.client.id + 1, // Incrémenter l'ID du client
                fname: '',
                lname: '',
                email: '',
                group: '',
                genre: ''
            }
        }))
        // } else {
        //     alert("Tous les choix sont obligatoires *") // Alerte si les champs obligatoires ne sont pas remplis
        // }


        if (totalClients >= lastPage) {

            this.setState(prevState => ({
                totalClients: prevState.totalClients + 1,
            }))
        }
    }

    // Mettre à jour un client existant
    updateClient = (cli) => {
        this.setState(prevState => ({
            client: cli, // Mettre à jour les informations du client
            update: true // Activer le mode de mise à jour
        }))

    }

    // Confirmer la mise à jour du client
    confirmUpdated = () => {
        const newlist = this.state.listClients.map(client => {
            if (this.state.client.id === client.id) {
                return this.state.client // Retourner le client mis à jour
            } else {
                return client // Retourner l'autre client
            }
        })
        this.setState(prevState => ({
            listClients: newlist, // Mettre à jour la liste des clients
            client: {
                id: newlist.length + 1, // Réinitialiser l'ID
                fname: '',
                lname: '',
                email: '',
                group: '',
                genre: ''
            },
            update: false, // Désactiver le mode de mise à jour
        }))
    }

    // Supprimer un client de la liste
    deleteClient = (Cli) => {
        const { listClients, firstpage, totalClients } = this.state

        const newlist = listClients.filter(client => client.id !== Cli.id); // Filtrer la liste pour supprimer le client
        this.setState(prevState => ({
            listClients: newlist, // Mettre à jour la liste
        }))

        if (totalClients <= firstpage && firstpage > 1) {

            this.setState(prevState => ({
                lastPage: prevState.lastPage - 3,
                firstpage: prevState.firstpage - 3
            }))
        }


    }

    // Obtenir la clé de recherche
    getKeySearch = (event) => {
        this.setState(prevState => ({
            keySearch: event.target.value.toLowerCase() // Mettre à jour la clé de recherche
        }))

    }

    // Annuler l'opération
    cancel = () => {
        if (this.state.update) {
            this.setState(prevState => ({
                client: {
                    id: prevState.listClients.length + 1, // Réinitialiser l'ID du client
                    fname: '',
                    lname: '',
                    email: '',
                    group: '',
                    genre: ''
                },
                update: false // Désactiver le mode de mise à jour
            }))
        } else {
            // Si ce n'est pas en mode de mise à jour, ne rien faire
        }
    }
    updateTotalClient = (total) => {
        // Si ce n'est pas en mode de mise à jour, ne rien faire
        this.setState(prevState => { prevState.totalClients = total }) // Mettre à jour le total des clients

    }

    // Afficher la liste des clients
    displayClient = () => {
        const { listClients, keySearch } = this.state

        // Vérifier si la liste des clients est vide
        if (listClients.length === 0) {
            return (
                <tr>
                    <td colSpan={7}>
                        <p className="alert alert-warning text-center m-0">Aucun client</p> {/* Alerte si aucun client */}
                    </td>
                </tr>
            )
        }

        // Filtrer les clients en fonction de la clé de recherche
        const filteredClients = listClients.filter(client => {
            if (keySearch === '') {
                return true;
            }
            return (
                client.id.toString() === keySearch ||
                client.fname.includes(keySearch) ||
                client.lname.includes(keySearch) ||
                client.genre.includes(keySearch) ||
                client.group.includes(keySearch)
            );
        });

        this.updateTotalClient(filteredClients.length)

        // Afficher les clients filtrés
        return (

            filteredClients.length > 0 ? (
                filteredClients.map((client, index) => {
                    if (this.state.lastPage > index && this.state.firstpage <= index + 1) {
                        return (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.fname}</td>
                                <td>{client.lname}</td>
                                <td>{client.email}</td>
                                <td>{client.group}</td>
                                <td>{client.genre}</td>
                                <td>
                                    <div className="d-flex justify-content-center ">
                                        <button className="btn btn-primary btn-sm mx-2" onClick={() => { this.updateClient(client) }}>Mettre à jour</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => { this.deleteClient(client) }}>Supprimer Client</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                })
            ) : (
                <tr>
                    <td colSpan={7}>
                        <p className="alert alert-warning text-center m-0">Aucun client correspondant</p> {/* Alerte si aucun client ne correspond à la recherche */}
                    </td>
                </tr>
            )
        )
    }

    // Pagination pour afficher les clients par pages
    pagination() {
        if (this.state.listClients.length > 3) {
            const { totalClients } = this.state
            return (
                <>
                    <nav aria-label="Page navigation example " className="w-100 text-center">
                        <div className="pagination btn-group w-50  mx-auto">
                            {this.state.firstpage > 3 ? (
                                    <button className="btn btn-info btn-sm" onClick={(e) => { this.paginationNextPrev("prev") }}>
                                        <i class="fa-solid fa-angles-left fa-rotate-by" ></i>
                                    </button>
                            ) : ""}

                            {this.state.listClients.map((p, index) => {
                                if (index % 3 === 0) {
                                    return (
                                        <button className="btn btn-info btn-sm " onClick={(e) => { this.paginationNextPrev("sp", index/3) }}>
                                            {index/3>0?index/3+1:1}
                                        </button>
                                    )
                                }
                            })}

                            {totalClients > this.state.lastPage ? (
                                    <button className="btn btn-info btn-sm " onClick={(e) => { this.paginationNextPrev("next") }}>
                                        <i class="fa-solid fa-angles-right fa-rotate-by" ></i>
                                    </button>
                            ) : ""}
                        </div>
                    </nav>
                </>
            )
        }
    }

    // Changer de page dans la pagination
    paginationNextPrev(param,pageN =0) {
        if (param === "next") {
            this.setState(prevState => ({
                lastPage: prevState.lastPage + 3,
                firstpage: prevState.firstpage + 3
            }))

        } else if ('prev') {
            this.setState(prevState => ({
                lastPage: prevState.lastPage - 3,
                firstpage: prevState.firstpage - 3
            }))
        }

        if(param==="sp"){
            this.setState(prevState => ({
                lastPage: (3*pageN)+3 ,
                firstpage: (3*pageN)+1
            })) 
        }


    }


    render() {
        return <>
            <div className="container mt-3 ">
                <div className="mb-2 col">

                    <h2 className="alert alert-success alert-sm w-75 mx-auto text-center">Ajouter Nouvaux Client</h2>
                    <form action="" onSubmit={this.submitForm} className=" alert alert-info" method="POST">
                        <div className="row">
                            <div className="row col">
                                <div className="form-group  col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lname"
                                        placeholder="Nom..."
                                        value={this.state.client.lname}
                                        onChange={(event) => { this.getClient(event) }} />
                                </div>

                                <div className="form-group  col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fname"
                                        placeholder="prenom..."
                                        value={this.state.client.fname}
                                        onChange={(event) => { this.getClient(event) }} />
                                </div>
                            </div>
                            <div className="row col">
                                <div className="form-group col ">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={this.state.client.email}
                                        placeholder="email..."
                                        onChange={(event) => { this.getClient(event) }} />
                                </div>
                                <div className="form-group col">
                                    <select name="group" className="form-select" onChange={(event) => { this.getClient(event) }} value={this.state.client.group}>
                                        <option value="">Groups</option>
                                        <option value="dev-200">DEV-200</option>
                                        <option value="dev-201">DEV-201</option>
                                        <option value="dev-202">DEV-202</option>
                                        <option value="dev-203">DEV-203</option>
                                        <option value="dev-204">DEV-204</option>

                                    </select>
                                </div>
                            </div>
                            <div className="form-group row col ">
                                <label htmlFor="" className="form-check-label col-3 bg-white mx-3 py-1 rounded border border-1">Genre</label>

                                <div className="col d-flex justify-content-between align-items-center col">
                                    <label htmlFor="F">Femme:</label>
                                    <input
                                        type="radio"
                                        name="genre"
                                        className="form-check-input "
                                        onChange={(event) => { this.getClient(event) }}
                                        checked={this.state.client.genre === 'femme'}
                                        value={'Femme'} />

                                    <label htmlFor="H">Homme:</label>
                                    <input
                                        type="radio"
                                        name="genre"
                                        className="form-check-input "
                                        checked={this.state.client.genre === 'homme'}
                                        onChange={(event) => { this.getClient(event) }}
                                        value={"Homme"}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group d-flex justify-content-between w-50 mx-auto mt-3">

                            {!this.state.update ? (<button className="btn btn-primary mx-2" type="submit" onClick={() => { this.AjouterClient() }}>Ajoute</button>) :
                                (<button className="btn btn-primary mx-2" type="button" onClick={() => { this.confirmUpdated() }}>Confirme</button>)}

                            <button
                                type="reset" className="btn btn-danger" onClick={() => { this.cancel() }}>Anneler</button>
                        </div>
                    </form>
                </div>
                <div className=" col">
                    <form action="" className="mb-2" onSubmit={(event) => { event.preventDefault() }}>
                        <div className="form-group  alert alert-primary ">
                            <input type="search" onChange={(event) => { this.getKeySearch(event) }} className="form-control w-50 mx-auto" placeholder="search..." />
                        </div>

                    </form>
                    <table className="table table-bordered table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>First Name</th>
                                <th>Email</th>
                                <th>Group</th>
                                <th>Genre</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayClient()}
                        </tbody>
                    </table>
                    {this.pagination()}
                </div>

            </div>
        </>
    }
}