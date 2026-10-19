import { useState, useEffect } from 'react';
import './App.css';
import { PwaInstallBanner } from './pwa/PwaInstallBanner.tsx';

declare const __APP_VERSION__: string;

type Page = 'welcome' | 'compose' | 'celebrate';

const moods = [
  { id: 'warm', label: 'Warm', color: '#10b981' },
  { id: 'playful', label: 'Playful', color: '#fb7185' },
  { id: 'deep', label: 'Deep', color: '#a855f7' },
] as const;

type MoodId = (typeof moods)[number]['id'];

const steps: { id: Page; label: string }[] = [
  { id: 'welcome', label: 'Start' },
  { id: 'compose', label: 'Note' },
  { id: 'celebrate', label: 'Pulse' },
];

interface PulseItem {
  id: number | string;
  sender?: string;
  mood?: string;
  content: string;
  timestamp?: string;
  createdAt?: string;
}

const defaultPulses: PulseItem[] = [
  {
    id: 'p1',
    sender: 'Echoes in Rain',
    mood: 'deep',
    content: 'A slow calm murmur from the northern coastline. Felt the silence break softly.',
    timestamp: '2m ago',
  },
  {
    id: 'p2',
    sender: 'Warm Amber',
    mood: 'warm',
    content: 'Thinking of our studio sessions under the warm skylight.',
    timestamp: '18m ago',
  },
  {
    id: 'p3',
    sender: 'Deep Bloom',
    mood: 'deep',
    content: 'Sending this quiet intention across time zones. May you find stillness.',
    timestamp: '1h ago',
  },
];

