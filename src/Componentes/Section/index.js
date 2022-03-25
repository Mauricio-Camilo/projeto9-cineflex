import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";

const objetcs = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];


function Section() {

    const [seatsId, Setseatsid] = useState(["01", "02", "03"]);

    const { sessaoId } = useParams();

    useEffect(()=> {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessaoId}/seats`);
        promise.then((response)=>{
            const {data} = response;
            const {seats} = data;
            Setseatsid(seats);
        });
        promise.catch(() => console.log("deu ruim"));    
    },[])

    console.log(seatsId);

    const aux = seatsId[0].isAvailable;
    console.log(aux);

    return (
        <div className="section">
            <div className="top">
                <p className="subtitle">Selecione o(s) assento(s)</p>
            </div>
            <div className="container">
                {seatsId.map(seatId =>
                    (seatId.isAvailable)?
                        <div className="place avaiable">
                            <p className="place-text">{seatId.name}</p>
                        </div>
                        :
                        <div className="place unavaiable">
                            <p className="place-text">{seatId.name}</p>
                        </div>
                    )}
            </div>
            <SeatsOptions />
            <footer className="footer">
                <p>Filme aqui</p>
            </footer>
        </div>
    )
}

function SeatsOptions () {
    const options = [{ text: "Selecionado", class: "place selected"},
    { text: "Disponível", class: "place avaiable" },
    { text: "Indisponível", class: "place unavaiable" }];
    return (
        <div className="options">
        {options.map(option =>
            <div className="option">
                <div className={option.class}>
                </div>
                <p className="option-text">{option.text}</p>
            </div>)}
    </div>
    )
}

{/* <Link to="/sucesso"> Ir para sucesso </Link> */ }

export default Section;
