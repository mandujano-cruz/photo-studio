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
import CurrentUserContext from './contexts/CurrentUserContext';
import Api from "./utils/api";
import * as auth from './utils/auth';
import * as tok from './utils/token';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userData, setUserData] = useState ({email: "", password: ""});
  const location = useLocation();
  const navigate = useNavigate();

  const api = new Api({
    baseUrl: "http://localhost:3000/",
    headers: {
      authorization: `Bearer ${tok.getToken()}`,
      "Content-Type": "application/json"
    }
  });

  useEffect(() => {
    const token = tok.getToken();
    if (!token) {
      setIsCheckingAuth(false);
      setIsLoggedIn(false);
      return;
    }
    auth.getUserInfo(token)
      .then((data) => {
        if(data?.email) {
          setIsLoggedIn(true);
          setUserData({email: data.email});
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await api.getUserInfo("users/me")
  //       .then((data) => setCurrentUser(data))
  //       .catch((err) => console.error("Error al obtener el usuario", err));
  //   })();
  // }, []);

  const privatePaths = ['/dashboard', '/appointments', '/photography', '/users', '/profile'];
  const noHeaderFooterPaths = ['/login'];
  const showPublicHeaderFooter = !privatePaths.some(path => location.pathname.startsWith(path)) && !noHeaderFooterPaths.includes(location.pathname);
  const showPrivateHeader = privatePaths.some(path => location.pathname.startsWith(path));

  const handleLogin = ({email, password}) => {
    if(!email || !password){
      return;
    }
    auth.authorize(email, password)
      .then((data) => {
        if(data.token) {
          tok.setToken(data.token);
          setUserData({ email });
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/dashboard";
          navigate(redirectPath);
        }
      })
      .catch(() => console.log('Algo salio mal'));
  };

  const handleSignOut = () => {
    tok.removeToken();
    setIsLoggedIn(false);
    navigate("/login");
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
      <CurrentUserContext.Provider value={{currentUser}}>
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
              <ProtectedRoute isLoggedIn={isLoggedIn} isCheckingAuth={isCheckingAuth} >
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
      </CurrentUserContext.Provider>
    </>
  );
}

export default App
