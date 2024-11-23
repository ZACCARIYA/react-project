import { getValue } from "@testing-library/user-event/dist/utils";
import React,{useState} from "react";

export default function PostTitre(){
 const [post ,setPost] = useState({
    idPost:1,
    titre:'',
    text:''
 })


const getValue = (event)=>{
    setPost((prevPost =>({
        ...prevPost,
    [event.target.name]:event.target.value
    })))
}

    return(
     <div>
        <center>
            <table>
                <tr>
                    <td> titre</td>
                    <td><input type="text" name="titre" onChange={getValue}/></td>
                </tr>
                <tr>
                    <td> text </td>
                    <td><textarea name="t" onChange={getValue}/></td>
                </tr>
            </table>
        </center>
     </div>
    );
}