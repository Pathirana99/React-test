import { usePwa } from './PwaContext';
import './PwaInstallBanner.css';

export function PwaInstallBanner() {
  const { canInstall, isDismissed, install, dismiss, platform } = usePwa();

  if (!canInstall || isDismissed) return null;

  const isIos = platform === 'ios';

  return (
    <aside
      className={`pwa-banner ${isIos ? 'pwa-banner--ios' : ''}`}
      role="dialog"
      aria-label="Install Pulse on your phone"
    >
      <div className="pwa-banner__copy">
        <img
          className="pwa-banner__icon"
          src="/icons/pwa-192.png"
          alt=""
          width={40}
          height={40}
        />
        <div>
          <p className="pwa-banner__title">
            {isIos ? 'Add Pulse to your iPhone' : 'Install Pulse on your phone'}
          </p>
          {isIos ? (
            <ol className="pwa-banner__steps">
              <li>
                Tap <span className="pwa-banner__share" aria-hidden="true" />{' '}
                <strong>Share</strong>
              </li>
              <li>
                Choose <strong>Add to Home Screen</strong>
              </li>
              <li>
                Tap <strong>Add</strong>
              </li>
            </ol>
          ) : (
            <p className="pwa-banner__text">
              Get the app icon on your home screen — works offline too.
            </p>
          )}
        </div>
      </div>

      <div className="pwa-banner__actions">
        <button type="button" className="pwa-banner__ghost" onClick={dismiss}>
          Not now
        </button>
        {!isIos && (
          <button
            type="button"
            className="pwa-banner__primary"
            onClick={() => void install()}
          >
            Install
          </button>
        )}
      </div>
    </aside>
  );
}
