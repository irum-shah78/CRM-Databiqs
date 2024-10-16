import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/${email}/`);
      console.log(response.data);
      setUser(response.data);
      navigate('/');
      console.log("Email:", email);
      console.log("Email:", response.data.email);
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.detail || 'Error occurred during sign-in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;