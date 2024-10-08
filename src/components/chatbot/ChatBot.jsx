import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `https://chatbot-backend-fastapi-g0fyfwctdehedjay.westus-01.azurewebsites.net/query?question=${question}`
      );
      console.log(result.data);
      setResponse(result.data.answer);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch response. Please try again.');
      setResponse('');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        >
          <FontAwesomeIcon icon={faComments} size="lg" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg w-72 md:w-96 fixed bottom-5 right-5 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Chat</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900">
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          {response && (
            <div className="mt-4 p-3 bg-green-100 rounded shadow-md">
              <h3 className="font-bold">Response:</h3>
              <p>{response}</p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 rounded shadow-md">
              <h3 className="font-bold">Error:</h3>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              value={question}
              onChange={handleInputChange}
              placeholder="Ask a question..."
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
