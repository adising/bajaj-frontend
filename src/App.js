import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

const App = () => {
  const [response, setResponse] = useState({});
  const [dropdownValue, setDropdownValue] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://bajaj-ddhn.onrender.com/bfhl', { data: ['M', '1', '334', '4', 'B', 'Z', 'a'] });
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  const formatResponse = () => {
    let formattedResponse = '';

    if (dropdownValue === 'numbers' && response.numbers) {
      formattedResponse += `Numbers: ${response.numbers.join(', ')}`;
    }

    if (dropdownValue === 'alphabets' && response.alphabets) {
      formattedResponse += `Alphabets: ${response.alphabets.join(', ')}`;
    }

    if (dropdownValue === 'highest_lowercase_alphabet' && response.highest_lowercase_alphabet) {
      formattedResponse += `Highest Lowercase Alphabet: ${response.highest_lowercase_alphabet.join(', ')}`;
    }

    return formattedResponse;
  };

  return (
    <div className="container">
      <h1>21BCE1376</h1> {/* Update this to your roll number */}
      <textarea placeholder="Enter JSON here" />
      <button onClick={handleSubmit}>Submit</button>
      <select onChange={handleDropdownChange} value={dropdownValue}>
        <option value="">Select...</option>
        <option value="numbers">Numbers</option>
        <option value="alphabets">Alphabets</option>
        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
      </select>
      <div>
        {formatResponse()}
      </div>
    </div>
  );
};

export default App;
