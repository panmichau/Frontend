import { useState, useEffect } from 'react';

function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      
      if (!response.ok) throw new Error("Błąd sieci");
      
      const data = await response.json();
      
      setQuote({ text: data.quote, author: data.author });
    } catch (err) {
      console.error("Szczegóły błędu:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (loading) return <p style={{ padding: '10px' }}>⏳ Ładowanie cytatu...</p>;
  
  if (error) return (
    <div style={{ padding: '10px', color: '#ff4d4d' }}>
      ❌ Nie udało się pobrać cytatu (CORS).
      <button onClick={fetchQuote} style={{ marginLeft: '10px' }}>Ponów próbę</button>
    </div>
  );

  return (
    <div style={{ 
      margin: '15px 0', 
      padding: '15px', 
      backgroundColor: '#9b9ba1', 
      color: 'white',
      borderRadius: '4px'
    }}>
      <p style={{ margin: '0 0 10px 0', fontStyle: 'italic' }}>"{quote.text}"</p>
      <strong style={{ fontSize: '12px' }}>— {quote.author}</strong>
      
      <button 
        onClick={fetchQuote} 
        style={{ 
          display: 'block', 
          marginTop: '10px', 
          fontSize: '11px',
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid white',
          color: 'white'
        }}
      >
        Nowy cytat
      </button>
    </div>
  );
}

export default QuoteOfTheDay;