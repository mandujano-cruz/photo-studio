import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute ({ isLoggedIn , isCheckingAuth, children }) {
  const location = useLocation();
  console.log("isLoggedIn:", isLoggedIn, "isCheckingAuth:", isCheckingAuth)
  // const from = location.state?.from || "/"
  
  if(isLoggedIn) return <Navigate to={from} />;
  if (isCheckingAuth) return <div className="loading">Cargando sesión...</div>;
  if(!isLoggedIn) return <Navigate to="/login" state={{from: location}} replace />;
  return children;
};

