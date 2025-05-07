import React, { useState } from 'react';

const Hashing = () => {
  const tableSize = 10;
  const [hashTable, setHashTable] = useState(Array(tableSize).fill(null));
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const hashFunction = (key) => {
    return key % tableSize;
  };

  const insert = (key) => {
    let index = hashFunction(key);
    let tries = 0;
    while (hashTable[index] !== null && tries < tableSize) {
      index = (index + 1) % tableSize;
      tries++;
    }
    if (tries < tableSize) {
      const newTable = [...hashTable];
      newTable[index] = key;
      setHashTable(newTable);
      setMessage(`Inserted ${key} at index ${index}`);
    } else {
      setMessage('Hash table is full');
    }
  };

  const search = (key) => {
    let index = hashFunction(key);
    let tries = 0;
    while (hashTable[index] !== null && tries < tableSize) {
      if (hashTable[index] === key) {
        setMessage(`Found ${key} at index ${index}`);
        return;
      }
      index = (index + 1) % tableSize;
      tries++;
    }
    setMessage(`${key} not found`);
  };

  const remove = (key) => {
    let index = hashFunction(key);
    let tries = 0;
    while (hashTable[index] !== null && tries < tableSize) {
      if (hashTable[index] === key) {
        const newTable = [...hashTable];
        newTable[index] = null;
        setHashTable(newTable);
        setMessage(`Deleted ${key} from index ${index}`);
        return;
      }
      index = (index + 1) % tableSize;
      tries++;
    }
    setMessage(`${key} not found`);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-lg w-full max-w-4xl mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Hashing Visualizer</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter key"
          className="p-2 rounded-lg border border-blue-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={() => insert(parseInt(input))}
          className="bg-blue-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-transform hover:scale-105"
        >
          Insert
        </button>
        <button
          onClick={() => search(parseInt(input))}
          className="bg-purple-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-transform hover:scale-105"
        >
          Search
        </button>
        <button
          onClick={() => remove(parseInt(input))}
          className="bg-red-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-transform hover:scale-105"
        >
          Delete
        </button>
      </div>

      {message && <div className="text-yellow-300 mb-4">{message}</div>}

      <div className="grid grid-cols-5 gap-4 mt-6">
        {hashTable.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="text-sm text-gray-300 mb-1">[{idx}]</div>
            <div className={`w-16 h-16 flex items-center justify-center rounded-lg ${item !== null ? 'bg-blue-500' : 'bg-gray-600'} text-white`}>
              {item !== null ? item : '---'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hashing;
