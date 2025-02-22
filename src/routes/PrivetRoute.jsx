import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const PrivetRoute = ({ children }) => {
  const { user } = useAuth();
  if(!user) return <div className='text-center text-red-500 py-8 text-xl'>Please Login First!</div>

  return user ? children : <Navigate to='/' />;
};

export default PrivetRoute;