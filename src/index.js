import ReactDom from "react-dom";

import App from "./Componentes/App";

import "./assets/css/reset.css";
import "./assets/css/style.css";


ReactDom.render(<App />, document.querySelector(".root"));

/* Criar subpastas dentro de componentes, cada uma delas com uma pagina
do projeto e seu próprio css.

Para chamar o css: import "./style.css";
Para montar o css: .Nomedapasta - (todas as classes vão começar assim);
*/