//import React,{useState,useEffect} from "react";/*
//import PostList from "./useeffect";
//import Apiclass from "./useEffect1";
//import Exercice2Props_C1 from './Exercice2Props_C1';
//import Exercice1Props_C1 from "./Exercice1Props_C1";
//import Fetchapi from "./apiFetch";
// import AddStagiaire from "./src-json-server/addStagiaire";
//import './src-Formulaire/style.css';
//import Crudsf from "./Grud/GrudFunctions";
//import './App.css';

//import Client from "./ex2usestate";
//import GrudFacture from "./grudClass";
//import FootballGame from "./GrudFoot";
//import Addstg from "../src/src-json-server/addStagiaire";

/*
export default function App() {
return(
  <div>
  <Crudsf/>
  </div>
);
 }*/
 
 import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientList from "./componentGrus/ClientList";
import AddClient from "./componentGrus/AddClient";
import UpdateClient from "./componentGrus/UpdateClient";
import "bootstrap/dist/css/bootstrap.min.css";

 const App = () => {
     const [listClients, setListClients] = useState([]);
     const [client, setClient] = useState({
         id: 1,
         fname: '',
         lname: '',
         email: '',
         group: '',
         genre: ''
     });
 
     // Adding useEffect to mimic componentDidMount
     useEffect(() => {
         // Simulate fetching clients data from an API or storage
         const storedClients = JSON.parse(localStorage.getItem("clients")) || [];
         setListClients(storedClients);
     }, []);
 
     useEffect(() => {
         // Store clients data in localStorage when it updates
         localStorage.setItem("clients", JSON.stringify(listClients));
     }, [listClients]);
 
     const addClient = (newClient) => {
         setListClients([...listClients, newClient]);
     };
 
     const deleteClient = (id) => {
         const filteredClients = listClients.filter(c => c.id !== id);
         setListClients(filteredClients);
     };
 
     const updateClient = (updatedClient) => {
         const updatedClients = listClients.map(c => (c.id === updatedClient.id ? updatedClient : c));
         setListClients(updatedClients);
     };
 
     return (
         <Router>
             <div className="container mt-5">
                 <Routes>
                     <Route path="/" element={<ClientList clients={listClients} deleteClient={deleteClient} />} />
                     <Route path="/add" element={<AddClient addClient={addClient} />} />
                     <Route path="/update/:id" element={<UpdateClient clients={listClients} updateClient={updateClient} />} />
                 
                     <Route path="/update/:id" element={<UpdateClient clients={listClients} updateClient={updateClient} />} />
                 </Routes>
             </div>
         </Router>
     );
 };
 
 export default App;
 