import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
export default function RequreAuth({ children }) {
  const adminAuth = useSelector((state) => state.admin.isLogined);
  const location = useLocation();
  if (!adminAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}
