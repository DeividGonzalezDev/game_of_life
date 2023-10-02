import { useState } from "react";

const Field = ({alive, setState, positon, size}: {alive: boolean, setState: React.Dispatch<React.SetStateAction<boolean[][]>>, positon: {row: number, column: number}, size: number}) => {
  const [isAlive, setIsAlive] = useState(alive);
  function handleClick(): void {
    setIsAlive(!isAlive);
    setState(state => {
      const updatedState = JSON.parse(JSON.stringify(state));
      updatedState[positon.row][positon.column] = !isAlive;
      return updatedState;
    });
  }

  return (
    <div className={`${alive ? 'bg-white' : ''} field bg-black border-solid border-[.5px] border-gray-950 transition-colors`}
    style={{width: size, height: size}} onClick={handleClick}></div>
  );
};

export default Field;