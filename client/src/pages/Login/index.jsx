import {useState, } from 'react'
import {useNavigate, Link} from 'react-router-dom'

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import './index.css'
const url = import.meta.env.VITE_API_URL

function Login() {
  const [userCredentials, setUserCredentials] = useState({password:'', email: ''})
  const [error, setError] =useState('')

  const navigate=useNavigate()

  const setEmail=(e)=>{
    setUserCredentials(c=>({...c, email: e.target.value}))
  } 
  const setPassword=(e)=>{
    setUserCredentials(c=>({...c, password: e.target.value}))
  }
  const onLogin=async (e)=>{
    e.preventDefault()
    const data = await fetch(`${url}/user/login`,{
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
       credentials: "include", 
      body: JSON.stringify({
        email: userCredentials.email,
        password: userCredentials.password
      })
    })

    const response =await (data).json()
    
    console.log(data)
    
    console.log("email", response.user.email)
    if (!data.ok){
      setError(response.message)
    }else{
      setError('')
      navigate('/')
    }

  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 container">
     
      <form onSubmit={onLogin} className="d-flex flex-column justify-content-between  form-container px-3 py-5">
         <h1 className="h1 align-self-center ">Login</h1>
        <TextField onChange={setEmail} value={userCredentials.email} className="mt-3 " id="standard-basic" label="Email" variant="standard" />
        <TextField onChange={setPassword} value={userCredentials.password} className="mt-3 " id="standard-basic" label="Password" variant="standard" />
        <p className="fs-6 pt-4 mb-0 text-danger">{error}</p>
        <Button type='submit' className="mt-1 "  color="secondary" loadingPosition="start" variant="contained">
          Login
        </Button>

<p>Don't have an account <Link to='/signup'>Signup</Link></p>
      </form>
    </div>
  );
}

export default Login;
