import React, { useState } from 'react';

function Auth({ onAuth, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jwt', data.token);
        onAuth(username);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #191414 0%, #1db954 100%)',
    }}>
      <div style={{
        background: 'rgba(34,34,34,0.95)',
        borderRadius: '18px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
        padding: '2.5rem 2.5rem 2rem 2.5rem',
        minWidth: '340px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1 style={{ color: '#1db954', fontWeight: 700, marginBottom: '1.5rem', fontSize: '2.2rem', letterSpacing: '2px' }}>Spotify MVP</h1>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem',
              marginBottom: '1rem',
              borderRadius: '10px',
              border: '1px solid #222',
              background: '#222',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem',
              marginBottom: '1.2rem',
              borderRadius: '10px',
              border: '1px solid #222',
              background: '#222',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
          {error && <div style={{ color: '#ff4d4f', marginBottom: '1rem', fontWeight: 500 }}>{error}</div>}
          <button
            type="submit"
            style={{
              width: '100%',
              background: '#1db954',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.8rem',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              marginBottom: '0.5rem',
            }}
          >
            Login
          </button>
        </form>
        <div style={{ color: '#aaa', fontSize: '0.95rem', marginTop: '1.2rem', textAlign: 'center' }}>
          Don't have an account?{' '}
          <span style={{ color: '#1db954', cursor: 'pointer', textDecoration: 'underline' }} onClick={onSwitchToRegister}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
}

export default Auth;
