import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Register = () => {

  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")

  const handleUsernameChange = (event)=>{
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event)=>{
    setPassword(event.target.value)
  }

  const register = () =>{

      if(password.length === 0 || username.length === 0) {
        alert("Password or Username is empty!")
      }
      else{
      Axios.post(process.env.REACT_APP_API_BASE_URL+"/auth/register", {
        username,
        password,
      }).then((response)=>{
        alert("User registered successfully")
        window.location.href = "/auth/login";
      }).catch((error)=>{
        alert("Username already exists")
      })
    }
  }

  return (
    <div className='register authlog'>
      <h3>Register</h3>
        <input 
        type='email' 
        placeholder='Enter your username' 
        id="username"
        onChange={handleUsernameChange}
        required
        />
        <input 
        type='password' 
        placeholder='Enter your password' 
        id="password"
        onChange={handlePasswordChange}
        required
        />
        <button onClick={register}>Register</button>
        <p className='quikAuth'>Already have an account? <a href='/auth/login'>Login here</a></p>
    </div>
  )
}

const Login = () => {
  let navigate = useNavigate()

  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")

  const handleUsernameChange = (event)=>{
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event)=>{
    setPassword(event.target.value)
  }

  const login = ()=>{
    Axios.post(process.env.REACT_APP_API_BASE_URL+"/auth/login",{
      username,
      password,
    }).then((response)=>{
      navigate('/todo')
      window.localStorage.setItem("token", response.data.token)
    }).catch((error)=>{
      alert("Wrong username/password")
    })
  }

  return (
    <div className='login authlog'>
      <h3>Login</h3>
        <input 
        type='text' 
        placeholder='Enter your username' 
        id="username"
        onChange={handleUsernameChange}
        />
        <input 
        type='password' 
        placeholder='Enter your password' 
        id="password"
        onChange={handlePasswordChange}
        />
        <button onClick={login}>Login</button>
        <p className='quikAuth'>Don't have an account? <a href="/auth/register">Register here</a></p>
    </div>
  )
}

export {Register , Login}