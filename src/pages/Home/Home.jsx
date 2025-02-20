import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useTask from "../../hooks/useTask";
import TaskCard from "../../components/TaskCard";


const Home = () => {
  const { tasks, updateTask, setTasks } = useTask();



  const categories = ["To-Do", "In Progress", "Done"];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Reordering within the same category
    if (source.droppableId === destination.droppableId) {
      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);
      setTasks(updatedTasks);
    }
    // Moving to a different category
    else {
      const updatedTasks = tasks.map((task) => {
        if (task._id === result.draggableId) {
          return { ...task, category: destination.droppableId };
        }
        return task;
      });

      setTasks(updatedTasks);
      updateTask(result.draggableId, { category: destination.droppableId });
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
                className='bg-gray-100 p-4 rounded-lg shadow-lg'
              >
                <h2 className='text-xl font-bold mb-3'>{category}</h2>
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
                          className='bg-white p-3 mb-2 rounded-lg shadow-lg'
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
