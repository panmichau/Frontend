import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("Inne");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: title,
      priority: priority,
      category: category, 
      completed: false
    };

    onAddTask(newTask);
    setTitle("");
    setPriority("medium");
    setCategory("Inne"); 
  };

  return (
    <form onSubmit={handleSubmit} className="task-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f0f0f0', padding: '10px' }}>
      <input 
        type="text"
        placeholder="Tytuł zadania..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">Wysoki</option>
        <option value="medium">Średni</option>
        <option value="low">Niski</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Praca">Praca</option>
        <option value="Dom">Dom</option>
        <option value="Zakupy">Zakupy</option>
        <option value="Inne">Inne</option>
      </select>

      <button type="submit">Dodaj zadanie</button>
    </form>
  );
}

export default TaskForm;