import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function RegisterUser(ev) {
    ev.preventDefault();
    try {
        await axios.post('/register', {
            name, 
            email,
            password, 
        }) 
        setRedirect(true);
        alert ('Registration successful. Now you can log in');
    } catch (e) {
        alert ('Registration failed. Please try again later');
    }
  }

  if (redirect) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
    <div className="mb-64">
    <h1 className="text-4xl text-center mb-4">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={RegisterUser}>
        <input type="text" placeholder="John Doe" 
            value={name} 
            onChange={ev => setName(ev.target.value)}/>
        <input type="email" placeholder = "your@eamil.com" 
            value={email} 
            onChange={ev => setEmail(ev.target.value)}/>
        <input type="password" placeholder = "password" 
            value={password} 
            onChange={ev => setPassword(ev.target.value)}/>
        <button className="primary">Register</button>
        <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default RegisterPage