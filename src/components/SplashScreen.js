// src/components/SplashScreen.js
import React from 'react';
import bgImage from '../assets/homebg.jpg'; 
import { useNavigate } from 'react-router';
import logo from '../assets/book.png'

const SplashScreen = () => {
  const navigate=useNavigate();
  const handleClick = () => {
    navigate('/home');
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg w-full border-4 border-blue-500 ">
        <img src={logo} alt="Logo" loading="lazy" className="mx-auto mb-4 w-48 h-48" />
        <h1 className="text-4xl  mb-4 text-gray-800 font-matemasie">DetecTale</h1>
        <p className="text-gray-600 mb-6">Turn Your Words and Pics into Magical Stories!</p>
        <button  onClick={handleClick} className="px-4 py-2 font-poppins bg-blue-500 text-white rounded-full  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
