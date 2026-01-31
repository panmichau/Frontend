import { useState, useEffect } from 'react';

function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) throw new Error('Błąd pobierania');
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (loading) return <p style={{ fontSize: '0.8em' }}>Ładowanie cytatu...</p>;
  if (error) return (
    <p style={{ fontSize: '0.8em', color: 'red' }}>
      Nie udało się pobrać cytatu. <button onClick={fetchQuote}>Spróbuj ponownie</button>
    </p>
  );

  return (
    <div style={{ fontStyle: 'italic', marginBottom: '20px', padding: '10px', backgroundColor: '#f0f4f8', borderRadius: '8px' }}>
      <p>"{quote.quote}"</p>
      <small>- {quote.author}</small>
      <br />
      <button onClick={fetchQuote} style={{ marginTop: '5px', fontSize: '0.7em', cursor: 'pointer' }}>Nowy cytat</button>
    </div>
  );
}

export default QuoteOfTheDay;
