import { useState, useEffect } from 'react';
import './App.css';
import ImcCalc from './components/ImcCalc';
import ImcTable from './components/ImcTable';
import { data } from './data/data';

function App() {
  const [imc, setImc] = useState("");
  const [info, setInfo] = useState("");
  const [infoClass, setInfoClass] = useState("");
  const [idealWeight, setIdealWeight] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("imc_history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("imc_history", JSON.stringify(history));
  }, [history]);

  const calcImc = (e, height, weight) => {
    e.preventDefault();

    if (!weight || !height) return;

    const weightFloat = +weight.replace(",", ".");
    const heightFloat = +height.replace(",", ".");

    // Validação contra divisão por zero ou valores inválidos
    if (
      isNaN(weightFloat) ||
      isNaN(heightFloat) ||
      heightFloat <= 0 ||
      weightFloat <= 0
    ) {
      return;
    }

    const imcValue = weightFloat / (heightFloat * heightFloat);
    const imcResult = imcValue.toFixed(1);

    let foundInfo = "";
    let foundClass = "";

    data.forEach((item) => {
      if (imcResult >= item.min && imcResult <= item.max) {
        foundInfo = item.info;
        foundClass = item.infoclass;
      }
    });

    // Se caso o IMC passar 99 
    if (!foundInfo && imcResult > 40) {
      const lastItem = data[data.length - 1];
      foundInfo = lastItem.info;
      foundClass = lastItem.infoclass;
    }

    if (!foundInfo) return;

    // Professor adicionei a primeira funcionalidade extra que é o Cálculo de Peso Ideal e Meta
    const minIdeal = +(18.5 * heightFloat * heightFloat).toFixed(1);
    const maxIdeal = +(24.9 * heightFloat * heightFloat).toFixed(1);
    let weightDiff = 0;

    if (weightFloat < minIdeal) {
      weightDiff = +(minIdeal - weightFloat).toFixed(1); // Precisa ganhar
    } else if (weightFloat > maxIdeal) {
      weightDiff = +(weightFloat - maxIdeal).toFixed(1); // Precisa perder
    }

    setIdealWeight({
      min: minIdeal.toFixed(1).replace(".", ","),
      max: maxIdeal.toFixed(1).replace(".", ","),
      diff: weightDiff.toFixed(1).replace(".", ","),
      status:
        weightFloat < minIdeal
          ? "gain"
          : weightFloat > maxIdeal
          ? "lose"
          : "ideal",
    });

    setImc(imcResult);
    setInfo(foundInfo);
    setInfoClass(foundClass);

    // Professor adicionei outra funcionalidade que é o Registro no Histórico, eu mantivei os últimos 10
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      height: heightFloat.toFixed(2).replace(".", ","),
      weight: weightFloat.toFixed(1).replace(".", ","),
      imc: imcResult.replace(".", ","),
      info: foundInfo,
      infoClass: foundClass,
    };

    setHistory((prev) => [newEntry, ...prev].slice(0, 10));
  };

  const resetCalc = (e) => {
    e.preventDefault();
    setImc("");
    setInfo("");
    setInfoClass("");
    setIdealWeight(null);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("imc_history");
  };

  return (
    <div className="container">
      {!imc ? (
        <ImcCalc
          calcImc={calcImc}
          history={history}
          clearHistory={clearHistory}
        />
      ) : (
        <ImcTable
          data={data}
          imc={imc}
          info={info}
          infoClass={infoClass}
          idealWeight={idealWeight}
          resetCalc={resetCalc}
        />
      )}
    </div>
  );
}

export default App;