function App() {
  const [page, setPage] = useState<Page>('welcome');
  const [mood, setMood] = useState<MoodId>('warm');
  const [note, setNote] = useState('');
  const [burst, setBurst] = useState(0);

  // Backend state
  const [noteId, setNoteId] = useState<number | null>(null);
  const [backendNotes, setBackendNotes] = useState<PulseItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const stepIndex = steps.findIndex((s) => s.id === page);

  const fetchNotes = () => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formatted: PulseItem[] = data.map((item: any, idx: number) => ({
            id: item.id || `b-${idx}`,
            sender: item.sender || (idx === 0 ? 'Latest Pulse' : 'Signal Recipient'),
            mood: item.mood || 'warm',
            content: item.content,
            timestamp: item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'recently',
            createdAt: item.created_at,
          }));
          setBackendNotes(formatted);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch backend notes:', err);
      });
  };

  useEffect(() => {
    fetchNotes();
    const interval = setInterval(fetchNotes, 15000);
    return () => clearInterval(interval);
  }, []);

  // Combine backend notes with default presets
  const displayPulses: PulseItem[] = [
    ...backendNotes,
    ...defaultPulses.filter(
      (dp) => !backendNotes.some((bn) => bn.content === dp.content)
    ),
  ];

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
      if (!noteId && data.id) setNoteId(data.id);

      // Prepend newly saved pulse to local list
      const newPulse: PulseItem = {
        id: data.id || Date.now(),
        sender: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Pulse`,
        mood: mood,
        content: note,
        timestamp: 'just now',
      };
      setBackendNotes((prev) => [newPulse, ...prev.filter((p) => p.id !== data.id)]);

      setPage('celebrate');
    } catch (e) {
      console.error(e);
      // Still show celebrate on network fallback
      const fallbackPulse: PulseItem = {
        id: Date.now(),
        sender: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Pulse`,
        mood: mood,
        content: note,
        timestamp: 'just now',
      };
      setBackendNotes((prev) => [fallbackPulse, ...prev]);
      setPage('celebrate');
    } finally {
      setIsSaving(false);
    }
  }

  const currentMoodObj = moods.find((m) => m.id === mood) || moods[0];

  const appVersion = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'v0.0.8';

  return (
    <div className={`pulse-app pulse-app--${page}`}>
      <PwaInstallBanner />

      {/* Main Top Header */}
      <header className="pulse-topbar">
        <div className="pulse-brand">
          <span className="pulse-brand__dot" aria-hidden="true" />
          <span className="pulse-brand__name">Pulse</span>
          <span className="pulse-brand__version">{appVersion}</span>
        </div>

        {/* Workflow pill navigation */}
        <nav className="pulse-nav" aria-label="Workflow progress">
          {steps.map((step, i) => {
            const isActive = step.id === page;
            const isCompleted = i < stepIndex;

            return (
              <button
                key={step.id}
                type="button"
                className={`pulse-nav__item ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                onClick={() => {
                  if (
                    i <= stepIndex ||
                    (step.id === 'compose' && page === 'welcome') ||
                    (step.id === 'celebrate' && note.trim())
                  ) {
                    setPage(step.id);
                  }
                }}
                disabled={step.id === 'celebrate' && !note.trim() && page !== 'celebrate'}
              >
                {isActive && <span className="pulse-nav__dot">●</span>}
                <span className="pulse-nav__label">{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Profile Avatar */}
        <button
          type="button"
          className="pulse-avatar"
          aria-label="User Profile"
          title="Profile · Live Sync Active"
        >
          <svg
            className="pulse-avatar__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </header>

      {/* Main App Container: Left/Center Stage + Right Sidebar */}
      <div className="pulse-container">
        {/* Main Stage */}
        <div className="pulse-stage">
          {page === 'welcome' && (
            <main className="pulse-panel pulse-panel--welcome">
              <div className="pulse-badge">
                <span className="pulse-badge__star">✦</span>
                <span>TINY LOFI WORKFLOW</span>
                <span className="pulse-badge__star">✦</span>
              </div>

              <h1 className="pulse-title">
                Send a heartbeat
                <br />
                <span className="pulse-title--highlight">in three soft steps</span>
              </h1>

              <p className="pulse-subtitle">
                Write a short note, pick a mood, and watch it bloom into a pulse.
              </p>

              <div className="pulse-actions pulse-actions--center">
                <button
                  type="button"
                  className="pulse-btn pulse-btn--primary"
                  onClick={() => setPage('compose')}
                >
                  Begin →
                </button>
              </div>

              <div className="pulse-time-hint">
                <svg
                  className="pulse-time-hint__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Takes under 60 seconds</span>
              </div>

              {/* Bottom Equalizer waveform animation */}
              <div className="pulse-equalizer" aria-hidden="true">
                <span className="pulse-equalizer__bar pulse-equalizer__bar--1" />
                <span className="pulse-equalizer__bar pulse-equalizer__bar--2" />
                <span className="pulse-equalizer__bar pulse-equalizer__bar--3" />
                <span className="pulse-equalizer__bar pulse-equalizer__bar--4" />
                <span className="pulse-equalizer__bar pulse-equalizer__bar--5" />
                <span className="pulse-equalizer__bar pulse-equalizer__bar--6" />
                <span className="pulse-equalizer__bar pulse-equalizer__bar--7" />
              </div>
            </main>
          )}

          {page === 'compose' && (
            <main className="pulse-panel pulse-panel--compose">
              <div className="pulse-badge">
                <span className="pulse-badge__star">✦</span>
                <span>STEP 2 · COMPOSE</span>
                <span className="pulse-badge__star">✦</span>
              </div>

              <h1 className="pulse-title pulse-title--compose">How does it feel?</h1>

              <p className="pulse-subtitle pulse-subtitle--compose">
                Choose a mood, then leave a few words to carry your intention.
              </p>

              {/* Mood Selectors */}
              <div className="pulse-moods" role="group" aria-label="Select mood">
                {moods.map((m) => {
                  const isSelected = mood === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className={`pulse-mood-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setMood(m.id)}
                    >
                      <span className={`pulse-mood-dot pulse-mood-dot--${m.id}`} />
                      <span className="pulse-mood-label">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Note Input */}
              <div className="pulse-field">
                <div className="pulse-field__header">
                  <span className="pulse-field__label">Your note</span>
                  <span className="pulse-field__security">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="pulse-field__lock-icon"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Quiet transmission
                  </span>
                </div>

                <div className="pulse-textarea-wrapper">
                  <textarea
                    className="pulse-textarea"
                    rows={4}
                    maxLength={140}
                    placeholder="Something gentle, honest, or a little wild…"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    autoFocus
                  />
                  <span className="pulse-field__counter">{note.length}/140</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pulse-actions pulse-actions--between">
                <button
                  type="button"
                  className="pulse-btn pulse-btn--ghost"
                  onClick={() => setPage('welcome')}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="pulse-btn pulse-btn--primary"
                  disabled={!note.trim() || isSaving}
                  onClick={saveNote}
                >
                  {isSaving ? 'Sending...' : 'Send pulse ↗'}
                </button>
              </div>

              <p className="pulse-compose-footnote">
                ✦ Transmitted directly to recipient's live memory clock
              </p>
            </main>
          )}

          {page === 'celebrate' && (
            <main className="pulse-panel pulse-panel--celebrate">
              <div className="pulse-badge pulse-badge--coords">
                <span className="pulse-badge__star">✦</span>
                <span>TRANSMITTED · 56.1249° N 12.0123° E</span>
                <span className="pulse-badge__star">✦</span>
              </div>

              {/* Glowing Heart with Radar Rings & Core Glow */}
              <div className="pulse-heart-stage">
                <div className="pulse-radar-ring pulse-radar-ring--1" />
                <div className="pulse-radar-ring pulse-radar-ring--2" />
                <div className="pulse-radar-ring pulse-radar-ring--3" />
                <div className="pulse-radar-crosshair pulse-radar-crosshair--h" />
                <div className="pulse-radar-crosshair pulse-radar-crosshair--v" />

                <button
                  type="button"
                  className="pulse-heart-btn"
                  aria-label="Pulse heart"
                  onClick={() => setBurst((b) => b + 1)}
                >
                  <div className="pulse-heart-glow" />
                  <div className="pulse-heart-mesh">
                    <span className="pulse-heart-core" />
                  </div>
                </button>

                {/* Particle sparkles on click */}
                <div key={burst} className="pulse-sparkles" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className={`pulse-sparkle pulse-sparkle--${i + 1}`} />
                  ))}
                </div>
              </div>

              {/* Mood Badge */}
              <div className="pulse-celebrate-mood">
                <span className="pulse-celebrate-mood__dot" />
                <span>✦ {currentMoodObj.label.toUpperCase()} PULSE ✦</span>
              </div>

              {/* User Note Quote */}
              <blockquote className="pulse-sent-quote">
                “{note.trim() || 'Warm heartbeat'}”
              </blockquote>

              <p className="pulse-sent-subtext">
                <span className="pulse-status-dot">●</span>
                Delivered to recipient · Recorded on midnight ledger
              </p>

              {/* Action Buttons */}
              <div className="pulse-actions pulse-actions--center">
                <button
                  type="button"
                  className="pulse-btn pulse-btn--ghost"
                  onClick={() => setPage('compose')}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pulse-btn__icon"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Edit note
                </button>
                <button
                  type="button"
                  className="pulse-btn pulse-btn--primary"
                  onClick={reset}
                >
                  Start over ↺
                </button>
              </div>

              {/* Frequency Audio Waveform */}
              <div className="pulse-resonance">
                <div className="pulse-resonance__bars" aria-hidden="true">
                  <span className="pulse-res-bar pulse-res-bar--1" />
                  <span className="pulse-res-bar pulse-res-bar--2" />
                  <span className="pulse-res-bar pulse-res-bar--3" />
                  <span className="pulse-res-bar pulse-res-bar--4" />
                  <span className="pulse-res-bar pulse-res-bar--5" />
                  <span className="pulse-res-bar pulse-res-bar--6" />
                  <span className="pulse-res-bar pulse-res-bar--7" />
                </div>
                <span className="pulse-resonance__tag">FREQUENCY RESONANCE: 432Hz</span>
              </div>
            </main>
          )}
        </div>

        {/* Persistent Right Sidebar: RECENT PULSES */}
        <aside className="pulse-sidebar">
          <div className="pulse-sidebar__header">
            <h3 className="pulse-sidebar__title">RECENT PULSES</h3>
            <div className="pulse-sidebar__live">
              <span className="pulse-live-dot" />
              <span>Live Sync</span>
            </div>
          </div>

          <div className="pulse-sidebar__list">
            {displayPulses.map((p) => {
              const isWarm = p.mood === 'warm';
              const isPlayful = p.mood === 'playful';

              return (
                <div key={p.id} className="pulse-card">
                  <div className="pulse-card__header">
                    <div className="pulse-card__sender-wrap">
                      <span
                        className={`pulse-card__mood-dot ${
                          isWarm
                            ? 'pulse-card__mood-dot--warm'
                            : isPlayful
                              ? 'pulse-card__mood-dot--playful'
                              : 'pulse-card__mood-dot--deep'
                        }`}
                      />
                      <span className="pulse-card__sender">
                        {p.sender || 'Anonymous Pulse'}
                      </span>
                    </div>
                    <span className="pulse-card__time">{p.timestamp || 'recently'}</span>
                  </div>
                  <p className="pulse-card__content">{p.content}</p>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="pulse-sidebar__history-btn"
            onClick={() => setShowHistory(true)}
          >
            View Pulse History
          </button>
        </aside>
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="pulse-modal-backdrop" onClick={() => setShowHistory(false)}>
          <div
            className="pulse-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pulse-modal__header">
              <div className="pulse-modal__title-wrap">
                <span className="pulse-live-dot" />
                <h2 id="modal-title" className="pulse-modal__title">
                  Transmission Archive
                </h2>
              </div>
              <button
                type="button"
                className="pulse-modal__close"
                onClick={() => setShowHistory(false)}
                aria-label="Close archive"
              >
                ✕
              </button>
            </div>

            <div className="pulse-modal__search">
              <input
                type="text"
                placeholder="Search pulses or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pulse-modal__input"
              />
            </div>

            <div className="pulse-modal__list">
              {displayPulses
                .filter((p) =>
                  p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (p.sender && p.sender.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map((p) => (
                  <div key={p.id} className="pulse-modal__item">
                    <div className="pulse-card__header">
                      <span className="pulse-card__sender">{p.sender}</span>
                      <span className="pulse-card__time">{p.timestamp}</span>
                    </div>
                    <p className="pulse-card__content">{p.content}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
