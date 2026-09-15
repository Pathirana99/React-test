import { useState } from 'react';
import './App.css';

function App() {
  const [burst, setBurst] = useState(0);

  return (
    <main className="heart-stage">
      <div className="heart-stage__glow" aria-hidden="true" />

      <button
        type="button"
        className="heart-button"
        aria-label="Beat the heart"
        onClick={() => setBurst((n) => n + 1)}
      >
        <span className="heart" aria-hidden="true">
          <span className="heart__shape" />
          <span className="heart__shine" />
        </span>
        <span className="heart__ring heart__ring--a" aria-hidden="true" />
        <span className="heart__ring heart__ring--b" aria-hidden="true" />
      </button>

      <div key={burst} className="sparkles" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className={`sparkle sparkle--${i + 1}`} />
        ))}
      </div>

      <p className="heart-caption">Tap the heart</p>
    </main>
  );
}

export default App;
