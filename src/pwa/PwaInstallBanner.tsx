import { usePwa } from './PwaContext';
import './PwaInstallBanner.css';

export function PwaInstallBanner() {
  const { canInstall, isDismissed, install, dismiss } = usePwa();

  if (!canInstall || isDismissed) return null;

  return (
    <aside className="pwa-banner" role="dialog" aria-label="Install Pulse app">
      <div className="pwa-banner__copy">
        <img
          className="pwa-banner__icon"
          src="/icons/pwa-192.png"
          alt=""
          width={40}
          height={40}
        />
        <div>
          <p className="pwa-banner__title">Install Pulse</p>
          <p className="pwa-banner__text">
            Add to your desktop for a quick heartbeat.
          </p>
        </div>
      </div>
      <div className="pwa-banner__actions">
        <button type="button" className="pwa-banner__ghost" onClick={dismiss}>
          Not now
        </button>
        <button
          type="button"
          className="pwa-banner__primary"
          onClick={() => void install()}
        >
          Install
        </button>
      </div>
    </aside>
  );
}
