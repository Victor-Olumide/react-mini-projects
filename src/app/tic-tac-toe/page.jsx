"use client";

import { useState, useEffect } from "react";
import { GiTicTacToe } from "react-icons/gi";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [mode, setMode] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState(null);

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (board[index] || winner) return;
    if (
      mode === "single" &&
      ((isXNext && playerSymbol === "O") || (!isXNext && playerSymbol === "X"))
    ) {
      return
    }

    const newBoard = [...board]
    newBoard[index] = isXNext ? "X" : "O"
    setBoard(newBoard)
    setIsXNext(!isXNext)
    checkWinner(newBoard)
  }

  const checkWinner = (newBoard) => {
    for (let [a, b, c] of winningCombos) {
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        return;
      }
    }
    if (!newBoard.includes(null)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const makeComputerMove = () => {
    let newBoard = [...board];

    for (let [a, b, c] of winningCombos) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && !newBoard[c]) {
        newBoard[c] = isXNext ? "X" : "O";
        finishComputerMove(newBoard);
        return;
      }
      if (newBoard[a] && newBoard[a] === newBoard[c] && !newBoard[b]) {
        newBoard[b] = isXNext ? "X" : "O";
        finishComputerMove(newBoard);
        return;
      }
      if (newBoard[b] && newBoard[b] === newBoard[c] && !newBoard[a]) {
        newBoard[a] = isXNext ? "X" : "O";
        finishComputerMove(newBoard);
        return;
      }
    }

    for (let [a, b, c] of winningCombos) {
      if (
        newBoard[a] === playerSymbol &&
        newBoard[a] === newBoard[b] &&
        !newBoard[c]
      ) {
        newBoard[c] = isXNext ? "X" : "O";
        finishComputerMove(newBoard);
        return;
      }
      if (
        newBoard[a] === playerSymbol &&
        newBoard[a] === newBoard[c] &&
        !newBoard[b]
      ) {
        newBoard[b] = isXNext ? "X" : "O";
        finishComputerMove(newBoard);
        return;
      }
      if (
        newBoard[b] === playerSymbol &&
        newBoard[b] === newBoard[c] &&
        !newBoard[a]
      ) {
        newBoard[a] = isXNext ? "X" : "O";
        finishComputerMove(newBoard);
        return;
      }
    }

    if (!newBoard[4]) {
      newBoard[4] = isXNext ? "X" : "O";
      finishComputerMove(newBoard);
      return;
    }

    const emptyIndices = newBoard
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null);
    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    newBoard[randomIndex] = isXNext ? "X" : "O";
    finishComputerMove(newBoard);
  };

  const finishComputerMove = (newBoard) => {
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  useEffect(() => {
    if (
      mode === "single" &&
      !winner &&
      ((isXNext && playerSymbol === "O") || (!isXNext && playerSymbol === "X"))
    ) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [board, isXNext, winner, mode, playerSymbol]);

  const chooseMode = (chosenMode) => {
    setMode(chosenMode);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setPlayerSymbol(null);
    setIsXNext(true);
  };

  const chooseSymbol = (symbol) => {
    setPlayerSymbol(symbol);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);

    if (symbol === "O" && mode === "single") {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 px-4">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-700">
        <h1 className="flex justify-center gap-x-2 text-2xl font-bold text-white mb-6">
          Tic Tac Toe <GiTicTacToe />
        </h1>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => chooseMode("single")}
            className={`px-4 py-2 rounded-lg ${
              mode === "single"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Single Player
          </button>

          <button
            onClick={() => chooseMode("two")}
            className={`px-4 py-2 rounded-lg ${
              mode === "two"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Two Player
          </button>
        </div>

        {mode === "single" && (
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => chooseSymbol("X")}
              disabled={playerSymbol === "X"}
              className={`px-4 py-2 rounded-lg ${
                playerSymbol === "X"
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Play as X
            </button>
            <button
              onClick={() => chooseSymbol("O")}
              disabled={playerSymbol === "O"}
              className={`px-4 py-2 rounded-lg ${
                playerSymbol === "O"
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Play as O
            </button>
          </div>
        )}

        <div className={`flex justify-center opacity-70 pointer-events-none}`}>
          <div className="grid grid-cols-3 w-60 h-60 mb-6">
            {board.map((cell, index) => {
              const borderClasses = `
              ${index < 6 ? "border-b-4" : ""} 
              ${index % 3 !== 2 ? "border-r-4" : ""}
              border-gray-600
            `;
              return (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`flex items-center justify-center w-20 h-20 text-3xl font-bold text-white ${borderClasses}`}
                >
                  {cell || ""}
                </button>
              );
            })}
          </div>
        </div>

        {winner ? (
          <p className="text-lg font-semibold mb-4 text-yellow-400">
            {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
          </p>
        ) : (
          <p className="text-lg font-semibold mb-4 text-gray-300">
            Next Player: {isXNext ? "X" : "O"}
          </p>
        )}

        <button
          onClick={resetGame}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
        >
          Restart Game
        </button>
      </div>
    </main>
  );
}
