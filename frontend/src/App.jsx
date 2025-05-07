import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Sorting from './components/Sorting';
import Stack from './components/Stack';
import Queue from './components/Queue';
import Deque from './components/Deque';
import CircularQueue from './components/CircularQueue';
import CircularLinkedList from './components/CircularLinkedList';
import DoublyLinkedList from './components/DoublyLinkedList';
import Graph from './components/Graph';
import Hashing from './components/Hashing';
import LinkedList from './components/LinkedList';
import Tree from './components/Tree';
import MaxHeap from './components/MaxHeap';
import MinHeap from './components/MinHeap';
import PriorityQueue from './components/PriorityQueue';

const HomeButtons = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-full mb-6">
      {[
        { to: '/stack', label: 'Stack' },
        { to: '/queue', label: 'Queue' },
        { to: '/deque', label: 'Deque' },
        { to: '/sorting', label: 'Sorting' },
        { to: '/circularQueue', label: 'Circular Queue' },
        { to: '/circularlinkedlist', label: 'Circular Linked List' },
        { to: '/doublylinkedlist', label: 'Doubly Linked List' },
        { to: '/graph', label: 'Graph' },
        { to: '/hashing', label: 'Hashing' },
        { to: '/linkedlist', label: 'Linked List' },
        { to: '/tree', label: 'Tree' },
        { to: '/maxheap', label: 'Max Heap' },
        { to: '/minheap', label: 'Min Heap' },
        { to: '/priorityqueue', label: 'Priority Queue' },
      ].map(({ to, label }) => (
        <Link key={to} to={to}>
          <button className="px-5 py-3 text-white font-bold text-base bg-[#ff416c] rounded-xl shadow-md max-w-[200px] w-full transition transform hover:scale-110 hover:bg-yellow-400 hover:text-black hover:shadow-xl">
            {label}
          </button>
        </Link>
      ))}
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="w-full h-screen bg-black text-white flex justify-center items-center font-sans">
      <div
        className="w-[90%] max-w-[1200px] min-h-[80vh] flex flex-col justify-between items-center 
        bg-gradient-to-br from-[#1e1e1e] to-[#333333] rounded-2xl p-5 shadow-[0px_10px_20px_rgba(0,0,0,0.5)]"
      >
        <h1 className="text-5xl sm:text-4xl text-center font-bold text-[#ff416c] mb-6 drop-shadow-[4px_4px_6px_rgba(0,0,0,0.6)]">
          DSA VISUALIZER
        </h1>

        {location.pathname === '/' && <HomeButtons />}

        <Routes>
          <Route path="/stack" element={<Stack />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/deque" element={<Deque />} />
          <Route path="/sorting" element={<Sorting />} />
          <Route path="/circularQueue" element={<CircularQueue />} />
          <Route path="/circularlinkedlist" element={<CircularLinkedList />} />
          <Route path="/doublylinkedlist" element={<DoublyLinkedList />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/hashing" element={<Hashing />} />
          <Route path="/linkedlist" element={<LinkedList />} />
          <Route path="/tree" element={<Tree />} />
          <Route path="/maxheap" element={<MaxHeap />} />
          <Route path="/minheap" element={<MinHeap />} />
          <Route path="/priorityqueue" element={<PriorityQueue />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
