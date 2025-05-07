import React, { useState } from 'react';

const MAX_SIZE = 5;

const Deque = () => {
  const [deque, setDeque] = useState(Array(MAX_SIZE).fill(null));
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const isFull = () => (front === (rear + 1) % MAX_SIZE);
  const isEmpty = () => (front === -1);

  const insertFront = () => {
    if (input.trim() === '' || isNaN(input)) {
      setError('Enter a valid number');
      return;
    }
    if (isFull()) {
      setError('Deque is full');
      return;
    }
    const val = parseInt(input);
    const newDeque = [...deque];

    let newFront = front;
    let newRear = rear;

    if (isEmpty()) {
      newFront = newRear = 0;
    } else {
      newFront = (front - 1 + MAX_SIZE) % MAX_SIZE;
    }

    newDeque[newFront] = val;
    setDeque(newDeque);
    setFront(newFront);
    if (rear === -1) setRear(newRear);
    setInput('');
    setError('');
  };

  const insertRear = () => {
    if (input.trim() === '' || isNaN(input)) {
      setError('Enter a valid number');
      return;
    }
    if (isFull()) {
      setError('Deque is full');
      return;
    }
    const val = parseInt(input);
    const newDeque = [...deque];

    let newFront = front;
    let newRear = rear;

    if (isEmpty()) {
      newFront = newRear = 0;
    } else {
      newRear = (rear + 1) % MAX_SIZE;
    }

    newDeque[newRear] = val;
    setDeque(newDeque);
    setRear(newRear);
    if (front === -1) setFront(newFront);
    setInput('');
    setError('');
  };

  const deleteFront = () => {
    if (isEmpty()) {
      setError('Deque is empty');
      return;
    }
    const newDeque = [...deque];
    newDeque[front] = null;

    let newFront = (front + 1) % MAX_SIZE;
    if (front === rear) {
      newFront = -1;
      setRear(-1);
    }

    setDeque(newDeque);
    setFront(newFront);
    setError('');
  };

  const deleteRear = () => {
    if (isEmpty()) {
      setError('Deque is empty');
      return;
    }
    const newDeque = [...deque];
    newDeque[rear] = null;

    let newRear = (rear - 1 + MAX_SIZE) % MAX_SIZE;
    if (rear === front) {
      newRear = -1;
      setFront(-1);
    }

    setDeque(newDeque);
    setRear(newRear);
    setError('');
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Deque Visualizer</h1>

      <div className="flex justify-center items-center mb-4 space-x-4 w-full overflow-x-auto">
        {deque.map((val, idx) => (
          <div
            key={idx}
            className={`min-w-[80px] h-20 flex flex-col justify-center items-center rounded-lg shadow-md mx-1
              ${val !== null ? 'bg-blue-400 text-black' : 'bg-gray-700 text-white'}`}
          >
            <span>{val !== null ? val : 'Empty'}</span>
            <small>Index: {idx}</small>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 my-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter number"
          className="p-2 rounded-lg border border-blue-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button onClick={insertFront} className="bg-blue-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-transform hover:scale-105">
          Insert Front
        </button>
        <button onClick={insertRear} className="bg-green-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-transform hover:scale-105">
          Insert Rear
        </button>
        <button onClick={deleteFront} className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-black transition-transform hover:scale-105">
          Delete Front
        </button>
        <button onClick={deleteRear} className="bg-pink-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-black transition-transform hover:scale-105">
          Delete Rear
        </button>
      </div>

      {error && <div className="text-red-400 mt-2">{error}</div>}

      <div className="mt-4 text-sm">
        <p><strong>Front:</strong> {front}</p>
        <p><strong>Rear:</strong> {rear}</p>
      </div>
    </div>
  );
};

export default Deque;
