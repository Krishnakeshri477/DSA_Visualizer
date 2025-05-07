import React, { useState } from 'react';

const Tree = () => {
  const [tree, setTree] = useState({ value: null, left: null, right: null });
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const insert = (node, value) => {
    if (node.value === null) {
      return { value, left: null, right: null };
    }
    if (value < node.value) {
      return {
        ...node,
        left: insert(node.left || { value: null, left: null, right: null }, value),
      };
    } else {
      return {
        ...node,
        right: insert(node.right || { value: null, left: null, right: null }, value),
      };
    }
  };

  const handleInsert = () => {
    if (input.trim() === '' || isNaN(input)) {
      setMessage('Enter a valid number');
      return;
    }
    const val = parseInt(input);
    setTree(insert(tree, val));
    setInput('');
    setMessage('Node inserted');
  };

  const renderTree = (node, depth = 0) => {
    if (!node || node.value === null) return null;
    return (
      <div className="flex flex-col items-center">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md mb-2">
          {node.value}
        </div>
        <div className="flex space-x-4">
          {renderTree(node.left, depth + 1)}
          {renderTree(node.right, depth + 1)}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Binary Tree Visualizer</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter number"
          className="p-2 rounded-lg border border-green-400 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <button
          onClick={handleInsert}
          className="bg-green-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-transform hover:scale-105"
        >
          Insert Node
        </button>
      </div>

      {message && <div className="text-yellow-300 mb-4">{message}</div>}

      <div className="mt-6 w-full flex justify-center overflow-x-auto">
        {renderTree(tree)}
      </div>
    </div>
  );
};

export default Tree;
