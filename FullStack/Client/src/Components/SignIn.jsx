import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signin() {

  const navigate = useNavigate()

  const [value, setValue] = useState()

  const ChangeValueInSignUp = (e) => {

    e.preventDefault()
    setValue({ ...value, [e.target.name]: e.target.value })

  }

  const SignUpDataBase = async (e) => {
    e.preventDefault()

    try {
      const url = 'http://localhost:5000/createUser'

      const User = await axios.post(url, value)
      
      if (User.status === false) window.alert('invalid data')

      else {
        navigate(`/OTP/${User.data.id}`)
      }
    }
    catch (error) { window.alert(error.response.data.message) }
  }

  return (
    <div className='flex justify-center items-center h-screen'>

      <form className='flex flex-col gap-5 bg-gray-400 p-5 rounded-lg' action="">

        <input onChange={ChangeValueInSignUp} className='rounded-md px-5' type="text" name='name' placeholder='Enter name' />
        <input onChange={ChangeValueInSignUp} className='rounded-md px-5' type="text" name='email' placeholder='Enter email' />
        <input onChange={ChangeValueInSignUp} className='rounded-md px-5' type="password" name='password' placeholder='password' />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image"> Upload Image</label>
          <input name="image" type="file" id="image" required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" />
        </div>
        <div>You have Already User <span className='text-blue-900'><Link to='/Login'>Log-In</Link></span></div>
        <button onClick={SignUpDataBase} className='bg-blue-700 rounded-md py-1 text-white font-semibold'>SignUp</button>
      </form>
    </div>
  )
}