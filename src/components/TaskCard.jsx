/* eslint-disable react/prop-types */
import {  FaEdit,  } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { format } from "date-fns";
const TaskCard = ({ task }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  

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
      <div className="flex flex-col items-center justify-between">
        <div>
          <FaEdit />
        </div>
        <div>
          <FaDeleteLeft />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
