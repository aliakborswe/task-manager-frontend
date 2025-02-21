/* eslint-disable react/prop-types */
import {  FaEdit,  } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import useTask from "../hooks/useTask";
import Swal from "sweetalert2";
const TaskCard = ({ task }) => {
  const { deleteTask, updateTask } = useTask();
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.split("T")[0] : ""
  );

  // Function to update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate };

    // SweetAlert Confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      await updateTask(task._id, taskData);

      Swal.fire({
        title: "Updated!",
        text: "Your task has been updated successfully.",
        icon: "success",
      });

      setIsOpen(false); // Close modal after updating
    }
  };
  //   Function to delete task
  const handleDelete = (id) => {
    deleteTask(id);
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
    <div className='p-2 flex justify-between gap-2'>
      <div className='w-full space-y-1 text-base'>
        <h3 className='font-bold text-gray-900 dark:text-white'>{task.title}</h3>
        {task.description && (
          <p className='text-sm text-gray-700 dark:text-gray-400'>{task.description}</p>
        )}
        {task.dueDate && (
          <p
            className={`text-sm ${
              isOverdue ? "text-red-400 font-bold" : "text-gray-500 dark:text-gray-300"
            }`}
          >
            Due: {format(new Date(task.dueDate), "PPP")}
          </p>
        )}
      </div>
      <div className='flex flex-col items-center justify-between text-lg'>
        <div
          onClick={() => setIsOpen(true)}
          className='cursor-pointer text-blue-500'
        >
          <FaEdit />
        </div>
        <div
          onClick={() => handleDelete(task._id)}
          className='cursor-pointer text-red-500'
        >
          <FaDeleteLeft />
        </div>
      </div>
      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/60'>
          <div
            ref={modalRef}
            className='p-6 bg-white dark:bg-gray-600 dark:text-white rounded-lg shadow-lg w-[300px] sm:w-[400px] md:w-[500px]'
          >
            <form onSubmit={handleSubmit}>
              <label className='block text-gray-700 dark:text-gray-300'>
                Title
              </label>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
