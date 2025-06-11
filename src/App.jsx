import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (value) => setQuery(value);

  useEffect(() => {
    fetch(`http://localhost:3333/products?search=${query}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err));
  }, [query]);

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

/*Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti
Crea un campo di input (<input type="text">) in cui l’utente può digitare.

Effettua una chiamata API a: 
/products?search=[query]

La query deve essere sostituita con il testo digitato.
Mostra i risultati API sotto l'input in una tendina di suggerimenti.

Se l'utente cancella il testo, la tendina scompare.


Obiettivo: Mostrare suggerimenti dinamici in base alla ricerca dell'utente.*/
