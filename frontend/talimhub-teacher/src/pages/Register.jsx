import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { API } from '../env';

const Register = () => {
  const [formData, setFormData] = useState({
    phone: '+998',  // Pre-fill phone input with '+998'
    password: '',
    fullName: '',
    code:'',
    favoriteLanguages: [],
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'french', label: 'French' },
    { value: 'uzbek', label: 'Uzbek' },
    { value: 'russian', label: 'Russian' },
  ];

  // Handle general input change (except phone)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle phone number input
  const handlePhoneChange = (e) => {
    const { value } = e.target;

    // Only allow user to change the number after '+998'
    if (value.startsWith('+998')) {
      setFormData({
        ...formData,
        phone: value,
      });
    } else {
      setFormData({
        ...formData,
        phone: '+998' + value.slice(4),
      });
    }
  };

  // Handle multi-select change
  const handleSelectChange = (selectedOptions) => {
    const selectedLanguages = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData({
      ...formData,
      favoriteLanguages: selectedLanguages,
    });
  };

  const handleSmsCode = async () => {
    const response = await axios.post(`${API}/auth/sms-code`, formData);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate phone number length after +998 (should be 9 digits long)
    if (formData.phone.length !== 13 || formData.password.length < 4) {
      setError('Invalid phone number or password too short (min 4 characters)');
      return;
    }

    try {
      const response = await axios.post(`${API}/auth/register`, formData);
      if (response.status === 200) {
        setSuccessMessage('Registration successful!');
        setError('');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Register</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Phone number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone :</label>
            <div className='grid'>
            <input
              type="text"
              id="phone"
              name="phone"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="+998XXXXXXXXX"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
            />
            {

            }
            <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Get code for confirm phone
            </button>

            </div>
          </div>
            {/* Password */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">sms code</label>
            <input
              type="number"
              id="code"
              name="code"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password (min 4 characters):</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Full name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Favorite languages (React Select Multiple Choice) */}
          <div>
            <label htmlFor="favoriteLanguages" className="block text-sm font-medium text-gray-700">Favorite Languages:</label>
            <Select
              isMulti
              name="favoriteLanguages"
              options={languageOptions}
              className="mt-1 block w-full"
              classNamePrefix="select"
              onChange={handleSelectChange}
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
