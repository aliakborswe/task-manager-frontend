import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const PrivetRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to='/' />;
};

export default PrivetRoute;