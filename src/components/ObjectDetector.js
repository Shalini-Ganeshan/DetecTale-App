import React, { useRef, useState } from "react";
import "@tensorflow/tfjs-backend-cpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from 'react-select'; 
import searchimg from '../assets/search.png';
import cameraIcon from '../assets/camera.png';
import owl from '../assets/owl.png'; 

const ObjectDetector = ({ onStoryGenerated = () => {} }) => {
  const fileInputRef = useRef();
  const imageRef = useRef();
  const [imgData, setImgData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [story, setStory] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState({ value: 'en', label: 'English' });
  const navigate = useNavigate();

  const isEmptyPredictions = !predictions || predictions.length === 0;

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
  { value: 'fr', label: 'French' }
  ];

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const normalizePredictions = (predictions, imgSize) => {
    if (!predictions || !imgSize || !imageRef.current) return predictions || [];
    return predictions.map((prediction) => {
      const { bbox } = prediction;
      const oldX = bbox[0];
      const oldY = bbox[1];
      const oldWidth = bbox[2];
      const oldHeight = bbox[3];

      const imgWidth = imageRef.current.width;
      const imgHeight = imageRef.current.height;

      const x = Math.max(0, Math.min((oldX * imgWidth) / imgSize.width, imgWidth));
      const y = Math.max(0, Math.min((oldY * imgHeight) / imgSize.height, imgHeight));
      const width = Math.max(0, Math.min((oldWidth * imgWidth) / imgSize.width, imgWidth - x));
      const height = Math.max(0, Math.min((oldHeight * imgHeight) / imgSize.height, imgHeight - y));

      return { ...prediction, bbox: [x, y, width, height] };
    });
  };
 

  const detectObjectsOnImage = async (imageElement, imgSize) => {
    const model = await cocoSsd.load({});
    const predictions = await model.detect(imageElement, 6);
    const normalizedPredictions = normalizePredictions(predictions, imgSize);
    setPredictions(normalizedPredictions);

    const objectNames = normalizedPredictions.map(prediction => prediction.class);
    await sendObjectsToBackend(objectNames, selectedLanguage.value);
  };
const readImage = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const onSelectImage = async (e) => {
    setPredictions([]);
    setLoading(true);

    const file = e.target.files[0];
    if (!file) {
      setLoading(false);
      return;
    }

    const imgData = await readImage(file);
    setImgData(imgData);

    const imageElement = document.createElement("img");
    imageElement.src = imgData;

    imageElement.onload = async () => {
      const imgSize = {
        width: imageElement.width,
        height: imageElement.height,
      };
      await detectObjectsOnImage(imageElement, imgSize);
      setLoading(false);
    };
  };

  const sendObjectsToBackend = async (objects, language) => {
    try {
      const response = await fetch('https://detectale-backend.netlify.app/.netlify/functions/generateStory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ objects, language }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Data received from backend:", data);

      setStory(data.story);

      if (typeof onStoryGenerated === 'function') {
        onStoryGenerated(data.story);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReadStoryClick = async () => {
    setLoading(true);
    navigate('/story', { state: { story } });
  };

  return (
    <div className="flex flex-col font-poppins items-center bg-gradient-to-r from-purple-500 via-pink-400 to-red-500 min-h-screen py-10 px-4">
      <div className="bg-white rounded-lg flex shadow-lg flex-col md:flex-row gap-6 border-2 border-purple-500 max-w-4xl w-full md:w-auto mx-auto">
        <div className="flex-shrink-0 md:w-1/3">
          <img
            src={searchimg}
            alt="detectImg"
            className="w-52 h-52 md:h-44 md:w-44 object-cover rounded md:mr-16 mt-8 md:mt-24 md:ml-8"
          />
        </div>

        <div className="relative flex-grow w-full max-w-lg mx-auto rounded-lg p-4">
          <div className="min-w-full h-[300px] md:h-[400px] border-4 border-blue-400 rounded-lg flex items-center justify-center relative bg-gray-100">
            {imgData ? (
              <div className="relative w-full h-full">
                <img
                  ref={imageRef}
                  src={imgData}
                  alt="uploadedImg"
                  className="w-full h-full object-cover"
                />
                {!isEmptyPredictions &&
                  predictions.map((prediction, idx) => (
                    <div
                      key={idx}
                      className="absolute border-4 border-green-500 bg-transparent z-20"
                      style={{
                        left: `${prediction.bbox[0]}px`,
                        top: `${prediction.bbox[1]}px`,
                        width: `${prediction.bbox[2]}px`,
                        height: `${prediction.bbox[3]}px`,
                        pointerEvents: 'none',
                      }}
                    >
                      <div
                        className="absolute text-green-500 font-bold text-xs md:text-sm bg-white p-1 rounded-md shadow-lg"
                        style={{
                          top: '-1.5em',
                          left: '-5px',
                        }}
                      >
                        {`${prediction.class} ${prediction.score.toFixed(1)}%`}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <img
                src={cameraIcon}
                alt="camera icon"
                className="h-24 w-24"
              />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onSelectImage}
            className="hidden"
          />
          <div className="flex flex-col items-center mt-6 space-y-4">
            <Select
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              options={languageOptions}
              className="w-full"
            />
            <button
              onClick={openFilePicker}
              className={`py-2 px-4 border-2 border-transparent bg-yellow-400 text-white text-lg font-semibold rounded-md shadow-md transition-transform transform hover:scale-105 ${isLoading ? 'bg-yellow-300' : 'hover:bg-yellow-500'}`}
            >
              {isLoading ? "Recognizing..." : "Select Image"}
            </button>
            {!isEmptyPredictions && (
              <div className="mt-6 w-full">
                <h3 className="text-lg font-semibold mb-2">Detected Objects:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {predictions.map((prediction, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                      <span className="text-gray-800 text-center">
                        {prediction.class} ({(prediction.score * 100).toFixed(1)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!isEmptyPredictions && (
              <button
                onClick={handleReadStoryClick}
                className="flex flex-row gap-3 items-center py-2 px-4 border-2 border-transparent bg-green-500 text-white text-lg font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
              >
                <img
                  src={owl}
                  alt="readingOwlImg"
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="mt-3 p-3">
                  {isLoading ? "Loading..." : "Read Story"}
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ObjectDetector.propTypes = {
  onStoryGenerated: PropTypes.func,
};

export default ObjectDetector;
