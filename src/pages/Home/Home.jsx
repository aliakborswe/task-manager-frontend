
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Home = () => {
  const { user, loginWithGoogle, logout } = useAuth();

  // handle google login
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        console.log(res)
        toast.success("Success to login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-center text-3xl font-bold'>Task Manager</h1>
      <div className='flex justify-center mt-6'>
        {user ? (
          <button
            onClick={logout}
            className='px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer'
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleGoogleLogin}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer'
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
