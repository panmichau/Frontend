function FilterButtons({ currentFilter, onFilterChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="filter-buttons" style={{ marginBottom: '15px', display: 'flex', gap: '5px' }}>
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          style={{
            backgroundColor: currentFilter === f ? '#4a90e2' : '#ccc',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            textTransform: 'capitalize'
          }}
        >
          {f === "all" ? "Wszystkie" : f === "active" ? "Aktywne" : "Zakończone"}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;