import React, { useState } from 'react';
import { songGraph, allSongs } from '../data';

export default function Recommendations() {
  const [selectedSong, setSelectedSong] = useState(allSongs[0]);

  const relatedIds = songGraph.getRecommendations(selectedSong.id);
  
  const relatedSongs = relatedIds.map(id => allSongs.find(s => s.id === id));

  return (
    <div className="card">
      <h2>Canciones Relacionadas</h2>
      <p style={{ color: '#b3b3b3', marginBottom: '15px' }}>
        Basado en: <strong>{selectedSong.title}</strong>
      </p>
      
      {relatedSongs.length === 0 ? (
        <p>No hay recomendaciones para esta canción.</p>
      ) : (
        relatedSongs.map(song => (
          <div key={song.id} className="recommendation">
            <strong>{song.title}</strong> - {song.artist}
          </div>
        ))
      )}

      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>Simular reproducir otra canción:</p>
        {allSongs.map(song => (
          <button 
            key={song.id} 
            onClick={() => setSelectedSong(song)}
            style={{ marginRight: '10px', marginBottom: '10px', fontSize: '0.8rem' }}
          >
            {song.title}
          </button>
        ))}
      </div>
    </div>
  );
}