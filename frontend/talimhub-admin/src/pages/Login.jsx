import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../env';

const Login = ({ setIsAuthenticated }) => {
  const [phone, setPhone] = useState('998');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.user.role.name === "ROLE_ADMIN") {
          localStorage.setItem('token', data.token);
          setIsAuthenticated(true);
          window.location.reload()
          navigate('/dashboard');
        }
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue.startsWith('998')) {
      setPhone('998');
    } else {
      setPhone(inputValue);
    }
  };

  return (
    <form className="max-w-sm mx-auto mt-10" onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="phone" className="block">Phone:</label>
        <input
          type="tel"
          id="phone"
          className="w-full px-3 py-2 border"
          value={phone}
          onChange={handlePhoneChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block">Password:</label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  );
};

export default Login;
