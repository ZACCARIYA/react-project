import React, { Component } from "react";

class GrudFacture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: {
                nom: "",
                marque: "",
                prix: 0,
                qte: 0
            },
            panier: [],
            total: 0
        }
   
        this.produitDispo = [
            { nom: 'DELL', marque: '100', prix: 12000, qte: 12 },
            { nom: 'Hp', marque: '100', prix: 19000, qte: 10 },
            { nom: 'LENOVO', marque: '100', prix: 18000, qte: 13 }
        ]
    }
    

    getProduit = (prod) => {
        const produitSelect = this.produitDispo.find((p) => p.nom === prod.target.value);
        console.log(produitSelect);
        this.setState({
            produit: produitSelect
        })
    }

    getQte = (prod) => {
        console.log('handle produit');
        this.setState({
            produit: {
                ...this.state.produit,
                qte: prod.target.value
            }
        })
    }

    ajouter = () => {
        if (this.state.produit.nom !== '' && this.state.produit.marque !== '' && this.state.produit.prix > 0 && this.state.produit.qte > 0) {
            this.setState({
                panier: [...this.state.panier, this.state.produit],
                produit: { nom: '', marque: '', prix: 0, qte: 0 },
                total: this.state.total + this.state.produit.prix * this.state.produit.qte
            });
        }
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        <td> Produit </td>
                        <td>
                            <select name="nomProd" onChange={this.getProduit}>
                                {this.produitDispo.map((key) => {
                                    return <option key={key.nom} value={key.nom}>{key.nom}</option>;
                                })}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td> marque </td>
                        <td> <input type="text" value={this.state.produit.marque} readOnly /></td>
                    </tr>
                    <tr>
                        <td> qte </td>
                        <td> <input type="number" value={this.state.produit.qte} onChange={this.getQte} /></td>
                    </tr>
                    <tr>
                        <td> prix  </td>
                        <td> <input type="number" value={this.state.produit.prix} readOnly /></td>
                    </tr>
                    <tr>
                        <td> <input type="button" value="Ajouter produit" onClick={this.ajouter} /></td>
                    </tr>
                </table>
                <h1> panier </h1>
                <table>
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Produit</th>
                            <th>Marque</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.panier.map((prod, pos) => {
                            return (
                                <tr key={pos}>
                                    <td>{pos + 1}</td>
                                    <td>{prod.nom}</td>
                                    <td>{prod.marque}</td>
                                    <td>{prod.prix}</td>
                                    <td>{prod.qte}</td>
                                    <td>{prod.prix * prod.qte}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <h3>Total: {this.state.total}</h3>
            </div>
        );
    }
}

export default GrudFacture;
