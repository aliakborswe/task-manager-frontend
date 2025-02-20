/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";


// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic()
  const [data, setData] = useState([])
  console.log("from data",tasks)

    //   get user from db
    useEffect(() => {
      if (!user?.email) return;

      const fetchUser = async () => {
        try {
          const res = await axiosPublic.get(`/users/${user?.email}`);
          setData(res.data);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };

      fetchUser();
    }, [user?.email, axiosPublic]);

  // Fetch tasks from backend
useEffect(() => {
  if (user && data?._id) {
    // Ensure data._id is available
    const fetchTasks = async () => {
      try {
        const res = await axiosPublic.get(`/tasks/${data._id}`);
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }
}, [user, data]);



  
// add task
   const addTask = async (task) => {
     try {
       const res = await axiosPublic.post("tasks", {
         ...task,
         userId: data._id,
       });
       toast.success("Task added successfully");
       setTasks([...tasks, res.data]);
     } catch (err) {
       toast.error(err.message); 
     }
   };

    const updateTask = async (id, updates) => {
      try {
        await axiosPublic.put(`tasks/${id}`, updates);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, ...updates } : task
          )
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };

    const deleteTask = async (id) => {
      try {
        await axiosPublic.delete(`tasks/${id}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };

  const taskValue = {
    tasks,
    addTask,
    updateTask,
    deleteTask
  };
  return (
    <TaskContext.Provider
      value={taskValue}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider