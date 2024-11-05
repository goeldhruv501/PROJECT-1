import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LogIn() {

  const navigate = useNavigate()

  const [value, setValue] = useState()

  const ChangeValueInSignUp = (e) => {

    e.preventDefault()
    setValue({ ...value, [e.target.name]: e.target.value })

  }

  const logInDataBase = async (e) => {
    e.preventDefault()

    try {
      const url = 'http://localhost:5000/LoginApi'

      const User = await axios.post(url, value)


      const id = User.data.id
      const token = User.data.token

      if (User.status === false) window.alert('invalid data')

      else {
        sessionStorage.setItem('AccesToken', token)
        sessionStorage.setItem('UserId', id)
        navigate('/')
      }
    }
    catch (error) { window.alert(error.response.data.msg) }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form className='flex flex-col gap-5' action=''>

        <input onChange={ChangeValueInSignUp} type='text' name='email' placeholder='Enter Email' />
        <input onChange={ChangeValueInSignUp} type='text' name='password' placeholder='Enter Password' />

        <div>You have not User <span className='text bg-slate-900' ><Link to='SignIn' >SignUp</Link></span></div>
        <button onClick={logInDataBase} className='bg-slate-800 rounded-md py-1 text-white font-semibold' >LogIn</button>

      </form>
    </div>
  )
}
