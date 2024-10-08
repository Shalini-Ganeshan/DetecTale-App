import React, { useState } from 'react';

const Toast = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      {message}
      <style jsx>{`
       .toast {
      position: fixed;
      top: 20px;
       left: 50%;
      transform: translateX(-50%);
      background-color: black;
      color: white; 
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      z-index: 1000;
    }
      `}</style>
    </div>
  );
};

const Share = ({ story }) => {
  const [toastMessage, setToastMessage] = useState('');

  const copyToClipboard = async () => {
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

  const encodedStory = encodeURIComponent(story);

 return (
    <div className="flex justify-center items-center space-x-4">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="flex justify-center items-center w-9 h-9 bg-transparent border-none cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-gray-800"
        >
          <path d="M19.207 2.793a1 1 0 00-1.414 0l-5.793 5.793a1 1 0 00-.293.707V12a1 1 0 001 1h3a1 1 0 011 1v2a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 00-1-1h-2v-3a1 1 0 00-.293-.707l-5.793-5.793a1 1 0 00-1.414 0L7.5 8.5A1 1 0 007 9.207V10h2a1 1 0 011 1v2H9a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-.293-.707l-5.793-5.793a1 1 0 00-1.414 0l-5.793 5.793a1 1 0 000 1.414l5.793 5.793a1 1 0 001.414 0l5.793-5.793a1 1 0 00.293-.707V9a1 1 0 00-1-1H8V8.793a1 1 0 00.293.707l5.793 5.793a1 1 0 001.414 0l5.793-5.793a1 1 0 000-1.414z" />
        </svg>
      </button>

      {/* Email Button */}
      <a
        href={`mailto:?subject=Check this out!&body=${encodedStory}`}
        className="flex justify-center items-center w-9 h-9 bg-transparent border-none cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded"
      >
        <i className="fi fi-bs-envelope text-gray-800 text-xl"></i>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center w-9 h-9 bg-transparent border-none cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded"
      >
        <i className="fi fi-bs-whatsapp text-gray-800 text-xl"></i>
      </a>

      {/* twitter Button */}
       <a
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${description} - ${hotelName} here:`)}`}
      target="_blank"
      rel="noopener noreferrer"
       className="flex justify-center items-center w-9 h-9 bg-transparent border-none cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 rounded">
        <i className="fi fi-bs-facebook text-gray-800 text-xl"></i>
      </a>

      {toastMessage && <Toast message={toastMessage} onClose={handleCloseToast} />}
    </div>
  );
};

export default Share;
