import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";

import SeatsOptions from "./SeatsOptions"

let posterURL = "";
let posterTitle = "";
let posterDay = "";
let posterTime = "";

function Section(props) {

    const {finalizar} = props; // finalizar é o nome da propriedade que contém uma função dentro dela.

    const PostApi = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";

    const navigate = useNavigate ();

    const [name, setName] = useState();
    const [cpf, setCpf] = useState();
    const [seats, Setseats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState(new Map());

    const { sessaoId } = useParams();

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
            console.log(seats);
        });
        promise.catch(() => console.log("Falha na aquisição dos dados"));
    }, []);

    function selectSeat (id, number) {
        const checkSeat = selectedSeats.has(id);
        if (checkSeat) {
            selectedSeats.delete(id);
            setSelectedSeats(new Map(selectedSeats))
        }
        else {
            setSelectedSeats(new Map(selectedSeats.set(id,number)))
        }
        console.log(selectedSeats);
        console.log([...selectedSeats.values()]);
    }

    function sendData(event) {
        event.preventDefault();
        const promise = axios.post(PostApi, {
            ids: [...selectedSeats.keys()],
            name: name,
            cpf: cpf
        })
        promise.then(response => {
            // No componente pai, ele vai passar parâmetros para a função de atualização de estado.
            // Essa função executa apenas isso, passar parâmetros para atualizar o estado no pai.
            finalizar({
                filme: posterTitle,
                dia: posterDay,
                horario: posterTime,
                nome: name,
                cpf: cpf,
                assentos: selectedSeats
            });
            navigate("/sucesso");
        });
        promise.catch(() => console.log("Falha no envio dos dados"));
    }

    return (
        <div className="section">
            <div className="top">
                <p className="subtitle">Selecione o(s) assento(s)</p>
            </div>
            <div className="container">
                <div className="container-section">
                    {seats.map(seat => {
                            const {id, name} = seat
                            let newClass = "";
                            const checkSelecionado = selectedSeats.has(id);
                            checkSelecionado? newClass = "place selected":  newClass ="place avaiable";
                            return (
                                (seat.isAvailable)? 
                                <div onClick={() => selectSeat(id,name)} className={newClass}>
                                    <p className="place-text">{name}</p>
                                </div>
                                :
                                <div onClick={() => alert("Esse assento não está disponível")}
                                    className="place unavaiable">
                                    <p className="place-text">{name}</p>
                                </div>
                            )
                        })}
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
