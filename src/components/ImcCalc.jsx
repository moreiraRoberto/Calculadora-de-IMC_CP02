import { useState } from "react";
import Button from "./Button";
import "./ImcCalc.css";

const ImcCalc = ({ calcImc, history, clearHistory }) => {
const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");
const [error, setError] = useState("");

const clearForm = (e) => {
    e.preventDefault();
    setWeight("");
    setHeight("");
    setError("");
};

  // Permite apenas números e uma única vírgula
const validDigits = (text) => {
    const cleaned = text.replace(/[^0-9,]/g, "");
    const parts = cleaned.split(",");
    if (parts.length > 2) {
    return parts[0] + "," + parts.slice(1).join("");
    }
    return cleaned;
};

const handleHeightChange = (e) => {
    setError("");
    const updatedValue = validDigits(e.target.value);
    setHeight(updatedValue);
};

const handleWeightChange = (e) => {
    setError("");
    const updatedValue = validDigits(e.target.value);
    setWeight(updatedValue);
};

const handleSubmit = (e) => {
    e.preventDefault();

    if (!height || !weight) {
setError("Preencha a altura e o peso para calcular.");
return;
    }

    const h = +height.replace(",", ".");
    const w = +weight.replace(",", ".");

    if (h < 0.5 || h > 2.5) {
    setError("Insira uma altura válida em metros (entre 0,50m e 2,50m).");
    return;
    }

    if (w < 10 || w > 400) {
    setError("Insira um peso válido em quilos (entre 10kg e 400kg).");
    return;
    }

    setError("");
    calcImc(e, height, weight);
};

return (
    <div id="calc-container">
    <h2>Calculadora de IMC</h2>
    <form id="imc-form">
        <div className="form-inputs">
        <div className="form-control">
            <label htmlFor="height">Altura (m)</label>
            <input
            type="text"
            name="height"
            id="height"
            placeholder="Exemplo: 1,75"
            onChange={handleHeightChange}
            value={height}
            maxLength={4}
            />
        </div>
        <div className="form-control">
            <label htmlFor="weight">Peso (kg)</label>
            <input
            type="text"
            name="weight"
            id="weight"
            placeholder="Exemplo: 70,5"
            onChange={handleWeightChange}
            value={weight}
            maxLength={6}
            />
        </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="action-control">
        <Button id="calc-btn" text="Calcular" action={handleSubmit} />
        <Button id="clear-btn" text="Limpar" action={clearForm} />
        </div>
    </form>

    {history && history.length > 0 && (
        <div className="history-container">
        <div className="history-header">
            <h3>Histórico Recente</h3>
            <button
            type="button"
            className="clear-history-btn"
            onClick={clearHistory}
            >
            Limpar histórico
            </button>
        </div>
        <ul className="history-list">
            {history.map((item) => (
            <li key={item.id} className="history-item">
                <div className="history-meta">
                <span className="history-date">{item.date}</span>
                <span className="history-measures">
                    {item.weight}kg • {item.height}m
                </span>
                </div>
                <div className="history-result">
                <span className="history-imc">IMC: {item.imc}</span>
                <span className={`history-badge ${item.infoClass}`}>
                    {item.info}
                </span>
                </div>
            </li>
            ))}
        </ul>
        </div>
    )}
    </div>
);
};

export default ImcCalc;