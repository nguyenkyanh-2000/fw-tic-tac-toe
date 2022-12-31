import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
  const [listOfSquares, setListOfSquares] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  //Declaring a Winner
  useEffect(() => {
    const currentSquare = listOfSquares[step];
    setWinner(calculateWinner(currentSquare));
  }, [step, listOfSquares]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i) => {
    const currentSquare = listOfSquares[step];
    const newListOfSquares = listOfSquares;
    const newSquares = currentSquare.slice();

    if (newSquares[i] || winner !== null) return;
    newSquares[i] = xIsNext ? "X" : "0";
    newListOfSquares.push(newSquares);

    setListOfSquares(newListOfSquares);
    setStep(newListOfSquares.length - 1);
    setXIsNext((xIsNext) => !xIsNext);
  };

  //Restart game
  const handleRestart = () => {
    setListOfSquares([Array(9).fill(null)]);
    setStep(0);
    setXIsNext(true);
  };

  const goToStep = (step) => {
    setStep(step);
    setXIsNext(step % 2 === 0);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={listOfSquares[step]} handleClick={handleClick} />
      </div>
      <History listOfSquares={listOfSquares} goToStep={goToStep}></History>
      <button onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
