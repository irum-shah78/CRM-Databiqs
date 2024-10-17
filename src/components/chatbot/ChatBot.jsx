import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import Loader from '../loader/Loader';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
  
    setChatHistory((prev) => [...prev, { type: 'user', text: question }]);
    setLoading(true);
  
    try {
      const result = await axios.post(
        'https://chatbot-backend-fastapi-g0fyfwctdehedjay.westus-01.azurewebsites.net/query',
        {
          question: question 
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
  
      setChatHistory((prev) => [...prev, { type: 'bot', text: result.data.answer }]);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch response. Please try again.');
    } finally {
      setQuestion('');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

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

          <div ref={chatContainerRef} className="mt-4 h-52 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`p-3 rounded mb-2 shadow-md ${chat.type === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
                <strong>{chat.type === 'user' ? 'You:' : 'Bot:'}</strong>
                <p>{chat.text}</p>
              </div>
            ))}

            {loading && (
              <div className="p-3 rounded mb-2 shadow-md bg-gray-100">
                <strong>Bot:</strong>
                <p><Loader /></p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-100 rounded shadow-md">
                <h3 className="font-bold">Error:</h3>
                <p>{error}</p>
              </div>
            )}
          </div>

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
