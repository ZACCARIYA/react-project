import React from "react"
import "bootstrap/dist/css/bootstrap.css"

export default function Stagiaire(props) {
    return (
        <div className="border border-2 border-danger mt-2">
            <p className="fw-bold">ID: {props.stg.id}</p>
            <p>NOM: {props.stg.nom}</p>
            <p>Groupe: {props.stg.groupe}</p>
        </div>
    )
}
