import { useContext } from 'react';
import { TaskContext } from '../providers/TaskProvider';

const useTask = () => {
   const context = useContext(TaskContext);
       return context
};

export default useTask;