import { Link, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const MainLayout = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const axiosPublic = useAxiosPublic();

  // handle google login
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        const user = {
          uid: res?.user?.uid,
          name: res?.user?.displayName,
          email: res?.user?.email,
        };
        axiosPublic.post("/users", user);
        toast.success("Success to login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className='container mx-auto p-4'>
      <header>
        <h1 className='text-center text-3xl font-bold'>Task Manager</h1>
        <div className='flex justify-center mt-6'>
          {user ? (
            <div>
              <button
                onClick={logout}
                className='px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer'
              >
                Logout
              </button>
              <Link to='/add-task' className='ml-4 bg-blue-600 text-white px-4 py-2.5 rounded-md'>
                Add Task
              </Link>
            </div>
          ) : (
            <div>
              <button
                onClick={handleGoogleLogin}
                className='px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer'
              >
                Sign in with Google
              </button>
            </div>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>this is footer</footer>
    </div>
  );
};

export default MainLayout;
