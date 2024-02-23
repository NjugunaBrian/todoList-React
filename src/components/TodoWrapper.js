import React, {  useState } from 'react'
import Todo from './Todo';
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useLocalStorage } from '../hooks/useLocalStorage';
uuidv4();


function TodoWrapper() {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useLocalStorage("todos", []);
 
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue(' ');
  }

  const addTodo = (todo) => {
    if (todo !== '') {
      setTodos([...todos, { id: uuidv4(), task: todo, completed: false }]);
    }
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) => t.id === editTodo.id ? t = { id: t.id, task: todo } : { id: t.id, task: t.task });
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
  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;
    if (source.droppableId === destination.droppableId &&
      source.index === destination.index)
      return;

    if (type === "group") {
      const reOrderedTodos = [...todos];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedTodo] = reOrderedTodos.splice(sourceIndex, 1);
      reOrderedTodos.splice(destinationIndex, 0, removedTodo);
      setTodos(reOrderedTodos);
    }
  }

  //save to local storage







  /*useEffect(() => {
      localStorage.setItem("Todos", JSON.stringify(todos)); 
  }, [todos]);

   useEffect(() => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : []
    
    }, [todos, value]);
  
  */


  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className='todo-form'>
          <input className='todo-input' type='text' id='createtodo' name='createtodo' value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
        <DragDropContext onDragEnd={handleDragDrop}>
          {todos.length === 1 ? (
            <h1>1 Todo</h1>
          ) :
            (<h1>{todos.length} Todos</h1>)}

          {todos.map((todo, id) => (
            <Droppable droppableId={todo.id} id={id} index={todo.id} type='group'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Draggable draggableId={todo.id} id={id} key={todo.id} index={id}>
                    {(provided) => (
                      <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                        <Todo key={todo.id} task={todo} toggleComplete={toggleComplete} deleteTodo={handleDelete} editTodo={handleEdit} />

                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  )
}

export default TodoWrapper