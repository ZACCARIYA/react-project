import React from "react";

export default class Exercice2Props_C1 extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <ol>
                    {this.props.listClient.map((index, val)=>{
                        return <li key={index}>{val}</li>
                    })}
                </ol>
            </div>
        )
    }
}