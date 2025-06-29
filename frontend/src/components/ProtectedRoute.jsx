import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute ({ isLoggedIn , children }) {
  const location = useLocation();
  const from = location.state?.from || "/"
  
  // if(isLoggedIn) return <Navigate to={from} />;
  if(!isLoggedIn) return <Navigate to="/login" state={{from: location}} replace />;
  return children;
};

