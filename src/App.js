import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(jsonInput);
      const result = await axios.post('https://bajaj-ddhn.onrender.com/bfhl', { data });
      setResponse(result.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const options = selectedOptions.map(option => option.value);
    const filteredResponse = {};

    if (options.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (options.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (options.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
    );
  };

  return (
    <div className="App">
      <h1>API Frontend</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here'
      />
      <button onClick={handleSubmit}>Submit</button>
      <Select
        isMulti
        options={[
          { value: 'Numbers', label: 'Numbers' },
          { value: 'Alphabets', label: 'Alphabets' },
          { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
        ]}
        onChange={handleSelectChange}
      />
      {renderResponse()}
    </div>
  );
}

export default App;
