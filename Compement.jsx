import { Component } from "react";

export default class Composant1 extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }

    afficherinfo = () => {
        return (
            <div>
                <h1>{this.state.nom}</h1>
                <h2>{this.state.prenom}</h2>
                <h2>{this.state.gender}</h2>

                <h2>{this.state.age}</h2>
            </div>
        );
    }

    handlechangenom = (e) => {
        console.log('handle nom');
        this.setState({
            nom: e.target.value
        });
    }

    handlechangeprenom = (e) => {
        console.log('handle prenom');
        this.setState({
            prenom: e.target.value
        });
    }

    handlechangeage = (e) => {
        console.log('handle age');
        this.setState({
            age: e.target.value
        });
    }
    handlechangender = (e)=>{
        console.log('handle gender');
        this.setState({
            gender: e.target.value 
        });
    }

    componentDidMount() {
        console.log("Component ");
    }

    render() {
        return (
            <div>
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                    nom: <input type="text" value={this.state.nom} onChange={this.handlechangenom} /><br />
                    prenom: <input type="text" value={this.state.prenom} onChange={this.handlechangeprenom} /><br />
                    age: <input type="number" value={this.state.age} onChange={this.handlechangeage} /><br />
                    gender: <input type="radio" name="gender" value="Male" onChange={this.handlechangender}  required={this.state.gender === "Male"} /> Male <br/>
                            <input type="radio" name="gender" value="Femme" onChange={this.handlechangender}  required={this.state.gender === "femme"} /> femme <br/>
                    <input type="submit" value='send' onSubmit={this.afficherinfo} />
                </form>
                <p>{this.afficherinfo()}</p>
            </div>
        );
    }
}
