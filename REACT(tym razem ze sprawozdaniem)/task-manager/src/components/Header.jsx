function Header() {
  return (
    <header className="header">
      <h1>📋 Menedżer Zadań</h1>
      <p>Data: {new Date().toLocaleDateString()}</p>
    </header>
  );
}

export default Header;