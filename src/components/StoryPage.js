import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/homebg.jpg';
import sideImage from '../assets/smartphone.png';
import back from '../assets/arrow.png';
import Share from './Share'; 

const StoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { story } = location.state || { story: 'No story available.' };
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 md:p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <button
        onClick={() => navigate(-1)}
        className={`absolute top-2 left-2 md:top-4 md:left-4 px-2 md:px-4 py-1 md:py-2 rounded text-white focus:outline-none`}
      >
        <img src={back} loading="lazy" alt="Back" className="w-12 h-12 md:w-16 md:h-16 object-cover rounded" />
      </button>
      <button
        onClick={handleToggleTheme}
        className={`absolute top-2 right-2 md:top-4 md:right-4 px-2 md:px-4 py-1 md:py-2 rounded font-poppins ${darkMode ? 'bg-yellow-400' : 'bg-gray-700'} text-white hover:${darkMode ? 'bg-yellow-300' : 'bg-gray-600'} focus:outline-none`}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="w-full max-w-4xl p-4 md:p-6 rounded-lg shadow-lg">
        <div className='flex flex-col md:flex-col items-center gap-4 md:gap-8'>
          <img src={sideImage} loading="lazy" alt="Side" className={`w-32 h-32 md:w-40 md:h-40 object-cover rounded ${darkMode ? 'bg-yellow-400' : 'bg-gray-700'} `} />
            <Share story={story} theme={darkMode} /> 
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-4xl font-semibold mb-4 text-center md:text-left mt-4 md:mt-8 font-poppins">Your Generated Story</h1>
            <div className="flex items-start ml-4 mr-4 md:ml-6 md:mr-6 gap-4">
              <p className="text-base md:text-lg">{story}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
