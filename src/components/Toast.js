import React, { useState, useEffect } from 'react';

export const Toast = ({ message, onClose }) => {
  useEffect(() => {
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
          bottom: 20px;
          right: 20px;
          background-color: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};
