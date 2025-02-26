import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import instance from "../axiosConfig"
import { useAuth } from '../context/AuthProvider'

function Login() {
    // const navigate = useNavigate();
    const {checkAuth} = useAuth()
    const [data, setData] = useState({
        email:"",
        password:"",
    })

    function handleChange(e){
        const {name, value} = e.target
     setData((prev)=>{
        return({...prev, [name]:value})
     })
    }

    async function handleSubmit(e){
    e.preventDefault()
    try {
      const response = await instance.post("/user/login", data , {withCredentials: true,})
      console.log(response.data);
      checkAuth();
      if (
        response.status === 200 &&
        response.data.message === "Login Successful"
      )
        // navigate("/");
        window.location.href("/")
    } catch (error) {
      console.log(error);
    }}
  return (
    <>
     <form action="" onSubmit={handleSubmit}>
        <input type="email" placeholder='Enter Email' name='email' value={data.name} onChange={handleChange}/>
        <input type="password" placeholder='Enter Password' name="password" value={data.password} onChange={handleChange}/>
        <button type='submit'>Login</button>
        
     </form>
     <p>
     New user? <Link to="/user/register" >Register</Link>
     </p>
     

    </>
  )
}

export default Login
