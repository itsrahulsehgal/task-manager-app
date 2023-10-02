import React from 'react';
import './Todo.css'
const Todo = () => {
  return (
    <div className='todo-card'>
      <div className="todo-header">
        Task Header
      </div>
      <div className="todo-content">
        <h4 className='todo-title'>Task Title</h4>
        <p className='todo-description'>Task Description</p>
      </div>
    </div>
  );
};

export default Todo;
