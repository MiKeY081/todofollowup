import './App.css';
import AddToDo from './AddToDo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckSquare, FaSquare, FaTrash } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/get").then(res => setTodos(res.data.allTodo));
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/delete/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateCheckbox = async (id, checkbox) => {
    try {
      await axios.put(`/check/${id}`);
      location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='grid place-content-center h-screen w-screen bg-gray-100'>
      <AddToDo setTodos={setTodos} />
      {todos.length === 0 ? (
        <div className='text-gray-600 text-xl'>No records found</div>
      ) : (
        todos.map((todo, index) => (
          <div key={index} className='flex items-center gap-4 mt-4 p-3 bg-white rounded shadow justify-between'>
            <label htmlFor={`checkbox-${index}`} className='cursor-pointer'>
              {todo.checkbox ? (
                <FaCheckSquare className='text-green-500 h-6 w-6' />
              ) : (
                <FaSquare className='text-gray-500 h-6 w-6' />
              )}
              <input
                type="checkbox"
                name={index}
                id={`checkbox-${index}`}
                onChange={() => updateCheckbox(todo._id, todo.checkbox)}
                checked={todo.checkbox}
                className='hidden'
              />
            </label>
            {!todo.checkbox ? (
              <div className='text-black text-xl'>{todo.task}</div>
            ) : (
              <del className='text-gray-500'>{todo.task}</del>
            )}
            <button
              onClick={() => deleteProduct(todo._id)}
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800'
            >
              <FaTrash className='h-5 w-5' />
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
