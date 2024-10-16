import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/', { name, email });
      setSuccessMessage(response.data.message);
      setError(null);
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (err) {
      if (err.response?.data) {
        if (Array.isArray(err.response.data)) {
          setError(err.response.data.map((errorItem) => errorItem.msg).join(', '));
        } else if (typeof err.response.data === 'object' && err.response.data.detail) {
          setError(String(err.response.data.detail));
        } else {
          setError('An error occurred during sign-up');
        }
      } else {
        setError('Error occurred during sign-up');
      }
      setSuccessMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <p className='text-center'>Already have an account? <Link to='/signin' className='text-blue-400 underline'>SignIn</Link></p>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}
      </div>
    </div>
  );
};

export default SignUp;
