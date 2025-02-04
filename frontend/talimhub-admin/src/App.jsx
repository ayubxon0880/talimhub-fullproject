import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import { ADMIN_ROUTERS } from './env';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : false);

  return (
    <Router>
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div className="App-content">
        <Routes>  
          {isAuthenticated ? (
            <>
              {
                ADMIN_ROUTERS.map(item => (
                  <Route key={item.path} path={item.path} element={item.element} />
                ))
              }
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  </Router>
  
  );
}

export default App;
