import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import './Login.css';  // Import the CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login Attempt:', { email, password });

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      console.log('Login Response:', response.data);
      setMessage('Login successful');
      
      // Save the token to localStorage
      const { token } = response.data;
      localStorage.setItem('authToken', token); // Save token in localStorage

      // Wait for 0.5 seconds before redirecting
      setTimeout(() => {
        navigate('/admin-panel'); // Redirect to the admin panel page
      }, 500); // 500 milliseconds = 0.5 seconds
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      setMessage('Login failed: ' + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {message && <p className="login-message">{message}</p>}
        <p className="login-link">
          Not registered yet? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
