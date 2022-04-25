import { useNavigate } from "react-router-dom";
import "./style.css"

function Success(props) {

    console.log(props);

    const {reserva} = props;
    const {filme, dia, horario, nome, cpf} = reserva;
 
    const navigate = useNavigate ();

    return (
        <>
            <div className="success">
                <div className="subheader">
                    <h2 className="subtitle">Pedido feito <br></br> com sucesso!</h2>
                </div>
                <div className="container">
                    <div className="subcontainer">
                        <p className="container-head">Filme e sessão</p>
                        <p className="container-text">{filme}</p>
                        <p className="container-text">{dia} - {horario}</p>

                    </div>
                    <div className="subcontainer">
                        <p className="container-head">Ingressos</p>
                        <p className="container-text">Assento</p>
                    </div>
                    <div className="subcontainer">
                        <p className="container-head">Comprador</p>
                        <p className="container-text">Nome: {nome}</p>
                        <p className="container-text">CPF: {cpf}</p>
                    </div>
                </div>
                <button onClick={() => navigate("/")} className="button">
                    <span className="button-text">Voltar pra Home</span>
                </button>
            </div>
        </>
    )
}

export default Success;
