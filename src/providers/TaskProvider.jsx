/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();
const socket = io("http://localhost:8000");

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();
  console.log("from data", tasks);



  // Fetch tasks from backend
  useEffect(() => {
    if (!user?.uid) return;

    const fetchTasks = async () => {
      try {
        const res = await axiosPublic.get(`/tasks/${user?.uid}`);
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();

    socket.on("taskAdded", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        )
      );
    });

    socket.on("taskDeleted", (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, [user]);

  // add task
  const addTask = async (task) => {
    try {
      const res = await axiosPublic.post("tasks", {
        ...task,
        uid: user.uid,
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
    deleteTask,
  };
  return (
    <TaskContext.Provider value={taskValue}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
