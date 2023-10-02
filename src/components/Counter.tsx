import React, { useState } from 'react';

const Counter = ({setSize}: {setSize: (size: number) => void}) => {
  const [size, setSizeState] = useState(10);


  function handleSize(type: string): void {
    if (type === 'increase' && size < 15) {
      setSizeState(size + 1);
      setSize(size + 1);
    } else if(type === 'decrease' && size >= 5 ) {
      setSizeState(size - 1);
      setSize(size - 1);
    }
  }

  return (
    <div className='absolute top-2 right-4 flex gap-5 bg-gray-800 rounded-md shadow-md px-2'>
      <button className={`text-gray-700 ${!(size >= 15) ? 'hover:text-white': ''}  transition-colors`} onClick={() => handleSize('increase')} disabled={size >= 15}>+</button>
      <button className={`text-gray-700 ${!(size <= 5) ? 'hover:text-white' : ''} transition-colors`} disabled={size <= 5} onClick={() => handleSize('decrease')}>-</button>  
    </div>
  );
};

export default Counter;