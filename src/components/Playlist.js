import React, { useState } from 'react';

function Playlist() {
  const [playlists] = useState([
    { id: 1, name: 'My Playlist', songs: ['Children', 'Sample MP3'] }
  ]);

  return (
    <div>
      <h2 style={{ color: '#1db954', fontWeight: 600, fontSize: '1.3rem', marginBottom: '1.2rem' }}>Playlists</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {playlists.map(pl => (
          <li key={pl.id} style={{
            background: 'rgba(40,40,40,0.92)',
            borderRadius: '10px',
            marginBottom: '1.1rem',
            padding: '1rem 1.2rem',
            boxShadow: '0 1px 6px rgba(0,0,0,0.10)'
          }}>
            <div style={{ fontWeight: 500, color: '#fff', fontSize: '1.08rem' }}>{pl.name}</div>
            <div style={{ color: '#aaa', fontSize: '0.98rem', marginTop: '0.5rem' }}>
              {pl.songs.length > 0 ? pl.songs.join(', ') : 'No songs yet.'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
