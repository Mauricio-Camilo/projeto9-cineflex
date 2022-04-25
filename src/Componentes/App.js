import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Start from "./Start/";
import Header from "./Header";
import Movie from "./Movie";
import Section from "./Section"
import Success from "./Success";

function App() {

    // Esse estado serve para receber as informações da tela section e mandar para a tela success
    // A tela section deve receber apenas a função de atualização de estado
    // A tela success recebe o estado em si.
    // A função finalizar vai passar para o setReserva os parâmetros recebidos em reserva pelo filho.
    // A atualização de estado é feita nesse componente, o filho apenas passa os parâmetros que vão
    // ser recebidos pela função de atualização de estado.
    

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