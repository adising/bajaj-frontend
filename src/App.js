import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://bajaj-ddhn.onrender.com/bfhl', {
        data: data.split(',').map(item => item.trim()) // Split input data into an array
      });

      const { numbers, alphabets, highest_lowercase_alphabet } = response.data;

      // Format the results as plain text
      const formattedResult = `
        Numbers: ${numbers.join(', ')}
        Alphabets: ${alphabets.join(', ')}
        Highest Lowercase Alphabet: ${highest_lowercase_alphabet.join(', ')}
      `;

      setResult(formattedResult.trim());
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred while processing your request.');
    }
  };

  return (
    <div className="App">
      <h1>API Frontend</h1>
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        rows="10"
        cols="30"
        placeholder="Enter comma-separated data here"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div className="result">
        <h2>Result:</h2>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default App;
