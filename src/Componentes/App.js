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
                    <Route path="/" element={<Start />} />
                    <Route path="/filme/:filmeId" element={<Movie />} />
                    <Route path="/sessao/:sessaoId" element={<Section />} />
                    <Route path="/sucesso" element={<Success />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;