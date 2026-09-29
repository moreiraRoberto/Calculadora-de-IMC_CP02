import Button from "./Button";
import "./ImcTable.css";

const ImcTable = ({ data, imc, info, infoClass, idealWeight, resetCalc }) => {
  return (
    <div id="result-container">
      <p id="imc-number">
        Seu IMC: <span className={infoClass}>{imc.replace(".", ",")}</span>
      </p>
      <p id="imc-info">
        Situação atual: <span className={infoClass}>{info}</span>
      </p>

      {idealWeight && (
        <div className="ideal-weight-box">
          <h4>Análise de Peso Ideal</h4>
          <p>
            Faixa recomendada para a sua altura:{" "}
            <strong>
              {idealWeight.min} kg a {idealWeight.max} kg
            </strong>
          </p>
          {idealWeight.status === "ideal" && (
            <p className="goal-text good">
              Parabéns! Você está exatamente dentro da faixa de peso saudável.
            </p>
          )}
          {idealWeight.status === "lose" && (
            <p className="goal-text low">
              Meta sugerida: perder aproximadamente{" "}
              <strong>{idealWeight.diff} kg</strong> para atingir o limite saudável.
            </p>
          )}
          {idealWeight.status === "gain" && (
            <p className="goal-text medium">
              Meta sugerida: ganhar aproximadamente{" "}
              <strong>{idealWeight.diff} kg</strong> para atingir o mínimo saudável.
            </p>
          )}
        </div>
      )}

      <h3>Confira as classificações:</h3>
      <div id="imc-table">
        <div className="table-header">
          <h4>IMC</h4>
          <h4>Classificação</h4>
          <h4>Obesidade</h4>
        </div>
        {data.map((item) => (
          <div
            className={`table-data ${
              item.info === info ? "active-row" : ""
            }`}
            key={item.info}
          >
            <p>{item.classification}</p>
            <p>{item.info}</p>
            <p>{item.obesity}</p>
          </div>
        ))}
      </div>

      <Button id="back-btn" text="Voltar" action={resetCalc} />
    </div>
  );
};

export default ImcTable;