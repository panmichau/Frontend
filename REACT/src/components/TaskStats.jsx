function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={{ 
      border: '1px solid #eee', 
      padding: '10px', 
      borderRadius: '5px', 
      marginBottom: '15px',
      backgroundColor: '#f9f9f9',
      fontSize: '0.9em'
    }}>
      <strong>Statystyki:</strong><br />
      Wszystkie: {total} | Zrobione: {completed} | Zostało: {remaining}<br />
      Postęp: <strong>{percentage}%</strong>
    </div>
  );
}

export default TaskStats;
