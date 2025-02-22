import { Link, Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import useTask from "../hooks/useTask";
import { useTheme } from "../providers/ThemeProvider";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";

const MainLayout = () => {
  const { theme, setTheme } = useTheme();
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

  // handle theme
  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

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
    <div className='bg-white dark:bg-gray-900'>
      <div className='container mx-auto px-2.5 py-4 md:py-8 lg:py-12 lg:px-8'>
        <header className='flex flex-col gap-4 sm:flex-row justify-between items-center mx-4 px-4 rounded-lg py-4 bg-gray-200 dark:bg-gray-800 dark:text-white'>
          <div className='flex justify-between items-center w-full'>
            <Link to="/" className="flex items-center gap-1">
              <img src="/logo.svg" alt="logo" className="w-8" />
              <h1 className='text-center text-3xl font-bold'>todos</h1>
            </Link>
            <div>
              <button
                onClick={handleTheme}
                className='flex justify-center items-center text-2xl cursor-pointer'
              >
                {theme === "light" ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
          <nav className='flex justify-center items-center'>
            {user ? (
              <div className='flex gap-4'>
                <div
                  onClick={() => setIsOpen(true)}
                  className='bg-blue-600 text-white text-center py-1 rounded-md cursor-pointer w-24'
                >
                  Add Task
                </div>
                <button
                  onClick={logout}
                  className='px-4 py-1 bg-red-500 text-white rounded-lg cursor-pointer'
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleGoogleLogin}
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer flex items-center gap-2'
                >
                  <FaGoogle />
                  Login
                </button>
              </div>
            )}
          </nav>
        </header>
        <main className="h-screen">
          <Outlet />
          {/* Modal */}
          {isOpen && (
            <div className='fixed inset-0 flex justify-center items-center bg-gray-900/60'>
              <div
                ref={modalRef}
                className='p-6 bg-white dark:bg-gray-600 dark:text-white rounded-lg shadow-lg w-[300px] sm:w-[400px] md:w-[500px]'
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

        <footer className='bg-gray-200 rounded-lg shadow-lg m-4 dark:bg-gray-800'>
          <div className='p-3 text-center'>
            <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
              © 2023 Task Manager. All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
