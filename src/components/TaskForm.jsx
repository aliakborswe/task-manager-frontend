/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const TaskForm = ({ task, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.split("T")[0] : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate };

    if (task) {
      await axios.put(`http://localhost:5000/tasks/${task._id}`, taskData);
    } else {
      await axios.post("http://localhost:5000/tasks", taskData);
    }

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg'
    >
      <label className='block text-gray-700 dark:text-gray-300'>Title</label>
      <input
        type='text'
        className='w-full p-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label className='block mt-2 text-gray-700 dark:text-gray-300'>
        Description
      </label>
      <textarea
        className='w-full p-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className='block mt-2 text-gray-700 dark:text-gray-300'>
        Due Date
      </label>
      <input
        type='date'
        className='w-full p-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md'
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button
        type='submit'
        className='mt-4 w-full p-2 bg-purple-500 text-white rounded-md'
      >
        {task ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
