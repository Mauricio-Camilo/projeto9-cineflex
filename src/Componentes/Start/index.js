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
    // console.log(data);
    setItems(data);
    })
    promise.catch(()=>console.log("deu ruim"));
},[]);

console.log(items);


    return (
        <div className="start">
            <div className="container">
                <p className="subtitle">Selecione o filme</p>
                <Link to="/filme"> Ir para tela de filme </Link>
            </div>
            <div className="movies-container">
                {items.map(movie =>
                    <div className="image-border">
                        <img className="image" src={movie.posterURL} />
                    </div>
                )}
            </div>
        </div>
    
    )
}


export default Start;