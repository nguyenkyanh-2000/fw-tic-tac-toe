import React from "react";

function History({ listOfSquares, goToStep }) {
  return (
    <div className="history">
      <h4>History</h4>
      <ul>
        {listOfSquares.map((square, step) => {
          return step === 0 ? (
            <li key={step}>
              <button onClick={() => goToStep(step)}>Go to game start</button>
            </li>
          ) : (
            <li key={step}>
              <button onClick={() => goToStep(step)}>Go to move #{step}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default History;
