import React, { useState } from 'react';

const CircularQueue = () => {
  const size = 5; // Fixed size for circular queue
  const [queue, setQueue] = useState(Array(size).fill(null));
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const isFull = () => (front === 0 && rear === size - 1) || (rear + 1 === front);
  const isEmpty = () => front === -1;

  const enqueue = () => {
    if (input === '') {
      setError('Enter a value');
      return;
    }
    if (isFull()) {
      setError('Queue is full');
      return;
    }

    let newQueue = [...queue];
    if (isEmpty()) {
      setFront(0);
      setRear(0);
      newQueue[0] = input;
    } else {
      const newRear = (rear + 1) % size;
      newQueue[newRear] = input;
      setRear(newRear);
    }

    setQueue(newQueue);
    setInput('');
    setError('');
  };

  const dequeue = () => {
    if (isEmpty()) {
      setError('Queue is empty');
      return;
    }

    let newQueue = [...queue];
    newQueue[front] = null;

    if (front === rear) {
      setFront(-1);
      setRear(-1);
    } else {
      setFront((front + 1) % size);
    }

    setQueue(newQueue);
    setError('');
  };

  return (
      <div className="bg-zinc-900 p-6 rounded-2xl text-white w-full max-w-xl mx-auto shadow-xl">
        <h2 className="text-2xl font-bold text-pink-400 text-center mb-4">Circular Queue</h2>
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
        <div className="grid grid-cols-5 gap-4 border border-pink-400 p-4 rounded-xl bg-zinc-800">
            {queue.map((item, index) => (
            <div
                key={index}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl font-bold
                ${item !== null ? 'bg-pink-400 text-black' : 'bg-zinc-700 text-zinc-400'}
                ${index === front && index === rear ? 'border-4 border-yellow-300' : ''}
                ${index === front && index !== rear ? 'border-4 border-green-400' : ''}
                ${index === rear && index !== front ? 'border-4 border-blue-400' : ''}
                `}
            >
                {item !== null ? item : 'null'}
                <small className="text-xs mt-1">
                {index === front && 'Front'}
                {index === rear && 'Rear'}
                </small>
            </div>
            ))}
        </div>
      </div>
  );
};

export default CircularQueue;
