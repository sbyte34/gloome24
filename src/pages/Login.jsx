import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import logo from '../images/SideLogo.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const history = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/auth/loginAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Handle successful login, e.g., store authentication token
        console.log('Login successful:', data);
        history('/dashboard');
      } else {
        // Handle login failure, e.g., show error message
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during login:', error);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          {/* Your logo goes here */}
          <img
            src={logo}
            alt="Logo"
            className="w-30 h-14 mr-2" // Adjust the width and height as needed
          />
          {/* <h2 className="text-2xl font-bold">Login</h2> */}
        </div>
        <form>
          <label className="block mb-4">
            Email:
            <input
              type="email"
              className="border p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              type="password"
              className="border p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="bg-slate-900 text-white p-2 rounded w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;