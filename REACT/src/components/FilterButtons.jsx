function FilterButtons({ activeFilter, setFilter }) {
  const buttonStyle = (filterName) => ({
    padding: '5px 10px',
    cursor: 'pointer',
    fontWeight: activeFilter === filterName ? 'bold' : 'normal',
    backgroundColor: activeFilter === filterName ? '#ddd' : '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px'
  });

  return (
    <div style={{ margin: '15px 0', display: 'flex', gap: '10px' }}>
      <button style={buttonStyle('all')} onClick={() => setFilter('all')}>
        Wszystkie
      </button>
      <button style={buttonStyle('active')} onClick={() => setFilter('active')}>
        Do zrobienia
      </button>
      <button style={buttonStyle('completed')} onClick={() => setFilter('completed')}>
        Ukończone
      </button>
    </div>
  );
}

export default FilterButtons;
