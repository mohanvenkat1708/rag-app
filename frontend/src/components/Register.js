import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom for navigation
import './Register.css';  // Import the CSS file for styling

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password,
        role
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="register-page">  {/* Added a parent class for scoped styling */}
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="register-input"
          />
          <button type="submit" className="register-button">Register</button>
        </form>
        {message && <p className="register-message">{message}</p>}
        <p className="register-link">
          Already registered? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
