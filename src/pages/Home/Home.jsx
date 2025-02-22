import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useTask from "../../hooks/useTask";
import TaskCard from "../../components/TaskCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const Home = () => {
  const { tasks, setTasks } = useTask();
  const axiosPublic = useAxiosPublic();

  const categories = ["To-Do", "In Progress", "Done"];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const fromStatus = result.source.droppableId;
    const toStatus = result.destination.droppableId;
    const taskId = result.draggableId;
    const oldIndex = result.source.index;
    const newIndex = result.destination.index;

    // Create a deep copy of tasks to prevent direct mutation
    let updatedTasks = [...tasks.map((task) => ({ ...task }))];

    if (fromStatus === toStatus) {
      // Find and remove the moved task
      const movedTask = updatedTasks.find((task) => task._id === taskId);
      updatedTasks = updatedTasks.filter((task) => task._id !== taskId);

      // Insert task into the new position
      updatedTasks.splice(newIndex, 0, movedTask);
    } else {
      // Find the dragged task and update its category
      updatedTasks = updatedTasks.map((task) =>
        task._id === taskId ? { ...task, category: toStatus } : task
      );
    }

    // Optimistically update the UI
    setTasks(updatedTasks);

    // Send request to update backend
    axiosPublic
      .put("/tasks/reorder", {
        taskId,
        newCategory: toStatus,
        oldCategory: fromStatus,
        newIndex,
        oldIndex,
      })
      .catch((err) => {
        toast.error(`Error updating task order: ${err.message}`);
        // Revert changes if API request fails
        setTasks(tasks);
      });
  };

  // const handleDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const fromStatus = result.source.droppableId;
  //   const toStatus = result.destination.droppableId;
  //   const taskId = result.draggableId;
  //   console.log(fromStatus, toStatus, taskId);

  //   const oldIndex = result.source.index;

  //   if(fromStatus === toStatus) {
  //   const movedTask = tasks.find((task) => task._id === result.draggableId);

  //   const newTasks = [...tasks];

  //   // Remove the task from the source position
  //   newTasks.splice(result.source.index, 1);

  //   // Insert it into the new position
  //   newTasks.splice(result.destination.index, 0, movedTask);
  //   const currentTaskIndex = newTasks.findIndex(
  //     (task) => task._id === result.draggableId
  //   );
  //   console.log(currentTaskIndex, oldIndex);

  //   setTasks([...newTasks]); // Optimistic update for better UX
  //   axiosPublic.put("/tasks/reorder", {
  //     taskId,
  //     newCategory: toStatus,
  //     oldCategory: fromStatus,
  //     newIndex: currentTaskIndex,
  //     oldIndex,
  //   });
  //   }else{
  //     const updatedTaskIndex = tasks.findIndex(
  //       (task) => task._id === result.draggableId
  //     );

  //     if (updatedTaskIndex !== -1) {
  //       const updatedTask = {
  //         ...tasks[updatedTaskIndex],
  //         category: toStatus,
  //       };

  //       const newTasks = [...tasks];
  //       newTasks[updatedTaskIndex] = updatedTask;
  //       const currentTaskIndex = newTasks.findIndex(
  //         (task) => task._id === result.draggableId
  //       );
  //       console.log(currentTaskIndex, oldIndex);

  //       setTasks(newTasks); // Optimistic update for better UX
  //       axiosPublic.put("/tasks/reorder", {
  //         taskId,
  //         newCategory: toStatus,
  //         oldCategory: fromStatus,
  //         newIndex: currentTaskIndex,
  //         oldIndex,
  //       });

  //     }
  //   }

  // };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 '>
      <DragDropContext onDragEnd={handleDragEnd}>
        {categories.map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-gray-200 dark:bg-gray-600 dark:text-white p-4 rounded-lg shadow-lg  ${
                  category === "In Progress"
                    ? "text-blue-600 dark:text-blue-500"
                    : category === "Done"
                    ? "text-green-600 dark:text-green-500"
                    : " "
                }`}
              >
                <h2 className='text-xl font-bold mb-4 border-b-2 pb-1 border-dashed'>
                  {category}
                </h2>
                {tasks
                  .filter((task) => task.category === category)
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='bg-white dark:bg-gray-800 p-3 mb-2 rounded-lg shadow-lg'
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Home;
