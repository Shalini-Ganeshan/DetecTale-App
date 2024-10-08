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
    <div className="flex flex-row align-center justify-end gap-5 mt-4">
      <button onClick={copyToClipboard} className="flex items-center">
       <i class="fi fi-bs-copy"></i>
      </button>
      {/* Twitter */}
      <a 
        href={`https://twitter.com/intent/tweet?text=${encodedStory}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
          <i class="fi fi-rs-dove"></i>
        {/* Twitter SVG */}
      </a>
<a
  href={`https://api.whatsapp.com/send?text=${encodedStory}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <i class="fi fi-rs-whatsapp"></i>
  {/* WhatsApp SVG */}
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
