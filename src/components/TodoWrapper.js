import React, { useState } from 'react'
import Todo from './Todo';
import { v4 as uuidv4 } from "uuid";
uuidv4();


function TodoWrapper() {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue(' ');
  }

  const addTodo = (todo) => {
    if (todo !== '') {
      setTodos([...todos, {id: uuidv4(), task: todo, completed: false }]);
    }
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) => t.id === editTodo.id ? t = { id: t.id, task: todo} : { id: t.id, task: t.task });
      setTodos(updatedTodos);
      setEditId(0);
      return;
    }
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter(task => task.id !== id);
    setTodos(newTodos);

  }

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));

  }

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setValue(editTodo.task);
    setEditId(id);
  }
  


  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className='todo-form'>
          <input className='todo-input' type='text' value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
    
        {todos.length === 1 ? (
          <h1>1 Todo</h1>
        ) :
          (<h1>{todos.length} Todos</h1>)}

        {todos.map((todo, id) => (
          <Todo key={id} task={todo} toggleComplete={toggleComplete} deleteTodo={handleDelete} editTodo={handleEdit} />
        ))}
      </div>
    </>
  )
}

export default TodoWrapper