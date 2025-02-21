/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();
const socket = io("http://localhost:8000");

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();



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
      await axiosPublic.post("tasks", {
        ...task,
        uid: user?.uid,
      });
      toast.success("Task added successfully");
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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosPublic.delete(`tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

      Swal.fire({
        title: "Deleted!",
        text: "Your task has been deleted.",
        icon: "success",
      });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to delete the task. Please try again.",
      icon: "error",
    });
  }
};

  const taskValue = {
    tasks,
    addTask,
    setTasks,
    updateTask,
    deleteTask,
  };
  return (
    <TaskContext.Provider value={taskValue}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
