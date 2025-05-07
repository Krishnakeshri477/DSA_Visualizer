import React, { useState } from 'react';

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const LinkedList = () => {
  const [head, setHead] = useState(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const insert = () => {
    if (input === '') {
      setError('Enter a value');
      return;
    }
    const newNode = new Node(input);
    if (!head) {
      setHead(newNode);
    } else {
      let temp = head;
      while (temp.next) temp = temp.next;
      temp.next = newNode;
    }
    setInput('');
    setError('');
  };

  const deleteNode = () => {
    if (!head) {
      setError('List is empty');
      return;
    }
    setHead(head.next);
    setError('');
  };

  const renderNodes = () => {
    const nodes = [];
    let temp = head;
    while (temp) {
      nodes.push(temp.value);
      temp = temp.next;
    }
    return nodes;
  };

  return (
      <div className="bg-zinc-900 p-6 rounded-2xl text-white w-full max-w-xl mx-auto shadow-xl">
        <h2 className="text-2xl font-bold text-pink-400 text-center mb-4">Singly Linked List</h2>
        <div className="flex items-center gap-4 mb-4">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter value"
            className="px-4 py-2 bg-zinc-800 border border-pink-400 rounded-xl text-white"
            />
            <button onClick={insert} className="bg-pink-400 px-4 py-2 rounded-xl hover:bg-yellow-300 hover:text-black">Insert</button>
            <button onClick={deleteNode} className="bg-pink-400 px-4 py-2 rounded-xl hover:bg-yellow-300 hover:text-black">Delete</button>
        </div>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <div className="flex items-center space-x-4 overflow-x-auto p-2 bg-zinc-800 rounded-xl border border-pink-400">
            {renderNodes().map((val, i, arr) => (
            <React.Fragment key={i}>
                <div className="px-6 py-2 bg-pink-400 rounded-lg text-black font-bold shadow">
                {val}
                </div>
                {i !== arr.length - 1 && <div className="text-2xl">➡️</div>}
            </React.Fragment>
            ))}
        </div>
      </div>
  );
};

export default LinkedList;
