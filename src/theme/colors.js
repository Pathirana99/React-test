/**
 * ==============================================================================
 * 🎨 APEX AUTO — SINGLE THEME CONFIGURATION FILE
 * ==============================================================================
 * 
 * TO CHANGE COLORS ACROSS THE ENTIRE APPLICATION:
 * 👉 ONLY EDIT THIS SINGLE FILE (`src/theme/colors.js`).
 * 👉 YOU DO NOT NEED TO EDIT ANY CSS, JSX, OR OTHER FILES!
 * 
 * Simply change any hex color code in `THEME_COLORS` below, save the file,
 * and the entire app (backgrounds, cards, borders, buttons, text, map, etc.)
 * will immediately update.
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// Color Auto-Shading Utility (Calculates matching elevated surfaces and borders)
// ------------------------------------------------------------------------------
function adjustColor(hex, amount) {
  if (!hex || typeof hex !== 'string') return hex;
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const num = parseInt(full, 16);
  if (isNaN(num)) return hex;
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// ==============================================================================
// 1. ACTIVE COLOR PALETTE — EDIT THIS OBJECT ONLY!
// ==============================================================================
export const THEME_COLORS = {
  // ----------------------------------------------------------------------------
  // 1. MAIN WEBSITE BACKGROUND COLOR
  // ----------------------------------------------------------------------------
  background: '#0B0D10', // Midnight Black (Original Premium Theme)

  // ----------------------------------------------------------------------------
  // 2. PRIMARY BRAND ACCENT COLOR
  // ----------------------------------------------------------------------------
  accent: '#FFC400', // Racing Yellow (Buttons, active navigation, icons, highlights)

  // ----------------------------------------------------------------------------
  // 3. CARDS, PANELS & CONTAINERS
  // ----------------------------------------------------------------------------
  card: '#171A20', // Graphite

  // ----------------------------------------------------------------------------
  // 4. BORDERS, DIVIDERS & OUTLINES
  // ----------------------------------------------------------------------------
  border: '#252A32', // Steel Grey

  // ----------------------------------------------------------------------------
  // 5. TYPOGRAPHY
  // ----------------------------------------------------------------------------
  textPrimary: '#F5F5F5',    // Snow White (Headings & readable text)
  textSecondary: '#A1A7B0',  // Muted Silver (Descriptions & subtitles)

  // ----------------------------------------------------------------------------
  // 6. FUNCTIONAL STATUS COLORS
  // ----------------------------------------------------------------------------
  success: '#22C55E',  // Success Green
  info: '#3B82F6',     // Information Blue
  error: '#EF4444',    // Error Red
  warning: '#F59E0B',  // Warning Amber

  // --- Aliases for Seamless Component Compatibility ---
  get midnightBlack() { return this.background; },
  set midnightBlack(v) { this.background = v; },

  get racingYellow() { return this.accent; },
  set racingYellow(v) { this.accent = v; },

  get graphite() { return this.card || adjustColor(this.background, 12); },
  set graphite(v) { this.card = v; },

  get graphiteElevated() { return adjustColor(this.card || this.background, 8); },

  get steelGrey() { return this.border || adjustColor(this.background, 26); },
  set steelGrey(v) { this.border = v; },

  get steelGreyHover() { return adjustColor(this.border || this.background, 14); },

  get snowWhite() { return this.textPrimary; },
  set snowWhite(v) { this.textPrimary = v; },

  get mutedSilver() { return this.textSecondary; },
  set mutedSilver(v) { this.textSecondary = v; },

  get successGreen() { return this.success; },
  get infoBlue() { return this.info; },
  get errorRed() { return this.error; },
  get warningAmber() { return this.warning; },
};

// ==============================================================================
// 2. READY-TO-USE PRESETS FOR QUICK SWITCHING
// ==============================================================================
export const THEME_PRESETS = {
  midnightBlack: {
    name: 'Midnight Black + Racing Yellow (Default)',
    accent: '#FFC400',
    background: '#0B0D10',
    card: '#171A20',
    border: '#252A32',
  },
  motorsportRed: {
    name: 'Midnight Black + Brembo Red',
    accent: '#EF4444',
    background: '#0B0D10',
    card: '#171A20',
    border: '#252A32',
  },
  electricCyan: {
    name: 'Midnight Black + Taycan Cyan',
    accent: '#06B6D4',
    background: '#0B0D10',
    card: '#171A20',
    border: '#252A32',
  },
  emeraldGreen: {
    name: 'Midnight Black + Aston Emerald',
    accent: '#10B981',
    background: '#0B0D10',
    card: '#171A20',
    border: '#252A32',
  },
  hyperOrange: {
    name: 'Midnight Black + McLaren Papaya',
    accent: '#F97316',
    background: '#0B0D10',
    card: '#171A20',
    border: '#252A32',
  },
  titaniumGray: {
    name: 'Titanium Slate Gray + Yellow',
    accent: '#FFC400',
    background: '#181B20',
    card: '#22262E',
    border: '#333A46',
  }
};

// ==============================================================================
// 3. AUTOMATIC INJECTION ENGINE
// ==============================================================================
/**
 * Injects colors into CSS Custom Properties on :root.
 * Runs automatically on startup and whenever colors change.
 */
export function applyTheme(colors = THEME_COLORS) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  const bg = colors.background || colors.midnightBlack || '#0B0D10';
  const accent = colors.accent || colors.racingYellow || '#FFC400';
  const accentHover = adjustColor(accent, 15);
  const card = colors.card || colors.graphite || adjustColor(bg, 12);
  const cardElevated = adjustColor(card, 8);
  const border = colors.border || colors.steelGrey || adjustColor(bg, 26);
  const borderHover = adjustColor(border, 14);
  const textPrimary = colors.textPrimary || colors.snowWhite || '#F5F5F5';
  const textSecondary = colors.textSecondary || colors.mutedSilver || '#A1A7B0';

  root.style.setProperty('--color-midnight', bg);
  root.style.setProperty('--color-racing-yellow', accent);
  root.style.setProperty('--color-racing-yellow-hover', accentHover);
  root.style.setProperty('--color-graphite', card);
  root.style.setProperty('--color-graphite-elevated', cardElevated);
  root.style.setProperty('--color-steel-grey', border);
  root.style.setProperty('--color-steel-grey-hover', borderHover);
  root.style.setProperty('--color-snow-white', textPrimary);
  root.style.setProperty('--color-muted-silver', textSecondary);
  root.style.setProperty('--color-success', colors.success || colors.successGreen || '#22C55E');
  root.style.setProperty('--color-info', colors.info || colors.infoBlue || '#3B82F6');
  root.style.setProperty('--color-error', colors.error || colors.errorRed || '#EF4444');
  root.style.setProperty('--color-warning', colors.warning || colors.warningAmber || '#F59E0B');
}

/**
 * Switch preset at runtime (e.g. from Theme Customizer).
 */
export function switchPreset(presetKey) {
  const preset = THEME_PRESETS[presetKey];
  if (!preset) return;

  const newColors = {
    ...THEME_COLORS,
    accent: preset.accent,
    background: preset.background,
    card: preset.card,
    border: preset.border,
  };

  applyTheme(newColors);
  return newColors;
}

// Automatically apply theme on initial module load
if (typeof document !== 'undefined') {
  applyTheme(THEME_COLORS);
}
