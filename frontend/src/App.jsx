import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
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
import PrivateHeader from './private/PrivateHeader';
import Appointments from './private/Appointments'
import Users from './private/Users/Users';
import Photo from './private/Photography/Photo';
import Profile from './private/Profile';
import Main from './private/Main';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const privatePaths = ['/dashboard', '/appointments', '/photography', '/users', '/profile'];
  const noHeaderFooterPaths = ['/login'];

  const showPublicHeaderFooter = !privatePaths.some(path => location.pathname.startsWith(path)) && !noHeaderFooterPaths.includes(location.pathname);
  const showPrivateHeader = privatePaths.some(path => location.pathname.startsWith(path));

  const handleLogin = () => {
    setIsLoggedIn(true);
    const redirectPath = location.state?.from?.pathname || "/";
    navigate(redirectPath);
  }

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
      {showPublicHeaderFooter && <Header/>}
      {showPrivateHeader && <PrivateHeader/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/portfolio' element={<Portfolio/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route 
          path='/dashboard/*' 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          } 
        >
          <Route index element={<Main />} />
          <Route path='appointments' element={<Appointments/>} />
          <Route path='users' element={<Users/>} />
          <Route path='photo' element={<Photo/>} />
          <Route path='profile' element={<Profile/>} />
        </Route>
        <Route 
          path="*"
          element={
            isLoggedIn ? (<Navigate to="/dashboard" replace />) : (<Navigate to="/login" replace />)
          }
        />
      </Routes>
      {showPublicHeaderFooter &&  <Footer/>}
    </>
  );
}

export default App
