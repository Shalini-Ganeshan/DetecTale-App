import React from 'react';
import { useNavigate } from 'react-router-dom';
import imgBox1 from '../assets/pencil.png'; 
import imgBox2 from '../assets/detective.png'; 
import imgBox3 from '../assets/voice.png'
import backgroundImg from '../assets/homebg.jpg'; 

const Home = () => {
  const navigate = useNavigate();

  const handleBoxClick = (path) => {
    navigate(path);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <h1 className="absolute top-16 text-4xl md:text-5xl lg:text-6xl text-gray-800 font-matemasie">DetecTale</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-8 sm:space-y-0">
        <div
          className="flex flex-col items-center justify-center w-60 h-60 md:w-72 md:h-72 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => handleBoxClick('/write-character')}
        >
          <img loading="lazy" src={imgBox1} alt="Box 1" className="w-36 h-36 md:w-44 md:h-44 object-cover" />
          <p className="mt-4 text-lg md:text-xl text-gray-700">Write Character</p>
        </div>
        <div
          className="flex flex-col items-center justify-center w-60 h-60 md:w-72 md:h-72 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => handleBoxClick('/detector')}
        >
          <img loading="lazy" src={imgBox2} alt="Box 2" className="w-36 h-36 md:w-44 md:h-44 object-cover" />
          <p className="mt-4 text-lg md:text-xl text-gray-700">Detect Character</p>
        </div>
        <div
          className="flex flex-col items-center justify-center w-60 h-60 md:w-72 md:h-72 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => handleBoxClick('/speak-character')}
        >
          <img loading="lazy"  src={imgBox3} alt="Box 2" className="w-36 h-36 md:w-44 md:h-44 object-cover" />
          <p className="mt-4 text-lg md:text-xl text-gray-700">Speak Character</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
