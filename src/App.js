// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://huggingface.co/prompthero/openjourney-v4';

function App() {
  const [text, setText] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [error, setError] = useState('');

  const generateImages = async () => {
    try {
      const response = await axios.post(API_URL, { inputs: text });
      setGeneratedImages(response.data.generated_images);
      setError('');
    } catch (err) {
      setError('An error occurred while generating images. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>AI Image Generation App</h1>
      <textarea
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={generateImages}>Generate Images</button>
      {error && <p>{error}</p>}
      <div className="image-container">
        {generatedImages.map((image, index) => (
          <img key={index} src={image} alt={`Generated Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
