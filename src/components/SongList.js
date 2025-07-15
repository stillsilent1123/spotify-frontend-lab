import React, { useState, useEffect } from 'react';

function SongList({ onPlay }) {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) return;
    const apiUrl = process.env.REACT_APP_API_URL + '/api/songs';
    const headers = new Headers();
    headers.set('Authorization', 'Bearer ' + token);
    console.log('Fetching songs from:', apiUrl);
    fetch(apiUrl, { headers })
      .then(res => res.json())
      .then(setSongs)
      .catch(() => setSongs([]));
  }, []);

  const filteredSongs = songs
    .filter(song =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'title') {
        cmp = a.title.localeCompare(b.title);
      } else if (sortBy === 'artist') {
        cmp = a.artist.localeCompare(b.artist);
      }
      return sortOrder === 'asc' ? cmp : -cmp;
    });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.2rem', gap: '1.2rem' }}>
        <input
          type="text"
          placeholder="Search by song or artist..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '0.7rem 1rem',
            borderRadius: '10px',
            border: '1px solid #222',
            background: '#222',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            width: '60%',
            minWidth: 180,
          }}
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '10px',
            border: '1px solid #222',
            background: '#222',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
          }}
        >
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          style={{
            background: '#1db954',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '0.6rem 1.2rem',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>
      <h2 style={{ color: '#1db954', fontWeight: 600, fontSize: '1.5rem', marginBottom: '1.2rem' }}>Songs</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredSongs.map(song => (
          <li key={song.id} style={{
            background: 'rgba(40,40,40,0.95)',
            borderRadius: '12px',
            marginBottom: '1.1rem',
            padding: '1.1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 6px rgba(0,0,0,0.10)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={song.albumArt} alt={song.title + ' album art'} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', marginRight: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }} />
              <span style={{ fontSize: '1.1rem', color: '#fff' }}>
                <span style={{ fontWeight: 500 }}>{song.title}</span>
                <span style={{ color: '#aaa', marginLeft: 10 }}>by {song.artist}</span>
              </span>
            </div>
            <button
              onClick={() => onPlay(song.url)}
              disabled={!song.url}
              style={{
                background: song.url ? '#1db954' : '#888',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                padding: '0.5rem 1.5rem',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: song.url ? 'pointer' : 'not-allowed',
                boxShadow: song.url ? '0 2px 8px rgba(30,185,84,0.10)' : 'none',
                transition: 'background 0.2s',
              }}
            >
              Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
