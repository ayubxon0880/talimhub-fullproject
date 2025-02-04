import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, LoadingSpinner } from '../env';

const Login = ({ setIsAuthenticated }) => {
  const [phone, setPhone] = useState('998');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Reset error message
    try {
      const ph = phone.replace(/\s+/g, '');
      const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: ph, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setErrorMessage('Parol yoki telefon raqam xato, tekshirib qaytadan urinib koring!');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Parol yoki telefon raqam xato, tekshirib qaytadan urinib koring!');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue.startsWith('998')) {
      setPhone('998');
    } else if (inputValue.length <= 12) { // Ensures phone number stays within 12 characters
      setPhone(inputValue);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <form className="w-full max-w-md bg-white shadow-md rounded-lg p-6 sm:p-8 lg:p-10" onSubmit={handleLogin}>
        <div className="flex justify-center mb-6">
          <img src='./logo.png' style={{ height: '150px', width: '150px' }} alt="Logo" className="mx-auto" />
        </div>
        {/* <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Kirish</h2> */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon:</label>
          <input
            type="tel"
            id="phone"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={phone}
            onChange={handlePhoneChange}
            required
            maxLength={12} // Limit input to 12 characters
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Parol:</label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <a href='https://t.me/talimhub_bot?start=reset-password' className="text-blue-600 text-lg mb-4">Parolni yangilash</a>
        </div>
        {errorMessage && <p className="text-red-600 text-sm mb-4">{errorMessage}</p>}
        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
            Kirish
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
