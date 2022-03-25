import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";



function Movie() {

    const [options, setOptions] = useState({});

    const { filmeId } = useParams();

    useEffect (() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmeId}/showtimes`);
    promise.then((response) => {
        const { data } = response;
        const { days } = data;
        setOptions(days); 
        })
    promise.catch(() => console.log("deu ruim"));
    },[])

    console.log(options);

    // const {weekday, date, showtimes, id} = options;


    return (
        <>
            <div className="movie">
                <div className="top">
                    <p className="subtitle">Selecione o horário</p>
                </div>
                <div className="container">
                    {options.map(option => 
                     <section className="section">
                     <p className="date"> {option.weekday} - {option.date}</p>
                     <div className="options">
                         <div className="time">
                             <p className="time-text">{option.showtimes[0].name}</p>
                         </div>
                         <div className="time">
                             <p className="time-text">{option.showtimes[1].name}</p>
                         </div>
                     </div>
                 </section>
                    )}
                </div>
                <footer className="footer">
                    <p>Filme aqui</p>
                </footer>
            </div>
            {/* <Link to="/sessao"> Ir para sessão </Link> */}
        </>
    )
}

export default Movie;