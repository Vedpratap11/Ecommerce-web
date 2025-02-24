import React, { useState } from 'react'
import instance from '../axiosConfig'
import { Link } from 'react-router-dom'

function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",

    })

    const [passwordMatch, setPasswordMatch] = useState(true)

    function handleChange(e) {
        const { name, value } = e.target
        setData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    
    function handleConfirmPassword(e){
     if (e.target.value !== data.password) setPasswordMatch(false)
        else setPasswordMatch(true)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        
        try{
            const response = await instance.post("/user/register", data)
            console.log(response)
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <input type="text"
                    placeholder='Enter Name'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                />


                <input type="email"
                    placeholder='Enter Email'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                />

                <input type="password"
                    placeholder='Choose a Strong Password'
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                />

                <input type="password"
                    placeholder='Confirm Password'
                    name='cpassword'
                    
                    onChange={handleConfirmPassword}
                />
                {!passwordMatch? <span>Password do not match</span> : ""}
                <button type='submit'>Register</button>
            </form>
            <p>
     Already registered? <Link to="/user/login" >Login</Link>
     </p>
        </>
    )
}


export default Register
