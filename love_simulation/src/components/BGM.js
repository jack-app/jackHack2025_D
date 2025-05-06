import { useEffect, useState } from 'react';

const audioInstance = new Audio('/audio/shiningstar.mp3');
audioInstance.loop = true;

const BGM = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioInstance.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Auto-play failed:', error);
        document.addEventListener('click', () => {
          if (!isPlaying) {
            audioInstance.play()
              .then(() => setIsPlaying(true))
              .catch(e => console.log('Playback failed:', e));
          }
        }, { once: true });
      }
    };

    playAudio();

    return () => {
      audioInstance.pause();
      setIsPlaying(false);
    };
  }, [isPlaying]);

  const toggleMute = () => {
    audioInstance.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '60px',
        right: '20px',
        zIndex: 1000,
        padding: '20px',
        borderRadius: '30px',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        cursor: 'pointer',
        width: isHovered ? '120px' : '60px',
        height: '60px',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }}
    >
      {isMuted ? '🔇' : '🔊'}
      {isHovered && <span style={{ fontSize: '16px' }}>{isMuted ? 'ミュート中' : 'ミュート'}</span>}
    </button>
  );
};

export default BGM;
