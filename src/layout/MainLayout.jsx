import { Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import useTask from "../hooks/useTask";

const MainLayout = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const { addTask } = useTask();
  const navigate = useNavigate();

  // State to store form data
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(task);
      setTask({ title: "", description: "", dueDate: "" });
      setIsOpen(false); 
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Function to close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='container mx-auto px-2.5 py-4 md:py-8 lg:py-12 lg:px-8'>
      <header className='flex justify-between items-center mx-4 px-4 rounded-lg py-4 bg-blue-100'>
        <h1 className='text-center text-3xl font-bold'>My To-Do</h1>
        <div className='flex justify-center items-center'>
          {user ? (
            <div className='flex gap-4'>
              <div
                onClick={() => setIsOpen(true)}
                className='bg-blue-600 text-white px-4 py-2.5 rounded-md cursor-pointer'
              >
                Add Task
              </div>
              <button
                onClick={logout}
                className='px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer'
              >
                Logout
              </button>
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
        {/* Modal */}
        {isOpen && (
          <div className='fixed inset-0 flex justify-center items-center bg-gray-900/40 '>
            <div
              ref={modalRef}
              className='p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full'
            >
              <h2 className='text-xl font-bold mb-4'>Add New Task</h2>
              <form onSubmit={handleSubmit}>
                <label className='block text-gray-700 dark:text-gray-300'>
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  value={task.title}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md'
                  required
                />

                <label className='block mt-2 text-gray-700 dark:text-gray-300'>
                  Description
                </label>
                <textarea
                  name='description'
                  value={task.description}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md'
                />

                <label className='block mt-2 text-gray-700 dark:text-gray-300'>
                  Due Date
                </label>
                <input
                  type='date'
                  name='dueDate'
                  value={task.dueDate}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md'
                />

                <button
                  type='submit'
                  className='mt-4 w-full p-2 bg-purple-500 text-white rounded-md'
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <footer className='text-center py-4 bg-gray-100'>This is footer</footer>
    </div>
  );
};

export default MainLayout;
