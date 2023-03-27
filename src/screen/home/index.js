import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const TicTacToe = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [grid, setGrid] = useState(Array(boardSize * boardSize).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState("human");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setGrid(Array(boardSize * boardSize).fill(null));
  }, [boardSize]);

  useEffect(() => {
    if (gameMode === "computer" && !isXNext) {
      computerMove();
    }
  }, [isXNext]);

  useEffect(() => {
    checkWinner();
  }, [grid]);

  const handleClick = (index) => {
    if (grid[index] === null && winner === null) {
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[index] = isXNext ? "X" : "O";
        return newGrid;
      });
      setIsXNext((prev) => !prev);
    }
  };

  const computerMove = () => {
    const emptyCells = grid
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      handleClick(emptyCells[randomIndex]);
    }
  };

  const checkWinner = () => {
    const lines = [
      // Rows
      ...Array(boardSize)
        .fill(null)
        .map((_, rowIndex) => {
          return Array(boardSize)
            .fill(null)
            .map((_, colIndex) => rowIndex * boardSize + colIndex);
        }),
      // Columns
      ...Array(boardSize)
        .fill(null)
        .map((_, colIndex) => {
          return Array(boardSize)
            .fill(null)
            .map((_, rowIndex) => rowIndex * boardSize + colIndex);
        }),
      // Diagonal (top-left to bottom-right)
      [
        Array(boardSize)
          .fill(null)
          .map((_, index) => index * (boardSize + 1)),
      ],
      // Diagonal (top-right to bottom-left)
      [
        Array(boardSize)
          .fill(null)
          .map((_, index) => (index + 1) * (boardSize - 1)),
      ],
    ];
    for (const line of lines) {
      const [first, ...rest] = line;
      const firstCell = grid[first];
      if (firstCell && rest.every((index) => grid[index] === firstCell)) {
        setWinner(firstCell);
        return;
      }
    }

    if (grid.every((cell) => cell !== null)) {
      setWinner("Tie");
    }
  };
  const renderCell = (index) => {
    return (
      <div
        style={{
          border: "thick double #32a1ce",
        }}
      >
        <motion.svg
          key={index}
          width={100}
          height={100}
          viewBox="0 0 100 100"
          onClick={() => handleClick(index)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {grid[index] === "X" && (
            <motion.line
              x1="10"
              y1="10"
              x2="90"
              y2="90"
              stroke="#00cc88"
              animate={draw}
              custom={2}
              initial="hidden"
            />
          )}
          {grid[index] === "X" && (
            <motion.line
              x1="90"
              y1="10"
              x2="10"
              y2="90"
              stroke="#00cc88"
              animate={draw}
              custom={2}
              initial="hidden"
            />
          )}
          {grid[index] === "O" && (
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#ff0055"
              fill="#CDCDCD"
              animate={draw}
              custom={1}
              initial="hidden"
            />
          )}
        </motion.svg>
      </div>
    );
  };

  const handleBoardSizeChange = (event) => {
    setBoardSize(parseInt(event.target.value));
  };

  const handleGameModeChange = (event) => {
    setGameMode(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="boardSize">Board Size: </label>
        <select
          id="boardSize"
          value={boardSize}
          onChange={handleBoardSizeChange}
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>
      </div>
      <div>
        <label htmlFor="gameMode">Game Mode: </label>
        <select id="gameMode" value={gameMode} onChange={handleGameModeChange}>
          <option value="human">Vs Human</option>
          <option value="computer">Vs Computer</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: 110 * boardSize,
          height: 110 * boardSize,
          margin: "0 auto",
          backgroundColor: "#CDCDCD",
          boxShadow: "0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4)",
        }}
      >
        {grid.map((_, index) => renderCell(index))}
      </div>
      {winner && (
        <div>{winner === "Tie" ? "It's a Tie!" : `Player ${winner} wins!`}</div>
      )}
    </div>
  );
};
export default TicTacToe;
