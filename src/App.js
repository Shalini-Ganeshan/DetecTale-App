import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ObjectDetector from './components/ObjectDetector'
import SplashScreen from './components/SplashScreen'
import StoryPage from './components/StoryPage'
import WriteCharacter from './components/WriteCharacter';
import SpeakCharacter from './components/SpeakCharacter';
import Home from './components/Home';

function App() {
  
  return (
    <div>
      <Router>
      

        <Routes>
        <Route path="/" element={<SplashScreen  />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/write-character" element={<WriteCharacter  />} />
        <Route path="/speak-character" element={<SpeakCharacter  />} />
        <Route path="/detector" element={<ObjectDetector  />} />
        <Route path="/story" element={<StoryPage />} />
        </Routes>
    
    </Router>
    </div>
  );
}

export default App;
