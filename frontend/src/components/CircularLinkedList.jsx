// src/components/CircularLinkedList.jsx
import React, { useState } from 'react';

function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.id = generateUniqueId(); // Simulated address
  }
}

const CircularLinkedList = () => {
  const [head, setHead] = useState(null);
  const [tail, setTail] = useState(null);
  const [size, setSize] = useState(0);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const updateError = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  const insertNode = () => {
    if (input.trim() === '' || isNaN(input)) {
      updateError('Please enter a valid number.');
      return;
    }

    const newNode = new Node(Number(input));

    if (!head) {
      newNode.next = newNode;
      setHead(newNode);
      setTail(newNode);
    } else {
      tail.next = newNode;
      newNode.next = head;
      setTail(newNode);
    }

    setSize(size + 1);
    setInput('');
  };

  const deleteNode = () => {
    if (!head) {
      updateError('List is empty, nothing to delete.');
      return;
    }

    if (head === tail) {
      setHead(null);
      setTail(null);
    } else {
      const newHead = head.next;
      tail.next = newHead;
      setHead(newHead);
    }

    setSize(size - 1);
  };

  const renderList = () => {
    const nodes = [];
    if (!head) return nodes;

    let currentNode = head;
    do {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    } while (currentNode !== head);

    return nodes;
  };

  return (
      <div className="w-full max-w-5xl mx-auto p-6 bg-zinc-900 rounded-2xl shadow-xl text-white">
        <h1 className="text-3xl font-bold text-center text-pink-400 mb-6">Circular Linked List Visualizer</h1>

        <div className="flex overflow-x-auto border border-white/30 rounded-full bg-white/10 p-4 mb-6 space-x-4">
          {renderList().map((node, index, arr) => (
            <React.Fragment key={node.id}>
              <div
                className={`flex flex-col items-center justify-center px-4 py-2 bg-pink-400 text-black rounded-xl shadow-md ${
                  node === head ? 'border-4 border-yellow-300' : ''
                } ${node === tail ? 'border-4 border-white' : ''}`}
              >
                <div>Value: {node.value}</div>
                <div>Address: {node.id}</div>
                <div>Next: {node.next?.id ?? 'null'}</div>
              </div>
              {index !== arr.length - 1 ? <div className="text-2xl">➡️</div> : <div className="text-2xl">🔁</div>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter value"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="px-4 py-2 rounded-xl bg-zinc-800 text-white border-2 border-pink-400 focus:outline-none focus:border-yellow-300"
          />
          <button
            onClick={insertNode}
            className="px-4 py-2 bg-pink-400 hover:bg-yellow-300 hover:text-black rounded-xl shadow-md transition"
          >
            Insert Node
          </button>
          <button
            onClick={deleteNode}
            className="px-4 py-2 bg-pink-400 hover:bg-yellow-300 hover:text-black rounded-xl shadow-md transition"
          >
            Delete Node
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-pink-400 font-bold text-lg">
          <span>Size: {size}</span>
          <span>Head: {head ? `Value: ${head.value}, Address: ${head.id}` : 'N/A'}</span>
          <span>Tail: {tail ? `Value: ${tail.value}, Address: ${tail.id}` : 'N/A'}</span>
        </div>

        {error && <div className="text-red-400 mt-4 text-center">{error}</div>}
      </div>
  );
};

export default CircularLinkedList;
