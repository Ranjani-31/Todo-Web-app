import {useState, } from 'react'
import {useNavigate, Link} from 'react-router-dom'

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import '../Login/index.css'
const url = import.meta.env.VITE_API_URL

function Signup() {
  const [userCredentials, setUserCredentials] = useState({password:'', email: '', name: ''})
  const [error, setError] =useState('')

  const navigate=useNavigate()

   const setName=(e)=>{
    setUserCredentials(c=>({...c, name: e.target.value}))
  } 
  const setEmail=(e)=>{
    setUserCredentials(c=>({...c, email: e.target.value}))
  } 
  const setPassword=(e)=>{
    setUserCredentials(c=>({...c, password: e.target.value}))
  }
  const onLogin=async (e)=>{
    e.preventDefault()
    console.log(url)
    const data = await fetch(`${url}/user/signup`,{
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
        credentials: "include",
      body: JSON.stringify({
      name:userCredentials.name,
        email: userCredentials.email,
        password: userCredentials.password
      })
    })

    const response = await data.json()
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
         <h1 className="h1 align-self-center ">Signup</h1>
        <TextField onChange={setName} value={userCredentials.name} className="mt-3 " id="standard-basic" label="Name" variant="standard" />
      
        <TextField onChange={setEmail} value={userCredentials.email} className="mt-3 " id="standard-basic" label="Email" variant="standard" />
        <TextField onChange={setPassword} value={userCredentials.password} className="mt-3 " id="standard-basic" label="Password" variant="standard" />
        <p className="fs-6 pt-4 mb-0 text-danger">{error}</p>
        <Button type='submit' className="mt-1 "  color="secondary" loadingPosition="start" variant="contained">
          Login
        </Button>
<p>Already have an account <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Signup;
