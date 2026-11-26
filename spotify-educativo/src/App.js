import React from 'react';
import SearchBar from './components/SearchBar';
import Ranking from './components/Ranking';
import Recommendations from './components/Recommendations';
import './styles/main.scss';

function App() {
  return (
    <div className="dashboard">
      <header className="header">
        <h1>Spotify</h1>
        <p>Sumérgete en la música y descubre a tus artistas favoritos.</p>
      </header>

      <div className="grid-container">
        <div>
          <SearchBar />
          <Recommendations />
        </div>
        <div>
          <Ranking />
        </div>
      </div>
    </div>
  );
}

export default App;