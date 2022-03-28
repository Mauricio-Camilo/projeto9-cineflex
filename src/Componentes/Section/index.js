import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";

import SeatsOptions from "./SeatsOptions"

// CONSTANTES CRIADAS PARA SEREM RENDERIZADAS NO FOOTER

let posterURL = "";
let posterTitle = "";
let posterDay = "";
let posterTime = "";

function Section() {

    const PostApi = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";

    const navigate = useNavigate ();

    const [name, setName] = useState();
    const [cpf, setCpf] = useState();
    const [seats, Setseats] = useState([]);

    const { sessaoId } = useParams();

    // FUNÇÕES QUE MUDAM O ESTADO DOS ASSENTOS DE SELECIONADO PARA DISPONÍVEL 

    /* Se o assento não estiver selecionado, coloca uma nova key no objeto indicado
    que o assento pode ser selecionado */

    function selectSeat(id) {
        seats.forEach(seat => {
            if (seat.id == id) {
                seat.selected = true
            }
        })
        Setseats([...seats]);
    }

      /* Se o assento estiver selecionado, invalida a key inserida no objeto indicado
    que o assento não é mais selecionável*/

    function deselectSeat(id) {
        seats.forEach(seat => {
            if (seat.id == id) {
                seat.selected = false
            }
        })
        Setseats([...seats]);
    }

    // BUSCA DOS DADOS DA API E PREENCHIMENTO DAS VARIÁVEIS DO FOOTER

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessaoId}/seats`);
        promise.then((response) => {
            const { data } = response;
            posterURL = data.movie.posterURL;
            posterTitle = data.movie.title;
            posterDay = data.day.weekday;
            posterTime = data.name;
            const { seats } = data;
            Setseats(seats);
        });
        promise.catch(() => console.log("Falha na aquisição dos dados"));
    }, [])

    // FUNÇÃO CRIADA PARA NÃO RECARREGAR A PÁGINA E ENVIAR OS DADOS PARA O SERVIDOR 

    function sendData(event) {
        event.preventDefault(); // previne de recarregar a pagina
        const promise = axios.post(PostApi, {
            ids: [1, 2, 3],
            name: name,
            cpf: cpf
        })
        promise.then(response => navigate("/sucesso", {nome: name}));
        promise.catch(() => console.log("Falha no envio dos dados"));
    }

    return (
        <div className="section">
            <div className="top">
                <p className="subtitle">Selecione o(s) assento(s)</p>
            </div>
            <div className="container">
                <div className="container-section">
                    {seats.map(seat =>
                        (seat.isAvailable)? // Verifica se o assento pode ser clicado ou não
                            seat.selected? // Verifica se o assento pode ser selecionado
                                <div onClick={() => deselectSeat(seat.id)} className="place selected">
                                    <p className="place-text">{seat.name}</p>
                                </div>
                                :
                                <div onClick={() => selectSeat(seat.id)} className="place avaiable">
                                    <p className="place-text">{seat.name}</p>
                                </div>
                            :
                            <div onClick={() => alert("Esse assento não está disponível")}
                                className="place unavaiable">
                                <p className="place-text">{seat.name}</p>
                            </div>
                    )}
                </div>

                <SeatsOptions />

                <form onSubmit={sendData}>
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
                    <button type="submit" className="button">
                        <span className="button-text"> Reservar assento(s)</span>
                    </button>
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
}

export default Section;
