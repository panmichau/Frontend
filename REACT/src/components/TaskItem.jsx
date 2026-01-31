function TaskItem({ id, title, completed, priority, category, onDelete, onToggle, onChangePriority }) {
  const categoryColors = {
    Praca: '#e3f2fd',
    Dom: '#f3e5f5',
    Zakupy: '#fff3e0',
    Inne: '#f5f5f5'
  };

  return (
    <li style={{ 
      listStyle: 'none', margin: '10px 0', display: 'flex', gap: '10px', alignItems: 'center',
      borderBottom: '1px solid #eee', paddingBottom: '5px' 
    }}>
      <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ textDecoration: completed ? 'line-through' : 'none', fontWeight: priority === 'high' ? 'bold' : 'normal' }}>
          {title}
        </span>
        <span style={{ 
          fontSize: '0.7em', padding: '2px 6px', borderRadius: '10px', 
          backgroundColor: categoryColors[category] || '#eee', width: 'fit-content' 
        }}>
          {category}
        </span>
      </div>

      <select value={priority} onChange={(e) => onChangePriority(id, e.target.value)} style={{ fontSize: '0.8em' }}>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>
      
      <button onClick={() => onDelete(id)} style={{ color: 'red', cursor: 'pointer' }}>Usuń</button>
    </li>
  );
}

export default TaskItem;
