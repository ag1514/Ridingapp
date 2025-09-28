import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [error, setError] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()


  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

      if (response.status === 200) {
        const data = response.data

        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        setError('')
        setEmail('')
        setPassword('')
        navigate('/captain-home')

      }
    }catch(err){
      setError(err.response?.data?.message || 'User not registered or invalid credentials')
      setEmail('')
      setPassword('')
    }
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        {/* <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" /> */}
        <div>
          <span className="text-red-600 font-semibold text-2xl">CAR</span>
          <span className='text-2xl font-semibold text-black'>ry</span>
        </div>
        <p className="text-gray-600 mb-6">Captain Portal 🚖</p>
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2 mt-8'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />
          {error && <p className='text-red-600 mb-3'>{error}</p>}

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-green-500 flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin