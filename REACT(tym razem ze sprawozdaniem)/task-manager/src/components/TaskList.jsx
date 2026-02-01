import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete, onChangePriority, onUpdate}) {
  if (tasks.length === 0) return <p>Brak zadań.</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete}
          onChangePriority={onChangePriority} 
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default TaskList;