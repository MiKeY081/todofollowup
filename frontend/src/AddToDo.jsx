import React, { useState } from 'react';
import axios from 'axios';

const AddToDo = ({ setTodos }) => {
  const [task, setTask] = useState('');

  const handleToDo = async (e) => {
    try {
      if (!task.trim()) {
        // Don't submit if the task is empty or contains only whitespace
        return;
      }

      const res = await axios.post('http://localhost:5001/add', { task });
      setTodos((prev) => [...prev, res.data.todo]);
    } catch (error) {
      console.log(error);
    } finally {
      setTask('');
    }
  };

  return (
    <div className="my-4 w-[524px] flex gap-4">
      <input
        type="text"
        value={task}
        placeholder="Add your todos"
        onChange={(e) => setTask(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded outline-slate-500 text-black w-2/3"
      />
      <button
        onClick={handleToDo}
        className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 w-1/3"
      >
        Submit
      </button>
    </div>
  );
};

export default AddToDo;
