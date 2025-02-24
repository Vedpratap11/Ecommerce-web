import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import instance from "../axiosConfig"

function Login() {
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
      // window.location.href("/")

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
