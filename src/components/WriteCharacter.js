import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import backgroundImage from '../assets/homebg.jpg';
import owl from '../assets/owl.png';

const MAX_CHARACTERS = 12;

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'kn', label: 'Kannada' },
  { value: 'ml', label: 'Malayalam' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ur', label: 'Urdu' },
  { value: 'bn', label: 'Bengali' },
  { value: 'mr', label: 'Marathi' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
];

const WriteCharacter = () => {
  const [characters, setCharacters] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState({ value: 'en', label: 'English' });
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCharacters = [...characters];
    newCharacters[index] = value;
    setCharacters(newCharacters);
    setError('');
  };

  const handleAddCharacter = () => {
    if (characters.length < MAX_CHARACTERS && characters[characters.length - 1]) {
      setCharacters([...characters, '']);
    }
  };

  const handleRemoveCharacter = (index) => {
    const newCharacters = characters.filter((_, i) => i !== index);
    setCharacters(newCharacters);
    setError('');
  };

  const handleReadStory = async () => {
    if (characters.every(char => char.trim() === '')) {
      setError('Please enter at least one character.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://detectale-backend.netlify.app/.netlify/functions/generateStory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ objects: characters.filter(char => char.trim() !== ''), language: selectedLanguage.value }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const data = await response.json();
      navigate('/story', { state: { story: data.story } });
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center font-poppins"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-4xl p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-2xl mb-6 text-center font-poppins">Write Your Characters</h1>
        {error && (
          <div className="mb-4 p-4 text-red-800 bg-red-100 rounded border text-center font-poppins border-red-300">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {characters.map((character, index) => (
            <div key={index} className="relative flex items-center">
              <input
                type="text"
                value={character}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={`Character-${index + 1}`}
                className="p-2 border border-gray-300 rounded w-full"
              />
              {characters.length > 1 && (
                <button
                  onClick={() => handleRemoveCharacter(index)}
                  className="absolute top-0 right-0 mt-2 mr-2 font-bold text-red-500 hover:text-red-700 focus:outline-none"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
        <Select
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          options={languageOptions}
          className="mb-6"
        />
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-row space-x-4">
            <button
              onClick={handleAddCharacter}
              disabled={characters.length >= MAX_CHARACTERS || !characters[characters.length - 1]}
              className="px-4 py-2 bg-blue-500 text-white rounded font-poppins hover:bg-blue-600 disabled:bg-gray-400"
            >
              Add Character
            </button>
            <button
              onClick={handleReadStory}
              disabled={loading}
              className={`px-4 py-2 font-poppins rounded ${loading ? 'bg-gray-400' : 'bg-green-500'} text-white hover:${loading ? 'bg-gray-500' : 'bg-green-600'}`}
            >
              <div className="flex flex-row gap-3">
                <img src={owl} alt="readingOwlImg" loading="lazy" className="w-16 h-16 object-cover rounded" />
                <div className="mt-3 p-3">
                  {loading ? "Loading..." : "Read Story"}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteCharacter;
