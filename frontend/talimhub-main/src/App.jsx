import { useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './Router';
AOS.init();

const App = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className='dark:text-white dark:bg-gray-900'>
      <Router>
        <Routers />
      </Router>
    </div>
  )
}

export default App