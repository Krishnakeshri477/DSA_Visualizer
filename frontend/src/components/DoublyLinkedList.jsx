import React, { useState } from 'react';

const DoublyLinkedList = () => {
  class Node {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  }

  const [head, setHead] = useState(null);
  const [tail, setTail] = useState(null);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const insertAtEnd = (data) => {
    const newNode = new Node(data);
    if (!head) {
      setHead(newNode);
      setTail(newNode);
    } else {
      tail.next = newNode;
      newNode.prev = tail;
      setTail(newNode);
    }
  };

  const handleInsert = () => {
    if (input.trim() === '') {
      setMessage('Please enter a valid value');
      return;
    }
    insertAtEnd(input);
    setInput('');
    setMessage('Node inserted');
  };

  const renderList = () => {
    const nodes = [];
    let current = head;
    while (current) {
      nodes.push(
        <div key={current.data} className="flex items-center">
          <div className="bg-blue-500 text-white px-4 py-2 rounded shadow-md mx-1">
            {current.data}
          </div>
          {current.next && <span className="text-white">⇄</span>}
        </div>
      );
      current = current.next;
    }
    return nodes;
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Doubly Linked List Visualizer</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value"
          className="p-2 rounded-lg border border-green-400 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <button
          onClick={handleInsert}
          className="bg-green-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-transform hover:scale-105"
        >
          Insert at End
        </button>
      </div>

      {message && <div className="text-yellow-300 mb-4">{message}</div>}

      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {renderList()}
      </div>
    </div>
  );
};

export default DoublyLinkedList;