import { useState, useEffect } from 'react';
import './App.css';
import { PwaInstallBanner } from './pwa/PwaInstallBanner.tsx';

type Page = 'welcome' | 'compose' | 'celebrate';

const moods = [
  { id: 'warm', label: 'Warm' },
  { id: 'playful', label: 'Playful' },
  { id: 'deep', label: 'Deep' },
] as const;

type MoodId = (typeof moods)[number]['id'];

const steps: { id: Page; label: string }[] = [
  { id: 'welcome', label: 'Start' },
  { id: 'compose', label: 'Note' },
  { id: 'celebrate', label: 'Pulse' },
];

function App() {
  const [page, setPage] = useState<Page>('welcome');
  const [mood, setMood] = useState<MoodId>('warm');
  const [note, setNote] = useState('');
  const [burst, setBurst] = useState(0);

  // New states for backend
  const [noteId, setNoteId] = useState<number | null>(null);
  const [notesList, setNotesList] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const stepIndex = steps.findIndex((s) => s.id === page);

  // Fetch notes when on welcome page
  useEffect(() => {
    if (page === 'welcome') {
      fetch('/api/notes')
        .then((res) => res.json())
        .then((data) => setNotesList(data))
        .catch(console.error);
    }
  }, [page]);

  function reset() {
    setPage('welcome');
    setMood('warm');
    setNote('');
    setBurst(0);
    setNoteId(null);
  }

  async function saveNote() {
    if (!note.trim()) return;
    setIsSaving(true);
    try {
      const method = noteId ? 'PUT' : 'POST';
      const url = noteId ? `/api/notes/${noteId}` : '/api/notes';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: note }),
      });
      const data = await res.json();
      if (!noteId) setNoteId(data.id);
      setPage('celebrate');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={`app app--${page}`}>
      <PwaInstallBanner />
      <header className="topbar">
        <p className="brand">
          Pulse{' '}
          <span
            style={{
              fontSize: '0.5em',
              opacity: 0.6,
              verticalAlign: 'middle',
              marginLeft: '8px',
            }}
          >
            {__APP_VERSION__} Sunith 1/ sjk 2
          </span>
        </p>
        <nav className="workflow" aria-label="Progress">
          {steps.map((step, i) => (
            <button
              key={step.id}
              type="button"
              className={`workflow__step ${i === stepIndex ? 'is-active' : ''} ${i < stepIndex ? 'is-done' : ''}`}
              onClick={() => {
                if (
                  i <= stepIndex ||
                  (step.id === 'compose' && page === 'welcome')
                ) {
                  if (step.id === 'celebrate' && !note.trim()) return;
                  setPage(step.id);
                }
              }}
              disabled={
                (step.id === 'celebrate' &&
                  page !== 'celebrate' &&
                  !note.trim()) ||
                (i > stepIndex &&
                  !(page === 'welcome' && step.id === 'compose'))
              }
            >
              <span className="workflow__num">{i + 1}</span>
              <span className="workflow__label">{step.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <div key={page} className="page">
        {page === 'welcome' && (
          <main className="panel panel--welcome">
            <div className="panel__orb" aria-hidden="true" />
            <p className="eyebrow">A tiny love workflow</p>
            <h1 className="title">
              Send a heartbeat
              <br />
              in three soft steps
            </h1>
            <p className="lede">
              Write a short note, pick a mood, and watch it bloom into a pulse.
            </p>
            <div className="actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setPage('compose')}
              >
                Begin
              </button>
            </div>
          </main>
        )}

        {page === 'compose' && (
          <main className="panel panel--compose">
            <p className="eyebrow">Step 2 · Compose</p>
            <h1 className="title title--sm">How does it feel?</h1>
            <p className="lede">Choose a mood, then leave a few words.</p>

            <div className="moods" role="group" aria-label="Mood">
              {moods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`mood mood--${m.id} ${mood === m.id ? 'is-selected' : ''}`}
                  onClick={() => setMood(m.id)}
                >
                  <span className="mood__dot" aria-hidden="true" />
                  {m.label}
                </button>
              ))}
            </div>

            <label className="field">
              <span className="field__label">Your note</span>
              <textarea
                className="field__input"
                rows={3}
                maxLength={120}
                placeholder="Something gentle, honest, or a little wild…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <span className="field__hint">{note.length}/120</span>
            </label>

            <div className="actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setPage('welcome')}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn--primary"
                disabled={!note.trim() || isSaving}
                onClick={saveNote}
              >
                {isSaving ? 'Sending...' : 'Send pulse'}
              </button>
            </div>
          </main>
        )}

        {page === 'celebrate' && (
          <main className="panel panel--celebrate">
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

            <p className={`sent-mood sent-mood--${mood}`}>
              {moods.find((m) => m.id === mood)?.label} pulse
            </p>
            <blockquote className="sent-note">“{note.trim()}”</blockquote>

            <div className="actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setPage('compose')}
              >
                Edit note
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={reset}
              >
                Start over
              </button>
            </div>
          </main>
        )}
      </div>

      {notesList.length > 0 && (
        <aside
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            width: '300px',
            bottom: '20px',
            overflowY: 'auto',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 10,
          }}
        >
          <h3
            style={{
              fontSize: '1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              letterSpacing: '1px',
              opacity: 0.8,
            }}
          >
            Recent Pulses
          </h3>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {notesList.map((n) => (
              <li
                key={n.id}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '0.95em',
                  lineHeight: '1.4',
                }}
              >
                {n.content}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}

export default App;
