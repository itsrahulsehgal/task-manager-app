import React, { useState, useEffect } from 'react';
import axios from '../axios';
export default function Todo() {
    const [listOfTodos, setListOfTodos] = useState([])

    return (<>
        <InputArea listOfTodos={listOfTodos} setListOfTodos={setListOfTodos} />
        <TodoList listOfTodos={listOfTodos} setListOfTodos={setListOfTodos} />
    </>
    )
}

const InputArea = ({ listOfTodos, setListOfTodos }) => {
    const [todo, setTodo] = useState("")

    const changeInputTodo = (event) => {
        setTodo(event.target.value)
    }

    const addTodo = () => {
        axios.post("/todo/create", {
            todo,
        }, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then((response) => {
            document.querySelector(".inputText").value = ""
            setListOfTodos([
                ...listOfTodos, { todo }
            ])
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='inputArea'>
            <input className='inputText' id='textInput' type='text' placeholder='Enter the todo...' onChange={changeInputTodo}></input>
            <button className='addBtn' onClick={addTodo}>Add Todo</button>
        </div>
    )
}


const TodoList = ({ listOfTodos, setListOfTodos }) => {

    useEffect(() => {
        axios.get("/todo/read", {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then((response) => {
                setListOfTodos(response.data);
            });
    });


    const deleteTodo = (_id) => {
        axios.post("/todo/delete", {
            _id,
        }, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then((response) => {

            })
            .catch((error) => {
                console.log(error)
            })
    }


    const updateTodo = (_id, todo, mark) => {
        let val = prompt("Update the todo", todo)

        axios.post("/todo/update", {
            _id,
            todo: val,
            mark,
        }, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then((response) => {

            })
            .catch((error) => {
                console.log(error)
            })

    }

    const markTodo = (_id, todo, mark) => {
        axios.post("/todo/update", {
            _id,
            todo,
            mark: mark,
        },
            {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }).then((response) => {

            })
    }


    return (
        <div className='listOfTodos'>
            {listOfTodos.map(Atodo => {
                return (

                    <div className='todo'>
                        {Atodo.mark ?
                            <p style={{ textDecoration: 'line-through', textDecorationColor: 'bisque' }}>
                                {Atodo.todo}
                            </p>
                            :
                            <p>
                                {Atodo.todo}
                            </p>
                        }
                        <div className='btns'>
                            <button className='btn' onClick={() => deleteTodo(Atodo._id)}>Delete</button>
                            <button className='btn' onClick={() => updateTodo(Atodo._id, Atodo.todo, Atodo.mark)}>Update</button>
                            <button className='btn' onClick={
                                () => Atodo.mark ?
                                    markTodo(Atodo._id, Atodo.todo, false)
                                    :
                                    markTodo(Atodo._id, Atodo.todo, true)
                            }>
                                {
                                    Atodo.mark ?
                                        "Unmark" : "Mark"
                                }
                            </button>
                        </div>
                    </div>

                );
            })}
        </div>
    )
}