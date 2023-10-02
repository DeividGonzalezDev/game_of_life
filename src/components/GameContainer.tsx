import { useEffect, useState } from "react";
import Field from "./Field";
import Counter from "./Counter";

const GameContainer = () => {
  const rows = window.innerWidth / 5 - 10;
  const columns = window.innerHeight / 5;
  const [stateOfGame, setStateOfGame] = useState<boolean[][]>(
    createStateOfGame(rows, columns)
  );
  const [stop, setStop] = useState(true);
  const [size, setSize] = useState(10);

  function createStateOfGame(rows: number, columns: number) {
    const state = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(false);
      }
      state.push(row);
    }
    return state;
  }
  function countNeighbors(position: { row: number; column: number }): number {
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let count = 0;
    for (const [i, j] of neighbors) {
      let x = i + position.row;
      let y = j + position.column;

      x = (x + stateOfGame.length) % stateOfGame.length;
      y = (y + stateOfGame[0].length) % stateOfGame[0].length;

      if (stateOfGame[x][y]) {
        count++;
      }
    }
    return count;
  }

  function updateCell(position: { row: number; column: number }) {
    const neighbors = countNeighbors(position);

    if (stateOfGame[position.row][position.column]) {
      if (
        stateOfGame[position.row][position.column] &&
        (neighbors < 2 || neighbors > 3)
      ) {
        return false;
      }
    } else if (!stateOfGame[position.row][position.column] && neighbors === 3) {
      return true;
    } else {
      return stateOfGame[position.row][position.column];
    }
  }

  function nextGeneration(stop: boolean = false) {
    const updatedState = JSON.parse(JSON.stringify(stateOfGame));
    for (let i = 0; i < stateOfGame.length; i++) {
      for (let j = 0; j < stateOfGame[0].length; j++) {
        updatedState[i][j] =
          updateCell({ row: i, column: j }) ?? updatedState[i][j];
      }
    }

    if (stop) return;
    setStateOfGame(updatedState);
  }

  useEffect(() => {
    const interval = setTimeout(() => {
      nextGeneration(stop);
    }, 100);

    return () => {
      clearTimeout(interval);
    };
  }, [stateOfGame, stop]);

  function handleStartOrStop() {
    setStop(false);
    
  }

  function handleStop() {
    setStop(true);
  }

  function setSizeOfField(size:number) {
    setSize(size);
  }
  return (
    <>
      <section id="game-container" className="relative overflow-scroll  w-[98vw] h-screen flex flex-col">
        <Counter setSize={setSizeOfField} />
        {stateOfGame.map((row, i) => (
          <div key={`row-${i}`}>
            {row.map((column, j) => (
              <Field
                key={`${i}-${j}`}
                alive={column}
                setState={setStateOfGame}
                positon={{ row: i, column: j }}
                size={size}
              />
            ))}
          </div>
        ))}
      </section>
      <section>
        <button
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleStartOrStop}
        >
          Start
        </button>
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={handleStop}
        >
          Stop
        </button>
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => setStateOfGame(createStateOfGame(rows, columns))}
        >
          Clear
        </button>
      </section>
    </>
  );
};

export default GameContainer;
