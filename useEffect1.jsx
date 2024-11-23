import React,{useState, useEffect} from "react";

import axios from 'axios';

export default function Apiclass() {
    const [list,setlist] = useState([])
    //  useEffect(()=>{
    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    //     .then((res)=>setlist(res.data))
    //  },[])
     useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>res.json())
        .then((res)=>setlist(res))
     },[])
  return (
    <div>
       
       <table>
        <thead>
            <th>id</th>
            <th>name</th>
            <th>title</th>
        </thead>
        <tbody>
            {list.map((item)=>{
                return <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.body.slice(0,50)}</td>
                    <td>{item.title.slice(0,20)}</td>
                </tr>
            })}
        </tbody>
       </table>

    </div>
  )
}