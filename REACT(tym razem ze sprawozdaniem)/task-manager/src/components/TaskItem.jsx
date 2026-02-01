import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onChangePriority, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (editText.trim().length >= 3) {
      onUpdate(task.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(task.title);
      setIsEditing(false);
    }
  };

  const getBadgeStyle = (category) => {
    const colors = {
      Praca: '#ff4757',   
      Dom: '#2ed573',     
      Zakupy: '#1e90ff',  
      Inne: '#747d8c'     
    };
    return {
      fontSize: '10px',
      padding: '2px 8px',
      backgroundColor: colors[category] || '#747d8c',
      borderRadius: '10px',
      marginLeft: '10px',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      textTransform: 'uppercase'
    };
  };

  return (
    <li className="task-item" style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
      {isEditing ? (
        <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
          <input 
            type="text" 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{ flex: 1, padding: '5px' }}
          />
          <button onClick={handleSave} style={{ backgroundColor: '#4CAF50', color: 'white' }}>Zapisz</button>
          <button onClick={() => setIsEditing(false)}>Anuluj</button>
        </div>
      ) : (
        <>
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggle(task.id)} 
          />

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginLeft: '10px', overflow: 'hidden' }}>
            <span style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {task.title}
            </span>
            
            <span style={getBadgeStyle(task.category)}>
              {task.category || 'Inne'}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <select 
              value={task.priority} 
              onChange={(e) => onChangePriority(task.id, e.target.value)}
              style={{ fontSize: '12px' }}
            >
              <option value="high">Wysoki</option>
              <option value="medium">Średni</option>
              <option value="low">Niski</option>
            </select>

            <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Edytuj</button>
            <button className="delete-btn" onClick={() => onDelete(task.id)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Usuń</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;