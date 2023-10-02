import React from 'react'
import Navbar from './components/navbar'
import Todo from './components/Todo'
import AddTodo from './components/AddTodo'

const home = () => {
  return (
    <div>
      <Navbar/>
      <div className="container">
      <div className="row justify-content-md-center mt-4">
        <Todo/>
        <Todo/>
        <Todo/>
        <Todo/>
        <Todo/>
        <Todo/>
        <Todo/>
        <Todo/>
        <Todo/>
      </div>
      </div>
      <div className='' style={{position:'fixed',right:50,bottom:50,zIndex:1030}}>
        <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className='btn btn-online-light'
        >Add</button>
      </div>
      
        <AddTodo/>
    </div>
  )
}

export default home
