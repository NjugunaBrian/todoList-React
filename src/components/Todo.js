import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React } from "react";
 
function Todo({task, deleteTodo, editTodo, toggleComplete}) {
  return (
    <div className="Todo">
        <p className={`${task.completed ? 'completed' : 'incompleted'}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
        <div>
        <FontAwesomeIcon icon={faPenToSquare} className="icon-edit" onClick={() => editTodo(task.id)}/>
        <FontAwesomeIcon icon={faTrash} className="icon-delete" onClick={() => deleteTodo(task.id)}/>
        </div>
    </div>
    
  )
}

export default Todo