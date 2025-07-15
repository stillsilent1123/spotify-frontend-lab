import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

function Player({ url }) {
  const audioRef = useRef();
  const prevUrl = useRef(url);
  const isYouTube = url && (url.includes('youtube.com') || url.includes('youtu.be'));

  useEffect(() => {
    if (!isYouTube && url && audioRef.current) {
      if (prevUrl.current !== url) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.load();
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay might be blocked, user interaction required
          });
        }
        prevUrl.current = url;
      }
    }
  }, [url, isYouTube]);

  if (!url) return <div style={{ color: '#aaa', textAlign: 'center', fontSize: '1.1rem' }}>Select a song to play</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0.5rem 0' }}>
      {isYouTube ? (
        <>
          <ReactPlayer key={url} url={url} controls width="100%" height="120px" style={{ maxWidth: 500, borderRadius: '12px', overflow: 'hidden' }} playing />
          <div style={{ color: '#fff', fontSize: '0.95rem', marginTop: '0.5rem', textAlign: 'center' }}>
            If playback does not start, please click the play button in the player. Browsers may block autoplay for YouTube videos.
          </div>
        </>
      ) : (
        <audio ref={audioRef} controls style={{ width: '100%', borderRadius: '10px', background: '#222' }}>
          <source src={url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default Player;
