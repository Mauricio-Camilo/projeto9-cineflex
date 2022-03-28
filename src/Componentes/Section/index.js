import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";

import SeatsOptions from "./SeatsOptions"

let posterURL = "";
let posterTitle = "";
let posterDay = "";
let posterTime = "";

function Section(props) {

    const PostApi = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";

    const [selected, setSelected] = useState(false);
    const css = `place ${!selected ? "avaiable" : "selected"}`;

    const [name, setName] = useState();
    const [cpf, setCpf] = useState();

    const [seats, Setseats] = useState(["01", "02", "03"]);

    console.log("teste", seats);

    const { sessaoId } = useParams();

    function selectSeat(id) {
        seats.forEach(seat => {
            if (seat.id == id) {
                seat.selected = true
            }
        })
        Setseats([...seats]);
    }

    function deselectSeat(id) {
        seats.forEach(seat => {
            if (seat.id == id) {
                seat.selected = false
            }
        })
        Setseats([...seats]);
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessaoId}/seats`);
        promise.then((response) => {
            const { data } = response;
            console.log("leitura",data)
            posterURL = data.movie.posterURL;
            posterTitle = data.movie.title;
            posterDay = data.day.weekday;
            posterTime = data.name;
            const { seats } = data;
            console.log(seats);
            Setseats(seats);
        });
        promise.catch(() => console.log("deu ruim"));
    }, [])

    function enviarDados(event) {
        event.preventDefault(); // previne de recarregar a pagina
        const promise = axios.post(PostApi, {
            ids: [1, 2, 3],
            name: name,
            cpf: cpf
        })
        promise.then(response => console.log("Deu bom"))
        promise.catch(() => console.log("Deu ruim"))
        console.log(name)
        console.log(cpf)
    }


    return (
        <div className="section">
            <div className="top">
                <p className="subtitle">Selecione o(s) assento(s)</p>
            </div>
            <div className="container">
                <div className="container-section">
                    {seats.map(seat =>


                        (seat.isAvailable) ?

                            seat.selected ?

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
                    {/* <Link to="/sucesso"> */}
                    <button type="submit" className="button">
                        <span className="button-text"> Reservar assento(s)</span>
                    </button>
                    {/* </Link> */}
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
