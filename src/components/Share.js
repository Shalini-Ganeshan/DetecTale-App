import React, { useState } from 'react';

const Toast = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black text-white p-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
};

const Share = ({ story, theme }) => {
  const [toastMessage, setToastMessage] = useState('');
  const encodedStory = encodeURIComponent(story);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedStory}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setToastMessage('Story copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleCloseToast = () => {
    setToastMessage('');
  };

  return (
    <div className="flex justify-center items-center space-x-4 p-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-lg">
      <div className="flex justify-center items-center space-x-4 pt-3 pb-3 pr-4 pl-4 bg-white border-1 border-transparent rounded-lg bg-clip-border">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex justify-center items-center w-10 h-10 bg-transparent border-none cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded"
        >
          <i className={`fi fi-bs-copy text-2xl ${theme ? 'text-black' : 'text-white'}`}></i>
        </button>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center w-10 h-10 bg-transparent border-none cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded"
        >
         <i className={`fab fa-whatsapp text-3xl  ${theme ? 'text-black' : 'text-white'}`}></i>

        </a>

        {/* Email Button */}
        <a
          href={`mailto:?subject=Check this out!&body=${encodedStory}`}
          className="flex justify-center items-center w-10 h-10 bg-transparent border-none cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded"
        >
          <i className={`fi fi-bs-envelope text-2xl  ${theme ? 'text-black' : 'text-white'}`}></i>
        </a>

        {/* Twitter Button */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(story)}&url=${encodedStory}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center w-10 h-10 bg-transparent border-none cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded"
        >
          <i className={`fi fi-rs-dove text-2xl $ ${theme ? 'text-black' : 'text-white'}`}></i>
        </a>

        {toastMessage && <Toast message={toastMessage} onClose={handleCloseToast} />}
      </div>
    </div>
  );
};

export default Share;
