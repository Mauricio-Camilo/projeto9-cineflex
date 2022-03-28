function SeatsOptions() {
    const options = [{ text: "Selecionado", class: "place selected" },
    { text: "Disponível", class: "place avaiable" },
    { text: "Indisponível", class: "place unavaiable" }];
    return (
        <div className="options">
            {options.map(option =>
                <div className="option">
                    <div className={option.class}>
                    </div>
                    <p className="option-text">{option.text}</p>
                </div>)}
        </div>
    )
}

export default SeatsOptions;
