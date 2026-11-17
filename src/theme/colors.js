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
  // 1. MAIN WEBSITE BACKGROUND COLOR (Fully Light Automotive Platinum Theme)
  // ----------------------------------------------------------------------------
  // Ultra-clean, luminous automotive showroom platinum
  background: '#F8FAFC',

  // ----------------------------------------------------------------------------
  // 2. PRIMARY BRAND ACCENT COLOR
  // ----------------------------------------------------------------------------
  // Vibrant automotive racing amber-yellow (high contrast and clarity on light mode)
  accent: '#F59E0B',

  // ----------------------------------------------------------------------------
  // 3. CARDS, PANELS & CONTAINERS
  // ----------------------------------------------------------------------------
  // Pure elevated crisp white cards
  card: '#FFFFFF',

  // ----------------------------------------------------------------------------
  // 4. BORDERS, DIVIDERS & OUTLINES
  // ----------------------------------------------------------------------------
  // Subtle, crisp light dividers
  border: '#E2E8F0',

  // ----------------------------------------------------------------------------
  // 5. TYPOGRAPHY (Crystal-clear contrast & readability)
  // ----------------------------------------------------------------------------
  textPrimary: '#0F172A',    // Deep slate dark charcoal (Ultra-sharp headings & titles)
  textSecondary: '#475569',  // Medium slate (Clear, readable descriptions & details)

  // ----------------------------------------------------------------------------
  // 6. FUNCTIONAL STATUS COLORS
  // ----------------------------------------------------------------------------
  success: '#16A34A',  // Success Green (Open, verified, parts)
  info: '#0284C7',     // Sky Blue (Routes, navigation, diagnostic services)
  error: '#DC2626',    // Error Red (Closed, alerts)
  warning: '#D97706',  // Warning Amber

  // --- Aliases for Seamless Component Compatibility ---
  get midnightBlack() { return this.background; },
  set midnightBlack(v) { this.background = v; },

  get racingYellow() { return this.accent; },
  set racingYellow(v) { this.accent = v; },

  get graphite() { return this.card || '#FFFFFF'; },
  set graphite(v) { this.card = v; },

  get graphiteElevated() { return '#F8FAFC'; },

  get steelGrey() { return this.border || '#E2E8F0'; },
  set steelGrey(v) { this.border = v; },

  get steelGreyHover() { return '#CBD5E1'; },

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
  pureLight: {
    name: 'Pure Platinum Light + Racing Amber (Active)',
    accent: '#F59E0B',
    background: '#F8FAFC',
    card: '#FFFFFF',
    border: '#E2E8F0',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
  },
  brightTitanium: {
    name: 'Bright Titanium Slate + Racing Yellow (Dark)',
    accent: '#FFC400',
    background: '#20252E',
    card: '#2A313C',
    border: '#3D4656',
    textPrimary: '#FFFFFF',
    textSecondary: '#CBD5E1',
  },
  deepMidnight: {
    name: 'Deep Midnight Black (Original Dark)',
    accent: '#FFC400',
    background: '#0B0D10',
    card: '#171A20',
    border: '#252A32',
    textPrimary: '#FFFFFF',
    textSecondary: '#A1A7B0',
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

  const bg = colors.background || colors.midnightBlack || '#F8FAFC';
  const accent = colors.accent || colors.racingYellow || '#F59E0B';
  const accentHover = adjustColor(accent, 15);
  const card = colors.card || colors.graphite || '#FFFFFF';
  const cardElevated = colors.cardElevated || (bg === '#F8FAFC' ? '#F1F5F9' : adjustColor(card, 10));
  const border = colors.border || colors.steelGrey || '#E2E8F0';
  const borderHover = colors.borderHover || (bg === '#F8FAFC' ? '#CBD5E1' : adjustColor(border, 16));
  const textPrimary = colors.textPrimary || colors.snowWhite || '#0F172A';
  const textSecondary = colors.textSecondary || colors.mutedSilver || '#475569';

  root.style.setProperty('--color-midnight', bg);
  root.style.setProperty('--color-racing-yellow', accent);
  root.style.setProperty('--color-racing-yellow-hover', accentHover);
  root.style.setProperty('--color-graphite', card);
  root.style.setProperty('--color-graphite-elevated', cardElevated);
  root.style.setProperty('--color-steel-grey', border);
  root.style.setProperty('--color-steel-grey-hover', borderHover);
  root.style.setProperty('--color-snow-white', textPrimary);
  root.style.setProperty('--color-muted-silver', textSecondary);
  root.style.setProperty('--color-success', colors.success || colors.successGreen || '#16A34A');
  root.style.setProperty('--color-info', colors.info || colors.infoBlue || '#0284C7');
  root.style.setProperty('--color-error', colors.error || colors.errorRed || '#DC2626');
  root.style.setProperty('--color-warning', colors.warning || colors.warningAmber || '#D97706');
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
    textPrimary: preset.textPrimary || THEME_COLORS.textPrimary,
    textSecondary: preset.textSecondary || THEME_COLORS.textSecondary,
  };

  applyTheme(newColors);
  return newColors;
}

// Automatically apply theme on initial module load
if (typeof document !== 'undefined') {
  applyTheme(THEME_COLORS);
}
