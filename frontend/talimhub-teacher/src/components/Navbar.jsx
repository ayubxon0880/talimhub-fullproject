import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = (event) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setMenuOpen(false);
    };

    if (menuOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  const links = isAuthenticated
    ? [
        { to: '/dashboard', label: 'Bosh sahifa' },
        { to: '/speaking', label: 'Speaking' },
        { to: '/mocks', label: 'Mocklar' },
        { to: '/checked-mocks', label: 'Mocks I was checked' },
        { to: '/my-feedbacks', label: 'My Feedbacks' },
        { to: '/profile', label: 'Profile' },
      ]
    : [
        { to: '/login', label: 'Login' },
        { to: 'https://t.me/talimhub_bot', label: 'Register' },
      ];

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-semibold">Talimhub</Link>
        <div className="hidden md:flex space-x-4">
          {links.map((link, index) => (
            <div key={link.label} className="border-b border-gray-600 pb-2">
              <Link
                to={link.to}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </div>
          ))}
          {isAuthenticated && (
            <div className="border-b border-gray-600 pb-2">
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Chiqish
              </button>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 focus:outline-none"
          >
            {menuOpen ? 'Yopish' : 'Menu'}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-2 bg-gray-800 rounded-lg shadow-md p-4">
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.label} className="border-b border-gray-600 pb-2">
                <Link
                  to={link.to}
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
            {isAuthenticated && (
              <div className="border-b border-gray-600 pb-2">
                <button
                  onClick={handleLogout}
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Chiqish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
