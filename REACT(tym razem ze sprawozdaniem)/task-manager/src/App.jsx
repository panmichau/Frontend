import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Card from './components/Card';
import TaskStats from './components/TaskStats';
import FilterButtons from './components/FilterButtons'; 
import TaskForm from './components/TaskForm';
import QuoteOfTheDay from './components/QuoteOfTheDay';
import { fetchTasks, saveTasks } from './api/tasksApi';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  
  const [categoryFilter, setCategoryFilter] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState("");         
  const [sortBy, setSortBy] = useState("default");           

  const [isLoading, setIsLoading] = useState(true); 
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTasks().then(data => {
      setTasks(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const controller = new AbortController();
    setIsSaving(true);
    saveTasks(tasks, controller.signal)
      .then(() => setIsSaving(false))
      .catch(err => {
        if (err.name !== 'AbortError') setIsSaving(false);
      });
    return () => controller.abort();
  }, [tasks, isLoading]);

  const addTask = (newTask) => setTasks([...tasks, newTask]);
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const changePriority = (id, prio) => setTasks(tasks.map(t => t.id === id ? { ...t, priority: prio } : t));
  const updateTask = (id, title) => setTasks(tasks.map(t => t.id === id ? { ...t, title } : t));
  const clearAllTasks = () => window.confirm("Usunąć wszystko?") && setTasks([]);

  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesStatus = filter === "all" || (filter === "active" && !task.completed) || (filter === "completed" && task.completed);
      const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const p = { high: 1, medium: 2, low: 3 };
        return p[a.priority] - p[b.priority];
      }
      if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="app">
      <Header />
      <QuoteOfTheDay />
      
      <Card title="Moja Lista" className="task-card">
        <TaskForm onAddTask={addTask} />
        
        <input 
          type="text" 
          placeholder="🔍 Szukaj zadania..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' }}
        />

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ flex: 1, padding: '5px' }}
          >
            <option value="all">Wszystkie kategorie</option>
            <option value="Praca">Praca</option>
            <option value="Dom">Dom</option>
            <option value="Zakupy">Zakupy</option>
            <option value="Inne">Inne</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ flex: 1, padding: '5px' }}
          >
            <option value="default">Sortuj: domyślnie</option>
            <option value="priority">Sortuj: priorytet</option>
            <option value="alphabetical">Sortuj: alfabetycznie</option>
          </select>
        </div>

        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
        
        {isLoading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>⏳ Pobieranie zadań...</div>
        ) : (
          <>
            <TaskList 
              tasks={filteredAndSortedTasks} 
              onToggle={toggleTask} 
              onDelete={deleteTask}
              onChangePriority={changePriority}
              onUpdate={updateTask} 
            />
            {filteredAndSortedTasks.length === 0 && (
              <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                {searchQuery ? `Nie znaleziono zadań dla frazy "${searchQuery}"` : "Brak zadań w tej kategorii"}
              </p>
            )}
          </>
        )}

        <div style={{ minHeight: '20px', marginTop: '10px' }}>
          {isSaving && <small style={{ color: '#2196F3' }}>☁️ Zapisywanie zmian...</small>}
        </div>

        <TaskStats tasks={tasks} /> 
        
        <button 
          onClick={clearAllTasks} 
          style={{ marginTop: '20px', width: '100%', backgroundColor: '#333', color: 'white', cursor: 'pointer' }}
        >
          Wyczyść wszystko
        </button>
      </Card>
    </div>
  );
}

export default App;