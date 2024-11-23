import { useEffect, useState } from "react"
import Stagiaire from "./stagiaire"

export default function ListeStagiaires() {
    const [stagiaires, setStagiaires] = useState([])

    useEffect(() => {
        const getStagiaires = async () => {
            const lesStagiaires = await fetch("http://localhost:3000/stagiaires", {
                method: "GET"
            })
                .then(rep => { console.log(rep); return rep.json() })
                .then((rep) => { setStagiaires(rep) })
        }
        getStagiaires();
    }, [])
    return (<>
        {
            stagiaires.map((stgr) => {
                return <Stagiaire key={stgr.id} stg={stgr} />
            })
        }
    </>

    )

}
