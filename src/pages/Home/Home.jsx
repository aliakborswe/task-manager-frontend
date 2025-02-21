import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useTask from "../../hooks/useTask";
import TaskCard from "../../components/TaskCard";


const Home = () => {
  const { tasks, updateTask, setTasks } = useTask();


  const categories = ["To-Do", "In Progress", "Done"];


const handleDragEnd = (result) => {
  if (!result.destination) return;

  const { source, destination } = result;

  // Clone tasks to avoid mutating state directly
  const updatedTasks = Array.from(tasks);

  // Reordering within the same category
  if (source.droppableId === destination.droppableId) {
    const filteredTasks = updatedTasks.filter(
      (task) => task.category === source.droppableId
    );
    const [movedTask] = filteredTasks.splice(source.index, 1);
    filteredTasks.splice(destination.index, 0, movedTask);

    // Reintegrate reordered tasks into the full list
    const finalTasks = updatedTasks.map((task) =>
      task.category === source.droppableId
        ? filteredTasks.find((t) => t._id === task._id) || task
        : task
    );

    setTasks(finalTasks);
  }
  // Moving to a different category
  else {
    const updatedTaskIndex = updatedTasks.findIndex(
      (task) => task._id === result.draggableId
    );

    if (updatedTaskIndex !== -1) {
      updatedTasks[updatedTaskIndex] = {
        ...updatedTasks[updatedTaskIndex],
        category: destination.droppableId,
      };
      setTasks(updatedTasks);

      // Persist category change in the backend
      updateTask(result.draggableId, { category: destination.droppableId });
    }
  }
};

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 p-4'>
      <DragDropContext onDragEnd={handleDragEnd}>
        {categories.map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='bg-gray-200 dark:bg-gray-600 dark:text-white p-4 rounded-lg shadow-lg'
              >
                <h2 className='text-xl font-bold mb-4 border-b-2 pb-1 border-dashed'>{category}</h2>
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
                          <TaskCard task={task}  />
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
