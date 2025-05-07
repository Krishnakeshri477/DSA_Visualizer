import React, { useState } from 'react';

const PriorityQueue = () => {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState('');
  const [message, setMessage] = useState('');

  const insert = () => {
    const numPriority = parseInt(priority);
    if (value.trim() === '' || isNaN(numPriority)) {
      setMessage('Please enter both value and valid priority');
      return;
    }

    const newNode = { value, priority: numPriority };
    const newQueue = [...queue, newNode].sort((a, b) => a.priority - b.priority);
    setQueue(newQueue);
    setValue('');
    setPriority('');
    setMessage(`Inserted "${newNode.value}" with priority ${newNode.priority}`);
  };

  const remove = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty');
      return;
    }
    const removed = queue[0];
    setQueue(queue.slice(1));
    setMessage(`Removed "${removed.value}" with priority ${removed.priority}`);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-lg w-full max-w-3xl mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Priority Queue Visualizer</h1>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          className="p-2 rounded-lg border border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          placeholder="Priority"
          className="p-2 rounded-lg border border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button
          onClick={insert}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-green-300 transition-transform hover:scale-105"
        >
          Enqueue
        </button>
        <button
          onClick={remove}
          className="bg-red-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-pink-300 transition-transform hover:scale-105"
        >
          Dequeue
        </button>
      </div>

      {message && <div className="text-green-300 mb-4 text-lg">{message}</div>}

      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {queue.map((item, index) => (
          <div key={index} className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg text-center">
            <div className="font-bold">{item.value}</div>
            <div className="text-sm">Priority: {item.priority}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityQueue;
