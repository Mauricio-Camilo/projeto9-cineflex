import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

let posterURL = "";
let posterTitle = "";

function Movie() {

    const [options, setOptions] = useState([]);
    const { filmeId } = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmeId}/showtimes`);
        promise.then((response) => {
            const { data } = response;
            posterURL = data.posterURL;
            posterTitle = data.title;
            const { days } = data;
            setOptions(days);
        })
        promise.catch(() => console.log("Falha na aquisição dos dados"));
    }, [])

    return (
        <div className="movie">
            <div className="subheader">
                <p className="subtitle">Selecione o horário</p>
            </div>
            <div className="container">
                {options.map(option =>
                    <div className="container-section">
                        <p className="date"> {option.weekday} - {option.date}</p>
                        <div className="options">
                            <Link to={`/sessao/${option.showtimes[0].id}`} element={option.showtimes[0].id}>
                                <div className="time" key={option.showtimes[0].id}>
                                    <p className="time-text">{option.showtimes[0].name}</p>
                                </div>
                            </Link >
                            <Link to={`/sessao/${option.showtimes[1].id}`}>
                                <div className="time" key={option.showtimes[1].id}>
                                    <p className="time-text">{option.showtimes[1].name}</p>
                                </div>
                            </Link >
                        </div>
                    </div>
                )}
            </div>
            <footer className="footer">
                <div className="poster-container">
                    <img className="footer-poster" src={posterURL} />
                </div>
                <p className="footer-title">{posterTitle}</p>
            </footer>
        </div>
    )
}

export default Movie;