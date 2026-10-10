/**
 * Single source of truth for UI styling.
 *
 * Colours live in `src/index.css` (`@theme` brand-* tokens) so they are
 * available as normal Tailwind utilities (bg-brand-600, text-brand-700 ...).
 * This file composes those utilities into reusable class recipes. Components
 * should import from here instead of hand-writing long class strings, so a
 * change made here is reflected across the whole app.
 */

type ClassValue = string | false | null | undefined;

/** Join class names, skipping falsy values. */
export const cx = (...classes: ClassValue[]) =>
  classes.filter(Boolean).join(' ');

/* ----------------------------------------------------------------------------
 * Text
 * ------------------------------------------------------------------------- */
export const text = {
  primary: 'text-slate-900 dark:text-slate-100',
  secondary: 'text-slate-700 dark:text-slate-300',
  muted: 'text-slate-500 dark:text-slate-400',
  subtle: 'text-slate-400 dark:text-slate-500',
  brand: 'text-brand-600 dark:text-brand-300',
  danger: 'text-red-600 dark:text-red-400',
};

/* ----------------------------------------------------------------------------
 * Surfaces & borders
 * ------------------------------------------------------------------------- */
export const surface = {
  base: 'bg-white dark:bg-slate-900',
  muted: 'bg-slate-50 dark:bg-slate-800/40',
  border: 'border-slate-200 dark:border-slate-800',
  divider: 'border-t border-slate-200 dark:border-slate-800',
};

/* ----------------------------------------------------------------------------
 * Buttons
 * ------------------------------------------------------------------------- */
const btnBase =
  'inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900';

const btnVariant = {
  primary:
    'bg-brand-600 text-white font-semibold shadow-sm hover:bg-brand-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:hover:bg-slate-200 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:disabled:hover:bg-slate-800',
  secondary:
    'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:disabled:hover:bg-slate-900',
  ghost:
    'text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300',
};

export const button = {
  primary: cx(btnBase, 'h-10 px-4', btnVariant.primary),
  primarySm: cx(btnBase, 'h-9 px-3 text-xs sm:text-sm', btnVariant.primary),
  secondary: cx(btnBase, 'h-10 px-4', btnVariant.secondary),
  /** Square close / icon-only button used in modal headers. */
  icon: cx(btnBase, 'h-8 w-8 shrink-0', btnVariant.ghost),
  /** Compact outlined button used in table toolbars & pagination. */
  toolbar: cx(btnBase, 'h-10 min-w-10 px-2.5', btnVariant.secondary),
  toolbarPrimary: cx(
    btnBase,
    'h-10 min-w-10 px-2.5 md:px-3.5',
    btnVariant.primary
  ),
  link: 'inline-flex items-center gap-1 text-xs font-medium cursor-pointer transition-colors text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200',
  dangerLink:
    'inline-flex items-center gap-1 text-sm font-semibold cursor-pointer transition-colors text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300',
};

/* ----------------------------------------------------------------------------
 * Form controls
 * ------------------------------------------------------------------------- */
export const form = {
  input: `w-full
rounded-lg
px-3
py-2.5
text-sm

bg-slate-50
border border-slate-200
text-slate-900
placeholder:text-slate-400

dark:bg-[#0f0a1f]
dark:border-white/10
dark:text-slate-200
dark:placeholder:text-slate-500

focus:outline-none
focus:ring-2
focus:ring-brand-600
focus:border-transparent
focus:transition-all
focus:duration-200`,
  label: 'block mb-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium',
  error: 'text-xs text-red-600 mt-1 dark:text-red-400',
  checkbox:
    'h-4 w-4 shrink-0 rounded border-slate-300 accent-brand-600 dark:border-slate-600',
  radio: 'h-4 w-4 shrink-0 accent-brand-600',
  field: 'flex flex-col',
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
};

/* ----------------------------------------------------------------------------
 * Chips & tags
 * ------------------------------------------------------------------------- */
export const chip = {
  base: 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-colors cursor-pointer',
  idle: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-transparent dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/5',
  active:
    'border-brand-600 bg-brand-600 text-white hover:bg-brand-700 hover:border-brand-700',
  /** Static, non-interactive tag (skills, priority ...). */
  tag: 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-200 dark:ring-brand-800',
};

/* ----------------------------------------------------------------------------
 * Overlays: dialogs, bottom sheets, side drawers
 * ------------------------------------------------------------------------- */
const overlayShell = cx(
  'fixed z-300 flex flex-col border shadow-2xl',
  surface.base,
  surface.border,
  text.primary
);

export const modal = {
  /** Bottom sheet on mobile, centred dialog from `md` up. */
  dialog: cx(
    overlayShell,
    'inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl',
    'md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2',
    'md:w-[min(45rem,calc(100vw-2rem))] md:h-125 md:max-h-[85vh] md:rounded-2xl'
  ),
  /** Bottom sheet at every size. */
  sheet: cx(overlayShell, 'inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl'),
  /** Full-height panel sliding in from the right. */
  drawer: cx(
    overlayShell,
    'right-0 top-0 h-full w-full sm:w-115 md:w-125 lg:w-135 border-y-0 border-r-0 overflow-y-auto'
  ),
  /** Little grab handle shown at the top of bottom sheets. */
  handle:
    'mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700',
  header: cx(
    'flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 shrink-0 border-b',
    surface.border
  ),
  /** Header that stays visible while a drawer scrolls. */
  stickyHeader: cx(
    'sticky top-0 z-10 flex items-start justify-between gap-3 px-4 sm:px-5 py-4 border-b',
    surface.base,
    surface.border
  ),
  title: cx('text-base font-semibold truncate', text.primary),
  subtitle: cx('text-xs sm:text-sm mt-0.5', text.muted),
  body: 'flex-1 min-h-0 overflow-y-auto',
  footer: cx(
    'flex items-center justify-between gap-3 px-4 sm:px-5 py-3 shrink-0 border-t',
    surface.border
  ),
  /** Footer that stays visible at the bottom of a scrolling drawer. */
  stickyFooter: cx(
    'sticky bottom-0 z-10 flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t',
    surface.base,
    surface.border
  ),
};

/* ----------------------------------------------------------------------------
 * Sections & cards
 * ------------------------------------------------------------------------- */
export const section = {
  wrapper: 'px-4 sm:px-5 py-5',
  heading: 'flex items-center gap-2 mb-4',
  accent: 'w-1 h-4 rounded-full shrink-0 bg-brand-600',
  title: cx('text-sm xl:text-base font-semibold', text.primary),
  divider: surface.divider,
};

export const card = {
  base: cx('rounded-xl border', surface.base, surface.border),
  muted: cx('rounded-xl border p-4', surface.muted, surface.border),
};

/* ----------------------------------------------------------------------------
 * Loading placeholders
 * ------------------------------------------------------------------------- */
export const skeleton =
  'animate-pulse rounded-md bg-slate-200 dark:bg-slate-700';
