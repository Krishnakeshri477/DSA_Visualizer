import React, { useEffect, useState } from 'react';

const Sorting = () => {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [activeIndices, setActiveIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = () => {
    if (isSorting) return;
    const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  };

  const visualizeSwap = async (arr, i, j) => {
    setActiveIndices([i, j]);
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setArray([...arr]);
    await sleep(speed);
    setActiveIndices([]);
  };

  const displayArray = () =>
    array.map((value, idx) => (
      <div
        key={idx}
        className={`bar flex items-end justify-center mx-0.5 text-white text-xs transition-all duration-75 ${
          activeIndices.includes(idx) ? 'bg-yellow-300 text-black' : ''
        }`}
        style={{
          height: `${value * 4}px`,
          width: '20px',
          backgroundColor: activeIndices.includes(idx)
            ? ''
            : `rgb(${value * 2.5}, 100, 200)`,
        }}
      >
        <span className="mb-1">{value}</span>
      </div>
    ));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          await visualizeSwap(arr, j, j + 1);
        }
      }
    }
    setIsSorting(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await sleep(speed);
    }
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j;
        }
      }
      if (min !== i) await visualizeSwap(arr, i, min);
    }
    setIsSorting(false);
  };

  const quickSort = async (start = 0, end = array.length - 1, arr = [...array]) => {
    if (start >= end) return;
    const index = await partition(arr, start, end);
    await Promise.all([
      quickSort(start, index - 1, arr),
      quickSort(index + 1, end, arr),
    ]);
    if (start === 0 && end === array.length - 1) {
      setArray([...arr]);
      setIsSorting(false);
    }
  };

  const partition = async (arr, start, end) => {
    const pivot = arr[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
      if (arr[j] < pivot) {
        i++;
        await visualizeSwap(arr, i, j);
      }
    }
    await visualizeSwap(arr, i + 1, end);
    return i + 1;
  };

  const mergeSort = async (start = 0, end = array.length - 1, arr = [...array]) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid, arr);
    await mergeSort(mid + 1, end, arr);
    await merge(arr, start, mid, end);
    if (start === 0 && end === array.length - 1) {
      setArray([...arr]);
      setIsSorting(false);
    }
  };

  const merge = async (arr, start, mid, end) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
      setArray([...arr]);
      await sleep(speed);
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
    setArray([...arr]);
  };

  return (
    <div >
      <h1 className="flex items-end justify-center text-3xl font-bold text-yellow-400 mb-6">SORTING VISUALIZER</h1>
      <div className="flex items-end justify-center h-120 w-full max-w-5xl overflow-x-auto bg-gray-800 p-4 rounded-lg">
        {displayArray()}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button disabled={isSorting} onClick={bubbleSort} className="px-4 py-2 bg-red-500 rounded hover:bg-yellow-400 hover:text-black disabled:opacity-50">
          Bubble Sort
        </button>
        <button disabled={isSorting} onClick={insertionSort} className="px-4 py-2 bg-red-500 rounded hover:bg-yellow-400 hover:text-black disabled:opacity-50">
          Insertion Sort
        </button>
        <button disabled={isSorting} onClick={selectionSort} className="px-4 py-2 bg-red-500 rounded hover:bg-yellow-400 hover:text-black disabled:opacity-50">
          Selection Sort
        </button>
        <button disabled={isSorting} onClick={() => { setIsSorting(true); mergeSort(); }} className="px-4 py-2 bg-red-500 rounded hover:bg-yellow-400 hover:text-black disabled:opacity-50">
          Merge Sort
        </button>
        <button disabled={isSorting} onClick={() => { setIsSorting(true); quickSort(); }} className="px-4 py-2 bg-red-500 rounded hover:bg-yellow-400 hover:text-black disabled:opacity-50">
          Quick Sort
        </button>
        <button disabled={isSorting} onClick={generateArray} className="px-4 py-2 bg-green-600 rounded hover:bg-green-400 hover:text-black disabled:opacity-50">
          Refresh
        </button>
      </div>

      <div className="mt-6 flex items-end justify-center">
        <label htmlFor="speed" className="mr-2">Speed:</label>
        <input
          type="range"
          id="speed"
          min="10"
          max="500"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-48 accent-yellow-400 "
        />
      </div>
    </div>
  );
};

export default Sorting;
