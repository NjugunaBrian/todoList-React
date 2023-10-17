import React, { useState } from 'react';


function TodoForm({addTodo}) {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(value);
        setValue('');
    }
    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            <input className='todo-input' type='text' value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
    )
}

export default TodoForm