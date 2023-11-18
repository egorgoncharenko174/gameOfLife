import React, { useEffect, useState } from "react";
import "./App.css";

const numRows = 30;
const numCols = 30;
const neighborOffsets = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateRandomGrid = () => {
  const grid = [];
  for (let i = 0; i < numCols; i++) {
    const row = [];
    for (let j = 0; j < numRows; j++) {
      row.push(Math.floor(Math.random() * 2));
    }
    grid.push(row);
  }
  return grid;
};

function App() {
  const [grid, setGrid] = useState(generateRandomGrid);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        runSimulation();
      }, 500);
    }

    return () => clearInterval(intervalId);
  }, [grid, isRunning]);

  function runSimulation() {
    setGrid((prevGrid) => {
      return prevGrid.map((row, i) =>
        row.map((_, j) => {
          const liveNeighborCount = countLiveNeighbors(prevGrid, i, j);

          if (liveNeighborCount < 2 || liveNeighborCount > 3) {
            return 0;
          } else if (liveNeighborCount === 3) {
            return 1;
          } else {
            return prevGrid[i][j];
          }
        })
      );
    });
  }

  function countLiveNeighbors(grid, x, y) {
    let count = 0;
  
    for (const [dx, dy] of neighborOffsets) {
      const neighborX = x + dx;
      const neighborY = y + dy;
      if (
        neighborX >= 0 &&
        neighborX < numRows &&
        neighborY >= 0 &&
        neighborY < numCols
      ) {
        count += grid[neighborX][neighborY];
      }
    }
    return count;
  }

  return (
    <div className="app-container">
      <div className="button-container">
        <button
          onClick={() => {
            setIsRunning(!isRunning);
          }}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
      <div className="grid-container">
        {grid &&
          grid.map((rows, i) =>
            rows.map((_, j) => (
              <div
                key={`${i}-${j}`}
                className={`cell ${grid[i][j] ? "cell-alive" : ""}`}
              />
            ))
          )}
      </div>
    </div>
  );
}

export default App;

