import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';

// eslint-disable-next-line react/prop-types
const PrivetRoute = ({ children }) => {
  const {loading} = useAuth()
  const { user } = useAuth();
  if (loading) return <Spinner />;
  if(!user) return <div className='text-center text-red-500 py-8 text-xl'>Please Login First!</div>

  return user ? children : <Navigate to='/' />;
};

export default PrivetRoute;