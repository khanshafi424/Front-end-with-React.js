import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

     useEffect(() => {
        const auth = localStorage.getItem("user");
        if(auth) {
          navigate('/');
        }
      }, [])

    const login = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: "post",
            body: JSON.stringify({email,  password}),
            headers: {
                'Content-Type' : "application/json"
            }
        });
        result = await result.json();
        if(result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user))
            localStorage.setItem('token', JSON.stringify(result.auth))
            navigate('/')
        } else {
            alert("please enter Correct details")
        }
    }

  return (
    <div className='login'>
        <h1>Login Form</h1>
        <input type="text" onChange={(e) => {setEmail(e.target.value)}} placeholder='Enter email' className='input-box' />
        <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder='Enter password' className='input-box' />
        <button onClick={login} className='sing-up-btn'>Login</button>
        <div className='anchor-btn'>
            <a><Link to="/signup">Register</Link></a>
            <a>Forget Password</a>
        </div>
    </div>
  )
}

export default Login