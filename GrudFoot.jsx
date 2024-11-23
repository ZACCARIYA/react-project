import { Component } from "react";
//import "./App.css"
class FootballGame extends Component
{
 constructor() {
  super();
  this.state = {
    listeEquipes: [
      {
                    id:'',
                    nom:'',
                    city:'',
                    listeJoueur:[]
                }
                    

    ],

    equipe: {
      id: '',
      nom: '',
      city: ''
    },

    joueur: {
      id: '',
      nom: '',
      num: '',
      idEquipe: ''

    },
    message: '',
    indexEquipeAmodifier: -1
  }
}

//récupérer les valeur de l'équipe
getValueEquipe = (event) =>{
  //récupérer name et value from input
  const {
    name,
    value
  } = event.target;
  this.setState({
    equipe: {...this.state.equipe,
      [name] : value
    }
  })
}

	
//=========================

    
      //récupérer les valeur du joueur
getValueJoeur = (event) =>{
  //récupérer name et value from input
  const {
    name,
    value
  } = event.target;
  this.setState({
    joueur: {...this.state.joueur,
      [name] : value
    }
  })
}

//========================



    ajouterEquipe=()=>{
        const {nom,id,city}=this.state.equipe;
        //validation des données du l'équipe
        if(nom!=''&& id!='' && city!='')
        {
            this.setState({
                listeEquipes:[...this.state.listeEquipes,
                    {
                        id:this.state.equipe.id,
                        nom:this.state.equipe.nom,
                        city:this.state.equipe.city,
                        listeJoueur:[]
                    }
                ]
            })

        }
        else{
     this.setState({
        message:'Erreur tout les champs sont obligatoire'
     })
        }
    }

	
//========================

   ajouterJoueur = () = >{
  //validation des données du joueur
  const {
    id,
    nom,
    num,
    idEquipe
  } = this.state.joueur;
  if (id && nom && num) {
    //récupéer l'equpe quant veut ajouter un joueur dans Sa listeJoueur:[]
    const equipeAjouterUnJoeur = this.state.listeEquipes[idEquipe];
    //ajouter le nouveau joueur dans la liste des joueurs de cette Equipe
    equipeAjouterUnJoeur.listeJoueur.push(this.state.joueur);

    const listeEquipeOriginale = this.state.listeEquipes;
    listeEquipeOriginale[idEquipe] = equipeAjouterUnJoeur;

    this.setState({
      listeEquipes: listeEquipeOriginale

    })

  } else {
    this.setState({
      message: "tout les champs du joeurs sont obligatoires"
    })
  }
}

//========================
supprimerEquipe = (indexEquipeAsupprimer) = >{
  this.setState({
    listeEquipes: this.state.listeEquipes.filter((eq, index) = >index != indexEquipeAsupprimer)
  })
}

//========================

modifierEquipe = (index, eq) = >{

  this.setState({
    equipe: eq,
    indexEquipeAmodifier: index
  })
}

//========================
validerModifier = () = >{
  const indexEquipeAmodifier = this.state.listeEquipes[this.state.indexEquipeAmodifier];
  const newEquipe = {
    id: this.state.equipe.id,
    nom: this.state.equipe.nom,
    city: this.state.equipe.city,
    listeJoueur: indexEquipeAmodifier.listeJoueur
  }

  const listeEquipeOriginale = this.state.listeEquipes;
  listeEquipeOriginale[this.state.indexEquipeAmodifier] = newEquipe;
  this.setState({
    listeEquipes: listeEquipeOriginale

  })

    }
    render()
    {
        return(<div>
            Add Equipe:<br/>
          id:  <input type="number" name="id" onChange={this.getValueEquipe} value={this.state.equipe.id}/><br/>
          nom:  <input type="text" name="nom" onChange={this.getValueEquipe} value={this.state.equipe.nom}/><br/>
          city:  <input type="text" name="city" onChange={this.getValueEquipe} value={this.state.equipe.city}/><br/>
              {
                this.state.indexEquipeAmodifier!=-1 ? (
               <input type="button" value="Modifier" onClick={this.validerModifier}/>
                ):(
                    <input type="button" value="AddEquipe" onClick={this.ajouterEquipe}/> 
  
                )
              }
               
                {this.state.message}


<h2>Ajouter Joeur</h2>
City:<select name="idEquipe" onChange={this.getValueJoeur}>
    {
        this.state.listeEquipes.map((eq,index)=>
        {
            return (<option value={index}>
                {eq.nom}
            </option>)

        })
    }
</select>
Id:<input type="number"name="id" onChange={this.getValueJoeur}/><br/>
Nom:<input type="text" name="nom" onChange={this.getValueJoeur}/><br/>
Num:<input type="number"  name="num" onChange={this.getValueJoeur}/><br/>

<input type="button" value="Ajouter le Joueur" onClick={this.ajouterJoueur}/>
{this.state.listeEquipes.length>1 ? (
           <h2>Liste Equipes</h2>
                <table>
                    <thead>
                    <th>Actions</th>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>City</th>
                        <th>Joeurs</th>
                        
                    </thead>
                    <tbody>
                        {this.state.listeEquipes.map((eq,index)=>{
                            return(<tr key={index}>
                        <td>
                            <input type="button" onClick={()=>{this.supprimerEquipe(index)}} value="Supprimer"/>
                            <input type="button" onClick={()=>{this.modifierEquipe(index,eq)}} value="Modifier"/></td>
                         <td>{eq.id}</td>
                         <td>{eq.nom}</td>
                         <td>{eq.city}</td>
                         <td>

                            <table>
                                <thead>
                                    <th>Id</th>
                                    <th>Nom</th>
                                    <th>Numéro</th>
                                </thead>
                                <tbody>
                                    {
                                      eq.listeJoueur.map((jo,index2)=>{
                                        return(<tr key={index2}>
                                            <td>{jo.id}</td>
                                            <td>{jo.nom}</td>
                                            <td>{jo.num}</td>
                                        </tr>)
                                      })  
                                    }
                                </tbody>
                            </table>
                         </td>

                            </tr>)
                        })}
                    </tbody>
                </table>
				):(<h1>Rien à affiché </h1>)
}
        </div>)
    }
}
export default FootballGame;