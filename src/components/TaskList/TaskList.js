import Task from '../Task/Task'
import './TaskList.css';

function TaskList({ tasks, status, deleteTask }) {
  return (
    <section className={`${status}-tasks`}>
        <h2 className="heading">Tasks to do:</h2>
        <ul className="task-list">
            { tasks.map(task => 
              <Task 
                id={ task.taskId} 
                text={ task.description} 
                key={ task.taskId } 
                complete={ task.completed }
                deleteTask={ deleteTask }/>)}
        </ul>
    </section>
  );
}

export default TaskList;