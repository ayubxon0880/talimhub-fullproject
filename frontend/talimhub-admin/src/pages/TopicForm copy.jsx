import React, { useState } from 'react';
import axios from 'axios';
import { API, LoadingSpinner } from '../env';
import Select from 'react-select';


function TopicFormCopy() {
  const partOptions = [
    { value: '1', label: 'Part 1' },
    { value: '2', label: 'Part 2' },
    { value: '3', label: 'Part 3' },
  ];
  const [topic, setTopic] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPart, setSelectedPart] = useState(partOptions[0]);

  const handleImageChange1 = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImageChange2 = (e) => {
    setImage2(e.target.files[0]);
  };


  const handleFinalSubmission = (id) => {
    const formData = new FormData();
    formData.append("topicId", id);
    formData.append("image1", image1);
    if (selectedPart.value == "1") {
      formData.append("image2", image2);      
    }
    axios.post(`${API}/topic/save/image`,formData,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      alert('Topic created successfully!');
      setLoading(false);
    }).catch((error) => {
      setError('An error occurred while saving.');
      setLoading(false);
    })
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (selectedPart.value != '1') {
      setImage2("");
    }
  
    axios.post(`${API}/topic/save-v2`, {
      part: selectedPart.value,
      topic,
      image1,
      image2
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res) => {
      alert('Topic created successfully!');
      setLoading(false);
      // handleFinalSubmission(res.data.id);
    })
    .catch((err) => {
      setError('An error occurred while saving.');
    })
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
            onChange={(selectedOption) => setSelectedPart(selectedOption)}
            options={partOptions}
            className="mt-2 w-40"
            classNamePrefix="select"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image 1 url</label>
          <input
            type="text"
            name="topic"
            value={image1}
            onChange={e => setImage1(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {/* <input type="file" accept="image/*" onChange={handleImageChange1} /> */}
        </div>

        {
          selectedPart.value == "1" &&
        <div className="mb-4">
          <label className="block text-gray-700">Image 2 url</label>
          <input
            type="text"
            name="topic"
            value={image2}
            onChange={e => setImage2(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {/* <input type="file" accept="image/*" onChange={handleImageChange2} /> */}
        </div>
        }
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p className='text-white'>a</p>
        {loading ? <LoadingSpinner/> : <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
        Create
        </button>}
      </form>
    </div>
  );
}

export default TopicFormCopy;
