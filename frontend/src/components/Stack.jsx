import React, { useState } from 'react';

const Stack = () => {
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const push = () => {
    if (input === '') {
      setError('Enter a value');
      return;
    }
    setStack([input, ...stack]);
    setInput('');
    setError('');
  };

  const pop = () => {
    if (stack.length === 0) {
      setError('Stack is empty');
      return;
    }
    const newStack = [...stack];
    newStack.shift();
    setStack(newStack);
    setError('');
  };

  return (
      <div className="bg-zinc-900 p-6 rounded-2xl text-white w-full max-w-xl mx-auto shadow-xl">
        <h2 className="text-2xl font-bold text-pink-400 text-center mb-4">Stack</h2>
        <div className="flex items-center gap-4 mb-4">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter value"
            className="px-4 py-2 bg-zinc-800 border border-pink-400 rounded-xl text-white"
            />
            <button onClick={push} className="bg-pink-400 px-4 py-2 rounded-xl hover:bg-yellow-300 hover:text-black">Push</button>
            <button onClick={pop} className="bg-pink-400 px-4 py-2 rounded-xl hover:bg-yellow-300 hover:text-black">Pop</button>
        </div>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <div className="flex flex-col-reverse items-center border-l-4 border-pink-400 h-64 overflow-auto p-2 bg-zinc-800 rounded-xl">
            {stack.map((item, idx) => (
            <div key={idx} className="my-1 px-6 py-2 bg-pink-400 rounded-lg text-black font-bold shadow">
                {item}
            </div>
            ))}
        </div>
      </div>
  );
};

export default Stack;
