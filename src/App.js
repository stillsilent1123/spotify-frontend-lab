import React, { useState } from 'react';
import './App.css';
import SongList from './components/SongList';
import Player from './components/Player';
import Playlist from './components/Playlist';
import Auth from './components/Auth';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null);
  const [currentSongUrl, setCurrentSongUrl] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return showRegister ? (
      <Register onRegister={() => setShowRegister(false)} onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Auth onAuth={setUser} onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="App" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: 'linear-gradient(135deg, #1db954 0%, #191414 100%)', minHeight: '100vh', color: '#fff', padding: '0', margin: '0' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', background: 'rgba(25,20,20,0.95)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}>
        <h1 style={{ margin: 0, fontWeight: 700, fontSize: '2.2rem', letterSpacing: '2px', color: '#1db954', textShadow: '0 2px 8px rgba(30,185,84,0.10)' }}>Spotify MVP</h1>
        <button onClick={() => { setUser(null); localStorage.removeItem('jwt'); }} style={{ background: '#1db954', color: '#fff', border: 'none', borderRadius: '20px', padding: '0.5rem 1.5rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 2px 8px rgba(30,185,84,0.10)' }}>Logout</button>
      </header>
      <main style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '2rem', padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ flex: 2, background: 'rgba(34,34,34,0.93)', borderRadius: '18px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
          <SongList onPlay={setCurrentSongUrl} />
        </section>
        <aside style={{ flex: 1, background: 'rgba(34,34,34,0.88)', borderRadius: '18px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
          <Playlist />
        </aside>
      </main>
      <footer style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: 'rgba(25,20,20,0.98)', padding: '1rem 0', boxShadow: '0 -2px 8px rgba(0,0,0,0.18)', borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Player url={currentSongUrl} />
        </div>
      </footer>
    </div>
  );
}

export default App;
