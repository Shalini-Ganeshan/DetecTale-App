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
      right: 20px;
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
    <div className="flex flex-row align-center justify-end gap-5 mt-4">
      <button onClick={copyToClipboard} className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
          <path fill="#000" d="M32,6H16C14.346,6,13,7.346,13,9v30c0,1.654,1.346,3,3,3h16c1.654,0,3-1.346,3-3V9C35,7.346,33.654,6,32,6z M32,36H16V12h16V36z"/>
          <path fill="#000" d="M20,0h-6C12.346,0,11,1.346,11,3v6c0,1.654,1.346,3,3,3h6c1.654,0,3-1.346,3-3V3C23,1.346,21.654,0,20,0z"/>
        </svg>
      </button>

      {/* Facebook */}
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedStory}&quote=${encodedStory}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {/* Facebook SVG */}
      </a>

      {/* Twitter */}
      <a 
        href={`https://twitter.com/intent/tweet?text=${encodedStory}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {/* Twitter SVG */}
      </a>

      {/* Pinterest */}
      <a 
        href={`https://pinterest.com/pin/create/button/?description=${encodedStory}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {/* Pinterest SVG */}
      </a>

      {/* Email */}
      <a 
        href={`mailto:?subject=Check out this story&body=${encodedStory}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img src="https://static.vecteezy.com/system/resources/previews/000/421/984/original/vector-email-address-icon.jpg" height={30} width={30} alt="Email" />
      </a>

      {/* Toast Message */}
      {toastMessage && <Toast message={toastMessage} onClose={handleCloseToast} />}
    </div>
  );
};

export default Share;
