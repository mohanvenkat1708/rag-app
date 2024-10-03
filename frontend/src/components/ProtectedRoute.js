import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProtectedRoute() {
  const [data, setData] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve token from local storage
      console.log(token);
      let response;
      try {
          response = await axios.get('http://localhost:5000/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.message);
      } catch (error) {
        //console.log(response.data);
        setMessage('Access denied');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Protected Route</h2>
      <p>{data ? data : message}</p>
    </div>
  );
}

export default ProtectedRoute;
