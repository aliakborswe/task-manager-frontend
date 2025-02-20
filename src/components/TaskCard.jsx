/* eslint-disable react/prop-types */
import {  FaEdit,  } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import useTask from "../hooks/useTask";
const TaskCard = ({ task }) => {
    const {deleteTask} = useTask();
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
      const [title, setTitle] = useState(task?.title || "");
      const [description, setDescription] = useState(task?.description || "");
      const [dueDate, setDueDate] = useState(
        task?.dueDate ? task.dueDate.split("T")[0] : ""
      );
      const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description, dueDate };

        console.log("from card", taskData);

      };

      const handleDelete = (id)=>{
        deleteTask(id);
      }


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
    <div
      className={`p-2 flex justify-between gap-2 rounded-lg shadow-md ${
        isOverdue ? "border-red-500 border-2" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className='w-full'>
        <h3 className='font-bold text-gray-900'>{task.title}</h3>
        {task.description && (
          <p className='text-sm text-gray-700 '>{task.description}</p>
        )}
        {task.dueDate && (
          <p
            className={`text-sm ${
              isOverdue ? "text-red-500 font-bold" : "text-gray-500"
            }`}
          >
            Due: {format(new Date(task.dueDate), "PPP")}
          </p>
        )}
      </div>
      <div className='flex flex-col items-center justify-between'>
        <div onClick={() => setIsOpen(true)}>
          <FaEdit />
        </div>
        <div onClick={()=>handleDelete(task._id)}>
          <FaDeleteLeft />
        </div>
      </div>
      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/70'>
          <div
            ref={modalRef}
            className='bg-white p-6 rounded-lg shadow-lg w-96'
          >
            <form
              onSubmit={handleSubmit}
              className='p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg'
            >
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
