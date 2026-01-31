function Card({ children, title, className = "" }) {
  return (
    <div className={`card ${className}`} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
      {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
      {children}
    </div>
  );
}

export default Card;
