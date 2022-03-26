import "./style.css"

function Success() {
    return (
        <>
            <div className="success">
                <div className="subheader">
                    <h2 className="subtitle">Pedido feito <br></br> com sucesso!</h2>
                </div>
                <div className="container">
                    <div className="subcontainer">
                        <p className="container-head">Filme e sessão</p>
                        <p className="container-text">Enola Holmes</p>
                        <p className="container-text">Data e Horário</p>

                    </div>
                    <div className="subcontainer">
                        <p className="container-head">Ingressos</p>
                        <p className="container-text">Assento</p>
                    </div>
                    <div className="subcontainer">
                        <p className="container-head">Comprador</p>
                        <p className="container-text">Nome: Nome do usuário</p>
                        <p className="container-text">CPF: CPF do usuário</p>
                    </div>
                </div>
                <button type="submit" className="button">
                    <span className="button-text">Voltar pra Home</span>
                </button>
            </div>
        </>
    )
}

export default Success;
