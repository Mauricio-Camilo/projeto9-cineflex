import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";

let posterURL = "";
let posterTitle = "";
let posterDay = "";
let posterTime = "";

function Section() {

    const PostApi = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";

    const [selected, setSelected] = useState(false);
    const css = `place ${!selected ? "avaiable" : "selected"}`;

    const [name, setName] = useState();
    const [cpf, setCpf] = useState();

    const [seatsId, Setseatsid] = useState(["01", "02", "03"]);

    const { sessaoId } = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessaoId}/seats`);
        promise.then((response) => {
            const { data } = response;
            console.log(data)
            posterURL = data.movie.posterURL;
            posterTitle = data.movie.title;
            posterDay = data.day.weekday;
            posterTime = data.name;
            const { seats } = data;
            console.log(seats);
            Setseatsid(seats);
        });
        promise.catch(() => console.log("deu ruim"));
    }, [])

    function enviarDados(event) {
        event.preventDefault(); // previne de recarregar a pagina
        const promise = axios.post(PostApi, {
            ids: [1,2,3],
            name: name,
            cpf: cpf
        })
        promise.then(response => console.log("Deu bom"))
        promise.catch(() => console.log("Deu ruim"))
    }


    return (
        <div className="section">
            <div className="top">
                <p className="subtitle">Selecione o(s) assento(s)</p>
            </div>
            <div className="container">
                <div className="container-section">
                    {seatsId.map(seatId =>


                        (seatId.isAvailable) ?


                            <div onClick={() => setSelected(!selected)} className={css}>
                                <p className="place-text">{seatId.name}</p>
                            </div>


                            :
                            <div onClick={() => alert("Esse assento não está disponível")} 
                            className="place unavaiable">
                                <p className="place-text">{seatId.name}</p>
                            </div>
                    )}
                </div>

                <SeatsOptions />

                <form onSubmit={enviarDados}>
                    <div className="user">
                        <p className="user-data">Nome do comprador:</p>
                        <input type="text" placeholder="Digite seu nome..."
                            onChange={(event) => setName(event.target.value)}
                            className="user-input" value={name} />
                    </div>
                    <div className="user">
                        <p className="user-data">CPF do comprador:</p>
                        <input type="text" placeholder="Digite seu CPF..."
                            onChange={(event) => setCpf(event.target.value)}
                            className="user-input" value={cpf} />
                    </div>
                    <Link to="/sucesso">
                    <button type="submit" className="button">
                        <span className="button-text"> Reservar assento(s)</span>
                    </button>

                    {/* LIMPAR O INPUT DEPOIS DE CLICAR NO BOTÃO ZERANDO O ESTADO */}

                    </Link>
                </form>
            </div>


            <footer className="footer">
                <div className="poster-container">
                    <img className="footer-poster" src={posterURL} />
                </div>
                <div className="title-container">
                    <p className="footer-title">{posterTitle}</p>
                    <p className="footer-title">{posterDay} - {posterTime}</p>
                </div>
            </footer>
        </div>
    )

    // function cleanData() {
    //     setDados = ([]);
    //     setCpf = ([]);
    // }
}


function SeatsOptions() {
    const options = [{ text: "Selecionado", class: "place selected" },
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

export default Section;
