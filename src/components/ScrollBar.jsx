import { useState, useRef, useEffect } from 'react';
import IncreaseFonts from './IncreaseFonts';

const ScrollBar = ({ setFontSize, song }) => {
  const minSpeed = 0.1;
  const maxSpeed = 1;

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(
    song?.scrollSpeed || (minSpeed + maxSpeed) / 3
  ); // Velocidad inicial centrada
  const scrollInterval = useRef(null);
  const scrollAccumulator = useRef(0);

  // Actualiza `scrollSpeed` cuando cambia `song`
  useEffect(() => {
    if (song?.scrollSpeed) {
      setScrollSpeed(song.scrollSpeed);
    }
  }, [song]);

  const startScrolling = () => {
    if (!isScrolling) {
      setIsScrolling(true);
      scrollInterval.current = setInterval(() => {
        scrollAccumulator.current += scrollSpeed;

        if (scrollAccumulator.current >= 1) {
          const scrollAmount = Math.floor(scrollAccumulator.current);
          window.scrollBy(0, scrollAmount);
          scrollAccumulator.current -= scrollAmount;
        }

        const isAtBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight;

        if (isAtBottom) {
          stopScrolling();
        }
      }, 50);
    }
  };

  const stopScrolling = () => {
    setIsScrolling(false);
    clearInterval(scrollInterval.current);
    scrollAccumulator.current = 0;
  };

  const handleSpeedChange = (e) => {
    const newSpeed = Number(e.target.value);
    setScrollSpeed(newSpeed);
  };

  useEffect(() => {
    return () => clearInterval(scrollInterval.current);
  }, []);

  return (
    <div className='scroll-controls'>
      <button
        onClick={isScrolling ? stopScrolling : startScrolling}
        style={{
          padding: '10px 15px',
          backgroundColor: isScrolling ? '#dc3545' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px',
          width: '40px',
        }}
      >
        {isScrolling ? '⏹' : '▶'}
      </button>

      <label htmlFor='scrollSpeed' style={{ marginRight: '10px' }}>
        Vel:
      </label>
      <input
        id='scrollSpeed'
        type='range'
        min={minSpeed}
        max={maxSpeed}
        step='0.05'
        value={scrollSpeed}
        onChange={handleSpeedChange}
        style={{ verticalAlign: 'middle' }}
        className='scroll-speed-slider'
      />
      <span style={{ marginLeft: '10px' }}>{scrollSpeed.toFixed(2)}</span>
      <div>
        <IncreaseFonts setFontSize={setFontSize} />
      </div>
    </div>
  );
};

export default ScrollBar;
