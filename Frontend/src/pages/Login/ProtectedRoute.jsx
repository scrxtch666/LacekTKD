import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Pokud není token, pošli uživatele na login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;