import React, { useState } from 'react';
import { songHeap } from '../data';

export default function Ranking() {
  const [topSongs] = useState(songHeap.getTopK(5));

  return (
    <div className="card">
      <h2>Top 5 Canciones Populares</h2>
      {topSongs.map((song, index) => (
        <div key={song.id} className="rank-item">
          <div className="position">#{index + 1}</div>
          <div className="song-info">
            <div className="title">{song.title}</div>
            <div className="plays">{song.plays.toLocaleString()} reproducciones</div>
          </div>
        </div>
      ))}
    </div>
  );
}