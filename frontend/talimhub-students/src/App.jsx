import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import { STUDENT_ROUTERS } from './env';
import Login from './pages/Login';
import Footer from './components/Footer';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  const a = 0
  const b = 1

  return (
    <Router>
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div className="App-content">
        <Routes>  
          {isAuthenticated ? (
            <>
              {
                STUDENT_ROUTERS.map(item => (
                  <Route key={item.path} path={item.path} element={item.element} />
                ))
              }
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
  
  );
}

export default App;
