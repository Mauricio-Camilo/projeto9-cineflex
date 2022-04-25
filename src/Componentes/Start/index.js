import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./style.css"

function Start() {

    const [items, setItems] = useState([]); 

useEffect(() => {
    const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
    promise.then((response)=>{
    const {data} = response
    setItems(data);
    })
    promise.catch(()=>console.log("deu ruim"));
},[]);

    return (
        <div className="start">
            <div className="subheader">
                <p className="subtitle">Selecione o filme</p>
            </div>
            <div className="poster-container">
                {items.map(item => {
                    const {id,posterURL} = item; // Aplicação do destructuring feita, precisa colocas as chaves e o return com parenteses.
                    return (    // Passar o key dentro do link pra eliminar o erro do child.
                <Link key={id} to = {`/filme/${id}`}> 
                    <div className="image-border" >
                        <img className="image" src={posterURL}/>
                    </div> </Link>)
                    })}
            </div>
        </div>
    )
}

export default Start;