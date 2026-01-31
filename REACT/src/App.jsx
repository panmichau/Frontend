import { useState, useEffect } from 'react';
import { tasksApi } from './api/tasksApi';
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Card from "./components/Card";
import FilterButtons from "./components/FilterButtons";
import TaskStats from "./components/TaskStats";
import AddTask from "./components/AddTask";
import QuoteOfTheDay from "./components/QuoteOfTheDay";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await tasksApi.fetchTasks();
        setTasks(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    tasksApi.saveTasks(tasks);
  }, [tasks, isLoading]);

  const addTask = (title, category) => {
    setTasks([...tasks, { id: Date.now(), title, completed: false, priority: "medium", category }]);
  };

  const priorityMap = { high: 3, medium: 2, low: 1 };

  const filteredAndSortedTasks = tasks
    .filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .filter(t => categoryFilter === 'all' || t.category === categoryFilter)
    .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'priority') return priorityMap[b.priority] - priorityMap[a.priority];
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="App">
      <Header />
      <Card title="Menedżer Zadań Pro">
        <QuoteOfTheDay />
        <AddTask onAdd={addTask} />
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Szukaj..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '8px', flexGrow: 1 }}
          />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ padding: '8px' }}>
            <option value="all">Wszystkie kategorie</option>
            <option value="Praca">Praca</option>
            <option value="Dom">Dom</option>
            <option value="Zakupy">Zakupy</option>
            <option value="Inne">Inne</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px' }}>
            <option value="default">Sortowanie: domyślne</option>
            <option value="priority">Sortowanie: priorytet</option>
            <option value="alphabetical">Sortowanie: A-Z</option>
          </select>
        </div>

        <TaskStats tasks={tasks} />
        <FilterButtons activeFilter={filter} setFilter={setFilter} />

        {isLoading ? (
          <p>Ładowanie...</p>
        ) : filteredAndSortedTasks.length === 0 ? (
          <p>Nie znaleziono zadań dla podanych kryteriów.</p>
        ) : (
          <TaskList 
            tasks={filteredAndSortedTasks} 
            onDelete={(id) => setTasks(tasks.filter(t => t.id !== id))} 
            onToggle={(id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))}
            onChangePriority={(id, p) => setTasks(tasks.map(t => t.id === id ? { ...t, priority: p } : t))} 
          />
        )}
      </Card>
    </div>
  );
}

export default App;
