import React, { useState } from 'react';
import { songTrie } from '../data';

export default function SearchBar() {
  const [prefix, setPrefix] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setPrefix(value);
    if (value.length > 0) {
      setSuggestions(songTrie.getSuggestions(value));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="card">
      <h2>Buscador</h2>
      <input 
        type="text" 
        className="search-box" 
        placeholder="Escribe el nombre de una canción..." 
        value={prefix} 
        onChange={handleSearch} 
      />
      <ul className="suggestion-list">
        {suggestions.map(song => (
          <li key={song.id}>
            <span>{song.title}</span>
            <span className="artist">{song.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}