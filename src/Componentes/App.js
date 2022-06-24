import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Start from "./Start/";
import Header from "./Header";
import Movie from "./Movie";
import Section from "./Section"
import Success from "./Success";

function App() {

    const [reserva,setReserva] = useState(null);

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/filme/:filmeId" element={<Movie />} />
                    <Route path="/sessao/:sessaoId" element={<Section finalizar = {
                      (reserva) => setReserva(reserva)  
                    }/>} />
                    <Route path="/sucesso" element={<Success reserva={reserva}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;