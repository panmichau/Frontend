function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;
  
  const percentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <div className="task-stats" style={{ marginTop: '20px', padding: '10px', borderTop: '1px solid #eee' }}>
      <h4>Statystyki:</h4>
      <ul>
        <li>Łącznie zadań: {totalTasks}</li>
        <li>Ukończone: {completedTasks}</li>
        <li>Pozostało: {remainingTasks}</li>
        <li>Procent ukończenia: {percentage}%</li>
      </ul>
    </div>
  );
}

export default TaskStats;