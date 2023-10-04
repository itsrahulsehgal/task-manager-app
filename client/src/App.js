import './App.css';
import {Routes , Route , useNavigate} from 'react-router-dom'
import Home from './pages/home';
import Todo from './pages/todo';
import {Register , Login} from './pages/auth';
import NavBar from './components/NavBar';
import axios from 'axios';
function App() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  return (
  <>
  <NavBar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/auth/register' element={<Register/>} />
    <Route path='/auth/login' element={<Login/>} />
    {localStorage.getItem('token')?<Route path='/todo' element={<Todo/>}/> : navigate('/auth')}
  </Routes>
  </>
  );
}

export default App;
