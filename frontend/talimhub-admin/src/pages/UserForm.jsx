import React, { useState } from 'react';
import axios from 'axios';
import { API, LoadingSpinner } from '../env';
import Select from 'react-select';

const roles = [
  { value: 'teacher', label: 'Teacher' },
  { value: 'user', label: 'Student' },
  // { value: 'admin', label: 'Admin' },
];

function UserForm() {
  const [selectedOption, setSelectedOption] = useState(roles[0]);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API}/admin/${selectedOption.value}/create`, formData, {
        headers:{
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      });
      alert(`${selectedOption.label} created successfully!`);
      setFormData({
        firstname: '',
        lastname: '',
        phone: '',
        password: '',
      });
    } catch (err) {
      setError(`An error occurred while creating the ${selectedOption.value}.`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={roles}
        />
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

export default UserForm;
