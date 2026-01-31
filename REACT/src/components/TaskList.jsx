import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle, onChangePriority }) {
  if (tasks.length === 0) {
    return <p>Brak zadań do wyświetlenia. Odpocznij! 😊</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          id={task.id}
          title={task.title}
          completed={task.completed}
          priority={task.priority}
          onDelete={onDelete}
          onToggle={onToggle}
          onChangePriority={onChangePriority}
        />
      ))}
    </div>
  );
}

export default TaskList;
