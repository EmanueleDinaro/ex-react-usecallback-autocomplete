import { useEffect, useState, useCallback } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);

  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }

  const handleSearch = (value) => {
    setQuery(value);
    debouncedSearch(value);
  };

  const debouncedSearch = debounce(() => {
    setDebouncedQuery(query);
  }, 1000);

  useEffect(() => {
    fetch(`http://localhost:3333/products?search=${query}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err));
  }, [debouncedQuery]);

  return (
    <>
      <div>
        <h1>Cerca Prodotti</h1>
        <input
          type="text"
          placeholder="Cerca..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div>
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <strong>{result.brand}</strong>
              <span> {result.name}</span>
              <span> - {result.price}€</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

// Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
// Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
// Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
// Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.

// Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.
