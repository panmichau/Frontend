function Header() {
  const date = new Date().toLocaleDateString();

  return (
    <header style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <h1> 📋 Menedżer Zadań</h1>
      <p>Dzisiejsza data: {date}</p>
    </header>
  );
}

export default Header;
