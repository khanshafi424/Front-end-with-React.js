import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if(auth) {
      navigate('/');
    }
  })


    const submit = async () => {
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        result = await result.json();
        localStorage.setItem('user', JSON.stringify(result.result))
        localStorage.setItem('token', JSON.stringify(result.auth))
        if(result) {
            navigate('/');
        }
    }

    return (
        <div className='register'>
            <h2>Register</h2>
            <label>Name:</label>
            <input className='input-box'
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" 
                placeholder='Enter value' />
             <label>Email:</label>
            <input className='input-box'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text" 
                placeholder='Enter value' />
            <label>Password:</label>
            <input className='input-box'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                placeholder='Enter value' />
            <button onClick={submit} className='sing-up-btn'>Sing Up</button>
        </div>
    )
}

export default Signup