/**
 * ==============================================================================
 * APEX AUTO — SINGLE THEME CONFIGURATION FILE
 * ==============================================================================
 * 
 * To change the colors of the entire application, simply edit the hex values
 * in `THEME_COLORS` below!
 * 
 * You can also switch between predefined automotive presets or add your own.
 * Every button, background, card, border, map pin, route, and text color
 * across the entire app will update automatically.
 */

// ==============================================================================
// 1. ACTIVE COLOR PALETTE (EDIT THESE TO CHANGE THE PLATFORM COLORS EASILY)
// ==============================================================================
export const THEME_COLORS = {
  // Dominant Background (60% of layout)
  midnightBlack: '#0B0D10',

  // Primary Accent Highlight (Buttons, active tabs, markers, badges)
  racingYellow: '#FFC400',
  racingYellowHover: '#FFD026',

  // Surfaces, Cards, Modals & Containers (25% of layout)
  graphite: '#171A20',
  graphiteElevated: '#1E222B',

  // Subtle Borders, Separators & Outlines
  steelGrey: '#252A32',
  steelGreyHover: '#383F4B',

  // Primary Typography & Headings (10% of layout)
  snowWhite: '#F5F5F5',

  // Secondary Typography & Descriptions
  mutedSilver: '#A1A7B0',

  // Functional Status Colors
  successGreen: '#22C55E',  // Spare parts, open status, verified
  infoBlue: '#3B82F6',      // Repair services, GPS routes, navigation
  errorRed: '#EF4444',      // Closed status, urgent alerts
  warningAmber: '#F59E0B',  // Warnings
};

// ==============================================================================
// 2. READY-TO-USE AUTOMOTIVE COLOR PRESETS
// ==============================================================================
export const THEME_PRESETS = {
  racingYellow: {
    name: 'Apex Racing Yellow (Default)',
    accent: '#FFC400',
    accentHover: '#FFD026',
    background: '#0B0D10',
    card: '#171A20',
    border: '#252A32',
  },
  motorsportRed: {
    name: 'Brembo Motorsport Red',
    accent: '#EF4444',
    accentHover: '#F87171',
    background: '#0B0D10',
    card: '#171A20',
    border: '#252A32',
  },
  electricCyan: {
    name: 'Taycan Electric Cyan',
    accent: '#06B6D4',
    accentHover: '#22D3EE',
    background: '#080C11',
    card: '#131A24',
    border: '#1F2A38',
  },
  emeraldGreen: {
    name: 'Aston Emerald Green',
    accent: '#10B981',
    accentHover: '#34D399',
    background: '#070E0B',
    card: '#121F18',
    border: '#1E3227',
  },
  hyperOrange: {
    name: 'McLaren Papaya Orange',
    accent: '#F97316',
    accentHover: '#FB923C',
    background: '#0C0A09',
    card: '#1C1917',
    border: '#292524',
  }
};

// ==============================================================================
// 3. THEME INJECTION ENGINE
// ==============================================================================
/**
 * Injects the colors as CSS custom properties into :root.
 * Runs on application mount and whenever the theme changes.
 */
export function applyTheme(colors = THEME_COLORS) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  root.style.setProperty('--color-midnight', colors.midnightBlack);
  root.style.setProperty('--color-racing-yellow', colors.racingYellow);
  root.style.setProperty('--color-racing-yellow-hover', colors.racingYellowHover);
  root.style.setProperty('--color-graphite', colors.graphite);
  root.style.setProperty('--color-graphite-elevated', colors.graphiteElevated);
  root.style.setProperty('--color-steel-grey', colors.steelGrey);
  root.style.setProperty('--color-steel-grey-hover', colors.steelGreyHover);
  root.style.setProperty('--color-snow-white', colors.snowWhite);
  root.style.setProperty('--color-muted-silver', colors.mutedSilver);
  root.style.setProperty('--color-success', colors.successGreen);
  root.style.setProperty('--color-info', colors.infoBlue);
  root.style.setProperty('--color-error', colors.errorRed);
  root.style.setProperty('--color-warning', colors.warningAmber);
}

/**
 * Switch to any preset at runtime.
 */
export function switchPreset(presetKey) {
  const preset = THEME_PRESETS[presetKey];
  if (!preset) return;

  const newColors = {
    ...THEME_COLORS,
    racingYellow: preset.accent,
    racingYellowHover: preset.accentHover,
    midnightBlack: preset.background,
    graphite: preset.card,
    steelGrey: preset.border,
  };

  applyTheme(newColors);
  return newColors;
}
