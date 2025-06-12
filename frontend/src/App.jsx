import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './private/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  const navigate = useNavigate();
  const handleKeyDown = useCallback((event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
      event.preventDefault();
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/portfolio' element={<Portfolio/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route 
          path='/portal' 
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer/>
    </>
  );
}

export default App
