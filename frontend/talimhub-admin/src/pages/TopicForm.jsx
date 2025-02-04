import React, { useState } from 'react';
import axios from 'axios';
import { API, LoadingSpinner } from '../env';
import Select from 'react-select';

function TopicForm() {
  const partOptions = [
    { value: '1', label: 'Part 1' },
    { value: '2', label: 'Part 2' },
    { value: '3', label: 'Part 3' },
  ];
  
  const [topic, setTopic] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPart, setSelectedPart] = useState(partOptions[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // If part is not "Part 1", reset image2
    if (selectedPart.value !== '1') {
      setImage2('');
    }
  
    axios.post(`${API}/topic/save-v2`, {
      part: selectedPart.value,
      topic,
      image1,
      image2,
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(() => {
      alert('Topic created successfully!');
      setLoading(false);
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging purposes
      setError('An error occurred while saving.');
      setLoading(false);
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Topic</label>
          <input
            type="text"
            name="topic"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Part</label>
          <Select
            isMulti={false}
            value={selectedPart}
            onChange={setSelectedPart}
            options={partOptions}
            className="mt-2 w-40"
            classNamePrefix="select"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Image 1 URL</label>
          <input
            type="text"
            name="image1"
            value={image1}
            onChange={e => setImage1(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {selectedPart.value === "1" && (
          <div className="mb-4">
            <label className="block text-gray-700">Image 2 URL</label>
            <input
              type="text"
              name="image2"
              value={image2}
              onChange={e => setImage2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            Create
          </button>
        )}
      </form>
    </div>
  );
}

export default TopicForm;
