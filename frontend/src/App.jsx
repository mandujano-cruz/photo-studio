import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './private/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
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
  );
}

export default App
