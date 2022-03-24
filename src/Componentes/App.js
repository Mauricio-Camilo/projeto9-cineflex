import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from "./Start/";
import Header from "./Header";
import Movie from "./Movie";
import Section from "./Section"
import Success from "./Success";

function App() {
    return (
    <>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Start />}/>
                <Route path="/filme" element={<Movie />}/>
                <Route path="/sessao" element={<Section />}/>
                <Route path="/sucesso" element={<Success />}/>
            </Routes>
        </BrowserRouter>
    </>
    )
}

export default App;