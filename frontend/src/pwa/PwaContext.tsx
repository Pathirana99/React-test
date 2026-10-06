import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export type InstallPlatform = 'android' | 'ios' | 'desktop' | 'unsupported';

type PwaContextValue = {
  platform: InstallPlatform;
  canInstall: boolean;
  isInstalled: boolean;
  install: () => Promise<void>;
  dismiss: () => void;
  isDismissed: boolean;
};

const PwaContext = createContext<PwaContextValue | null>(null);

function isStandaloneDisplay() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    ('standalone' in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function detectPlatform(): InstallPlatform {
  const ua = navigator.userAgent.toLowerCase();
  const isIos =
    /iphone|ipad|ipod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/.test(ua);

  if (isIos) return 'ios';
  if (isAndroid) return 'android';
  if (/mobile/.test(ua)) return 'unsupported';
  return 'desktop';
}

function isIosSafari() {
  const ua = navigator.userAgent.toLowerCase();
  const isIos =
    /iphone|ipad|ipod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  // Chrome/Firefox/Edge on iOS still use WebKit but block A2HS UX; Safari is the reliable path
  const isSafari = /safari/.test(ua) && !/crios|fxios|edgios|android/.test(ua);
  return isIos && isSafari;
}

export function PwaProvider({ children }: { children: ReactNode }) {
  const [platform] = useState<InstallPlatform>(() => detectPlatform());
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [iosReady, setIosReady] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem('pulse-pwa-banner-dismissed');
    } catch {
      // ignore
    }

    setIsInstalled(isStandaloneDisplay());
    setIosReady(isIosSafari() && !isStandaloneDisplay());

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIosReady(false);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const dismiss = useCallback(() => {
    setIsDismissed(true);
  }, []);

  const canInstall =
    !isInstalled &&
    (Boolean(deferredPrompt) || (platform === 'ios' && iosReady));

  const value = useMemo(
    () => ({
      platform,
      canInstall,
      isInstalled,
      install,
      dismiss,
      isDismissed,
    }),
    [platform, canInstall, isInstalled, install, dismiss, isDismissed]
  );

  return <PwaContext.Provider value={value}>{children}</PwaContext.Provider>;
}

export function usePwa() {
  const ctx = useContext(PwaContext);
  if (!ctx) {
    throw new Error('usePwa must be used within PwaProvider');
  }
  return ctx;
}
