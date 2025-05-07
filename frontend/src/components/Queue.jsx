import React, { useState } from 'react';

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const enqueue = () => {
    if (input === '') {
      setError('Enter a value');
      return;
    }
    setQueue([...queue, input]);
    setInput('');
    setError('');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setError('Queue is empty');
      return;
    }
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    setError('');
  };

  return (
      <div className="bg-zinc-900 p-6 rounded-2xl text-white w-full max-w-xl mx-auto shadow-xl">
        <h2 className="text-2xl font-bold text-pink-400 text-center mb-4">Queue</h2>
        <div className="flex items-center gap-4 mb-4">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter value"
            className="px-4 py-2 bg-zinc-800 border border-pink-400 rounded-xl text-white"
            />
            <button onClick={enqueue} className="bg-pink-400 px-4 py-2 rounded-xl hover:bg-yellow-300 hover:text-black">Enqueue</button>
            <button onClick={dequeue} className="bg-pink-400 px-4 py-2 rounded-xl hover:bg-yellow-300 hover:text-black">Dequeue</button>
        </div>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <div className="flex items-center space-x-4 overflow-x-auto p-2 bg-zinc-800 rounded-xl border border-pink-400">
            {queue.map((item, idx) => (
            <div key={idx} className="px-6 py-2 bg-pink-400 rounded-lg text-black font-bold shadow">
                {item}
            </div>
            ))}
        </div>
      </div>
  );
};

export default Queue;
