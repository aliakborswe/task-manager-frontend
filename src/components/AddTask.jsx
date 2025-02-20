import { useState } from "react";
import useTask from "../hooks/useTask";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddTask = () => {
  const { addTask } = useTask();
  const navigate = useNavigate()

  // State to store form data
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

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
      toast.success("Task added successfully");
      setTask({ title: "", description: "", dueDate: "" }); 
      navigate("/");
    } catch (err) {
      toast.error(err.message); 
    }
  };

  return (
    <div className='container px-4 mx-auto'>
      <form
        onSubmit={handleSubmit}
        className='p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg'
      >
        <label className='block text-gray-700 dark:text-gray-300'>Title</label>
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
  );
};

export default AddTask;
