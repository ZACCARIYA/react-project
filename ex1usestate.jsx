import {useState} from "react";

 function UseStateExemple1(){
    const [nom, SetNom]=useState("");
    const [prenom, Setprenom] = useState("");

 const Handlechangemodify = (event)=>{
    console.log("handle Nom");
    const value = event.target.value;
    SetNom(value);
    Setprenom(value);
};
    return(
        <div>
           <p>{nom}</p>
           <p>{prenom}</p>
            <input type="button" value={nom} onClick={() => SetNom("benchakouk")}/>
            <input type="button" value={prenom} onClick={() => Setprenom("zaccaria")}/>

            <input type="text" value="input modify" onChange={Handlechangemodify}/>
        </div>
    );
}
export default UseStateExemple1;