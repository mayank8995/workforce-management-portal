/**
 * Application theme: reusable Tailwind class recipes.
 *
 * Colours are defined once in `src/index.css`:
 *  - fixed palettes (`brand-*`, `haze-*`, `dusk-*`)
 *  - semantic tokens (`surface`, `ink`, `line`, `accent`, status tones ...)
 *    whose values switch automatically between light and dark mode.
 *
 * This module only composes those utilities into named building blocks so
 * every screen shares the same look. Prefer importing a recipe from here over
 * writing colour classes inline; when a new pattern is needed, add it here.
 */

type ClassValue = string | false | null | undefined;

/** Joins class names, skipping falsy values (handy for conditional classes). */
export const cx = (...classes: ClassValue[]) =>
  classes.filter(Boolean).join(' ');

/* =============================================================================
 * Typography colours
 * ========================================================================== */
export const text = {
  /** Headings and primary content. */
  primary: 'text-ink',
  /** Regular body copy. */
  secondary: 'text-ink-secondary',
  /** Labels, captions, helper text. */
  muted: 'text-ink-muted',
  /** Least prominent text: hints, counters, decorative icons. */
  subtle: 'text-ink-subtle',
  /** Brand-coloured text / links / icons. */
  accent: 'text-accent',
  /** Validation and error messages. */
  danger: 'text-danger',
  /** Highlights that need attention (dates, warnings). */
  warning: 'text-warning',
};

/* =============================================================================
 * Page backgrounds & surfaces
 * ========================================================================== */
const darkBackdrop =
  'dark:bg-linear-to-br dark:from-dusk-900 dark:via-dusk-800 dark:to-dusk-700';

export const surface = {
  /** Background for pages inside the signed-in app shell. */
  page: cx('bg-canvas', darkBackdrop),
  /** Background for public pages (landing, sign in, sign up). */
  marketing: cx(
    'bg-linear-to-br from-haze-100 via-haze-200 to-haze-300',
    'dark:from-dusk-900 dark:via-dusk-800 dark:to-dusk-700'
  ),
  /** Base colour of cards, panels and overlays. */
  base: 'bg-surface',
  /** Recessed area inside a surface. */
  muted: 'bg-surface-muted',
  /** Hover state for rows and list items. */
  hover: 'hover:bg-surface-hover',
  /** Default border colour (combine with `border`). */
  border: 'border-line',
  /** Horizontal rule between sections of a surface. */
  divider: 'border-t border-line',
};

/* =============================================================================
 * Status tones
 * -----------------------------------------------------------------------------
 * A tone bundles a soft background, a readable foreground and a ring colour.
 * Use with `badge`, icon tiles or any element that needs semantic colour.
 * ========================================================================== */
export const tone = {
  accent: 'bg-accent-soft text-accent ring-accent-line',
  success: 'bg-success-soft text-success ring-success-line',
  warning: 'bg-warning-soft text-warning ring-warning-line',
  danger: 'bg-danger-soft text-danger ring-danger-line',
  info: 'bg-info-soft text-info ring-info-line',
  caution: 'bg-caution-soft text-caution ring-caution-line',
  violet: 'bg-violet-soft text-violet ring-violet-line',
  neutral: 'bg-neutral-soft text-neutral ring-neutral-line',
};

export type Tone = keyof typeof tone;

/** Solid version of each tone, for dots, bars and indicators. */
export const toneSolid: Record<Tone, string> = {
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
  caution: 'bg-caution',
  violet: 'bg-violet',
  neutral: 'bg-neutral',
};

/** Coloured left border, used by feature cards. */
export const toneBorder: Record<Tone, string> = {
  accent: 'border-accent',
  success: 'border-success',
  warning: 'border-warning',
  danger: 'border-danger',
  info: 'border-info',
  caution: 'border-caution',
  violet: 'border-violet',
  neutral: 'border-neutral',
};

/** Project / employee status (lower-cased API value) -> tone. */
export const statusTone: Record<string, Tone> = {
  'on track': 'success',
  completed: 'accent',
  'at risk': 'caution',
  'on notice': 'caution',
  active: 'success',
  dead: 'neutral',
  support: 'violet',
};

/** Review reason (lower-cased API value) -> tone. */
export const reviewTone: Record<string, Tone> = {
  'low rating': 'caution',
  'low attendance': 'warning',
  'on notice': 'danger',
  'low satisfaction': 'violet',
};

/* =============================================================================
 * Badges & pills
 * ========================================================================== */
export const badge = {
  /** Small rounded label; combine with a `tone` entry. */
  base: 'inline-flex items-center gap-1 shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 md:px-2.5 text-[10px] md:text-xs font-semibold ring-1 ring-inset',
  /** Count bubble on top of an icon button. */
  counter:
    'absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-brand-600 text-white text-[10px] font-semibold leading-4 text-center tabular-nums',
  /** Count bubble in an alert colour (notifications). */
  counterAlert:
    'absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] leading-4 text-center tabular-nums',
};

/** Builds a badge class for a tone, e.g. `toneBadge('success')`. */
export const toneBadge = (name: Tone) => cx(badge.base, tone[name]);

/* =============================================================================
 * Buttons
 * ========================================================================== */
const buttonBase =
  'inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1 focus-visible:ring-offset-surface';

const buttonVariant = {
  primary:
    'bg-brand-600 text-white font-semibold shadow-sm hover:bg-brand-700 disabled:bg-skeleton disabled:text-ink-subtle disabled:shadow-none disabled:hover:bg-skeleton',
  secondary:
    'border border-line bg-surface text-ink-secondary hover:bg-surface-hover disabled:opacity-50 disabled:hover:bg-surface',
  ghost: 'text-ink-subtle hover:bg-surface-hover hover:text-ink-secondary',
};

export const button = {
  /** Main call to action. */
  primary: cx(buttonBase, 'h-10 px-4', buttonVariant.primary),
  /** Smaller primary action inside forms. */
  primarySm: cx(
    buttonBase,
    'h-9 px-3 text-xs sm:text-sm',
    buttonVariant.primary
  ),
  /** Large primary action used on public pages and auth forms. */
  primaryLg: cx(buttonBase, 'h-11 px-6', buttonVariant.primary),
  /** Neutral outlined action. */
  secondary: cx(buttonBase, 'h-10 px-4', buttonVariant.secondary),
  /** Large outlined action used on public pages. */
  secondaryLg: cx(buttonBase, 'h-11 px-6', buttonVariant.secondary),
  /** Square icon-only button (close, menu ...). */
  icon: cx(buttonBase, 'h-8 w-8 shrink-0', buttonVariant.ghost),
  /** Toolbar button: outlined, fixed height, optional label. */
  toolbar: cx(buttonBase, 'h-10 min-w-10 px-2.5', buttonVariant.secondary),
  /** Toolbar primary action. */
  toolbarPrimary: cx(
    buttonBase,
    'h-10 min-w-10 px-2.5 md:px-3.5',
    buttonVariant.primary
  ),
  /**
   * Add to a primary button while a request is in flight: it stays brand
   * coloured (lighter) so the white spinner remains visible.
   */
  loading: 'disabled:bg-brand-400! disabled:text-white!',
  /** Inline text link styled as a button. */
  link: 'inline-flex items-center gap-1 text-xs font-medium cursor-pointer transition-colors text-accent hover:underline underline-offset-4',
  /** Larger inline text link. */
  linkMd:
    'inline-flex items-center gap-1 text-sm font-medium cursor-pointer transition-colors text-accent hover:underline underline-offset-4',
  /** Destructive text action (clear, delete). */
  dangerLink:
    'inline-flex items-center gap-1 text-sm font-semibold cursor-pointer transition-colors text-danger hover:underline underline-offset-4',
};

/* =============================================================================
 * Form controls
 * ========================================================================== */
export const form = {
  /** Text input, select and textarea. */
  input:
    'w-full rounded-lg px-3 py-2.5 text-sm bg-field border border-line text-ink placeholder:text-ink-subtle dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent focus:transition-all focus:duration-200',
  /** Appended to any control while it is disabled. */
  disabled:
    'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-surface-muted disabled:text-ink-subtle disabled:border-line',
  /** Compact select (e.g. rows-per-page). */
  selectCompact:
    'cursor-pointer px-2 py-1 rounded-lg border border-line bg-surface text-sm text-ink-secondary shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-600',
  /** `<option>` inside a compact select. */
  option: 'text-sm font-bold outline-none',
  /** Field label. */
  label: 'block mb-1.5 text-ink-muted text-xs font-medium',
  /** Upper-case field label used on auth forms. */
  labelCaps:
    'block mb-1.5 mt-1.5 text-ink-muted text-xs font-medium tracking-wide uppercase',
  /** Validation message below a field. */
  error: 'text-xs text-danger mt-1',
  /** Inline warning message. */
  warning: 'text-xs text-warning',
  /** Error panel for a failed submit. */
  alert:
    'rounded-lg border border-danger-line bg-danger-soft p-3 text-xs text-danger',
  checkbox: 'h-4 w-4 shrink-0 rounded border-line-strong accent-brand-600',
  radio: 'h-4 w-4 shrink-0 accent-brand-600',
  /** Wrapper for one label + control pair. */
  field: 'flex flex-col',
  /** Responsive two-column field grid. */
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
};

/* =============================================================================
 * Chips & tags
 * ========================================================================== */
export const chip = {
  /** Selectable chip shell; add `idle` or `active`. */
  base: 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-colors cursor-pointer',
  idle: 'border-line bg-surface text-ink-secondary hover:border-line-strong hover:bg-surface-hover',
  active:
    'border-brand-600 bg-brand-600 text-white hover:bg-brand-700 hover:border-brand-700',
  /** Static tag (skills, priority ...). */
  tag: 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 bg-accent-soft text-accent ring-accent-line',
  /** Outlined suggestion chip (chat prompts). */
  suggestion:
    'cursor-pointer rounded-full border border-accent-line px-3 py-1.5 text-xs text-ink-secondary transition-colors hover:border-accent hover:text-ink',
};

/* =============================================================================
 * Icons
 * ========================================================================== */
export const icon = {
  /** Interactive / highlighted icon. */
  active: 'text-accent',
  /** Disabled or de-emphasised icon. */
  muted: 'text-ink-subtle',
  /** Rating star. */
  rating: 'text-amber-400',
  /** Decorative icon in card headers. */
  highlight: 'text-amber-500 dark:text-amber-400',
  /** Small square tile behind an icon; combine with a `tone` entry. */
  tile: 'shrink-0 rounded-lg flex items-center justify-center',
};

/* =============================================================================
 * Avatars
 * ========================================================================== */
export const avatar = {
  /** Circle with initials. Size it with h-* / w-*. */
  base: 'shrink-0 rounded-full flex items-center justify-center font-semibold text-white',
  /** Brand-filled avatar. */
  brand: 'bg-brand-600 text-white',
  /** Soft brand avatar. */
  soft: 'bg-accent-soft text-accent',
  /** Rotating gradients for lists of people. */
  gradients: [
    'bg-linear-to-br from-pink-400 to-rose-500',
    'bg-linear-to-br from-brand-400 to-violet-500',
    'bg-linear-to-br from-emerald-400 to-teal-500',
    'bg-linear-to-br from-amber-400 to-orange-500',
    'bg-linear-to-br from-sky-400 to-blue-500',
  ],
  /** Large profile picture frame. */
  frame: 'rounded-full overflow-hidden ring-2 ring-line shadow-md',
};

/** Gradient for the n-th avatar in a list. */
export const avatarGradient = (index: number) =>
  avatar.gradients[index % avatar.gradients.length];

/* =============================================================================
 * Cards
 * ========================================================================== */
export const card = {
  /** Standard bordered surface. */
  base: 'rounded-xl border bg-surface border-line',
  /** Recessed card inside another surface. */
  muted: 'rounded-xl border p-4 bg-surface-muted border-line',
  /** Dashboard widget shell. */
  panel:
    'h-full rounded-2xl border border-line bg-surface shadow-sm flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-lg',
  /** Chart widget shell (adds padding and spacing). */
  chart:
    'overflow-hidden rounded-2xl border border-line bg-surface shadow-sm p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5',
  /** Small metric tile on the dashboard. */
  metric:
    'min-w-0 rounded-xl p-3 xl:p-4 flex flex-col gap-2.5 xl:gap-3 border border-line bg-surface transition-colors duration-200 hover:border-line-strong',
  /** Widget header row. */
  header:
    'flex items-center justify-between gap-3 px-4 xl:px-5 py-3.5 border-b border-line-subtle',
  /** Widget title. */
  title: 'text-sm xl:text-base font-semibold text-ink truncate',
  /** Divided list inside a widget. */
  list: 'flex-1 flex flex-col divide-y divide-line-subtle',
  /** Clickable row inside a widget list. */
  listRow:
    'flex items-center gap-2.5 xl:gap-3 min-w-0 px-4 xl:px-5 py-2.5 transition-colors hover:bg-surface-hover',
  /** Primary line of a list row. */
  rowTitle: 'text-sm font-medium text-ink truncate',
  /** Secondary line of a list row. */
  rowSubtitle: 'text-xs text-ink-muted truncate',
  /** Login / sign-up card. */
  auth: 'rounded-2xl border shadow-2xl p-4 md:p-8 w-full max-w-md bg-brand-50 border-brand-200 shadow-brand-900/20 dark:bg-dusk-600 dark:border-violet-600/20 dark:shadow-dusk-700/60',
  /** Expandable section card (accordion). */
  accordion:
    'rounded-2xl border border-line bg-surface-muted p-3 flex flex-col gap-3 shadow-sm',
};

/* =============================================================================
 * Data tables
 * -----------------------------------------------------------------------------
 * Row and header backgrounds are opaque so sticky columns never show the
 * content scrolling underneath them.
 * ========================================================================== */
export const table = {
  /** Outer card that holds title, toolbar, table and pagination. */
  container:
    'min-w-0 rounded-2xl border border-line bg-surface shadow-sm overflow-hidden',
  /** Title shown above the toolbar. */
  title:
    'flex flex-row min-w-0 items-center gap-2 text-base xl:text-lg font-semibold text-ink',
  /** Toolbar / pagination bands. */
  band: 'border-line-subtle',
  headRow: 'bg-surface-muted',
  headCell:
    'px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap select-none text-ink-muted border-b border-line',
  /** Header text colour while that column is the active sort. */
  headCellSorted: 'text-accent',
  cell: 'px-4 py-3 text-sm whitespace-nowrap text-ink-secondary border-b border-line-subtle',
  row: 'bg-surface hover:bg-surface-hover',
  rowSelected: 'bg-accent-soft',
  /** Hairline on the right edge of the last sticky column. */
  stickyEdge: 'shadow-[inset_-1px_0_0_var(--line)]',
  /** Sort indicator icon when the column is not sorted. */
  sortIdle: 'text-ink-subtle',
  /** Sort indicator icon on the active column. */
  sortActive: 'text-accent',
  /** Card used for each row on small screens. */
  mobileCard:
    'min-w-0 rounded-xl border bg-surface p-4 max-xs:p-3 shadow-sm transition-colors',
  mobileCardIdle: 'border-line',
  mobileCardSelected: 'border-brand-600 ring-1 ring-brand-600',
  /** Field label inside a mobile card. */
  mobileLabel:
    'text-[11px] font-medium uppercase tracking-wide text-ink-subtle truncate',
  mobileValue: 'text-sm text-ink',
};

/* =============================================================================
 * Empty states
 * ========================================================================== */
export const emptyState = {
  wrapper: 'flex flex-col items-center justify-center gap-3 text-center',
  icon: 'flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-ink-subtle',
  title: 'text-sm font-semibold text-ink',
  description: 'mt-1 text-xs text-ink-muted',
};

/* =============================================================================
 * Overlays: dialogs, bottom sheets, side drawers, dropdowns
 * ========================================================================== */
const overlayShell =
  'fixed z-300 flex flex-col border shadow-2xl bg-surface border-line text-ink';

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
  /** Grab handle at the top of bottom sheets. */
  handle: 'mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-line-strong',
  header:
    'flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 shrink-0 border-b border-line',
  /** Header that stays visible while a drawer scrolls. */
  stickyHeader:
    'sticky top-0 z-10 flex items-start justify-between gap-3 px-4 sm:px-5 py-4 border-b bg-surface border-line',
  title: 'text-base font-semibold truncate text-ink',
  subtitle: 'text-xs sm:text-sm mt-0.5 text-ink-muted',
  body: 'flex-1 min-h-0 overflow-y-auto',
  footer:
    'flex items-center justify-between gap-3 px-4 sm:px-5 py-3 shrink-0 border-t border-line',
  /** Footer that stays visible at the bottom of a scrolling drawer. */
  stickyFooter:
    'sticky bottom-0 z-10 flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t bg-surface border-line',
  /** Dimmed backdrop behind an overlay. */
  backdrop:
    'fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ease-linear',
  /**
   * Wrapper around a dropdown trigger. Positioned only from `sm` up, so on
   * phones the menu is placed against the nearest positioned ancestor (the
   * app header) instead of the small trigger button.
   */
  dropdownAnchor: 'sm:relative',
  /**
   * Floating menu. Phones: spans the header width with a small gutter so it
   * never leaves the screen. `sm` and up: 18rem panel under the trigger.
   */
  dropdown:
    'absolute z-50 top-full left-2 right-2 mt-1 max-h-[70vh] overflow-y-auto rounded-lg border border-line bg-surface shadow-lg sm:left-auto sm:right-0 sm:mt-2 sm:w-72 sm:max-h-80',
  /** Heading row inside a dropdown. */
  dropdownHeader:
    'px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink-muted border-b border-line',
};

/* =============================================================================
 * Sections inside forms and detail views
 * ========================================================================== */
export const section = {
  wrapper: 'px-4 sm:px-5 py-5',
  heading: 'flex items-center gap-2 mb-4',
  /** Brand-coloured bar before a section title. */
  accent: 'w-1 h-4 rounded-full shrink-0 bg-brand-600',
  title: 'text-sm xl:text-base font-semibold text-ink',
  divider: 'border-t border-line',
};

/* =============================================================================
 * App shell
 * ========================================================================== */
export const shell = {
  /** Top header bar; `relative` so dropdowns can anchor to it on phones. */
  header:
    'relative h-14 min-h-14 flex items-center sm:justify-start md:justify-between gap-3 pl-4 pr-14 md:px-5 bg-surface border-b border-line',
  /** Header title. */
  headerTitle:
    'font-semibold tracking-tight text-ink text-base md:text-xl truncate',
  /** Icon button in the header. */
  headerButton:
    'relative p-1.5 rounded-lg text-ink-secondary transition-colors hover:bg-surface-hover cursor-pointer',
  /** Page title block on content pages. */
  pageTitle: 'text-base xl:text-xl font-semibold text-ink',
  pageSubtitle: 'text-xs xl:text-sm text-ink-muted mt-0.5',
};

/* =============================================================================
 * Public (marketing) pages
 * ========================================================================== */
export const marketing = {
  /** Centred content column for a page section. */
  section: 'mx-auto max-w-5xl px-4 sm:px-6',
  /** Small upper-case pill above a heading. */
  eyebrow:
    'inline-block text-xs font-medium tracking-wide uppercase text-accent bg-accent-soft px-3 py-1 rounded-full',
  /** Section heading. */
  heading: 'text-2xl sm:text-3xl font-bold tracking-tight text-ink',
  /** Paragraph under a section heading. */
  lead: 'mt-2 text-sm sm:text-base text-ink-secondary',
  /** Icon + text card used by every feature grid on the landing page. */
  featureCard:
    'flex gap-4 rounded-xl border border-line bg-surface p-5 shadow-sm',
  /** Tinted square holding a feature icon; combine with a `tone` entry. */
  featureIcon: 'shrink-0 h-10 w-10 rounded-lg flex items-center justify-center',
  featureTitle: 'font-semibold mb-1 text-ink',
  featureText: 'text-sm text-ink-secondary',
  /** Technology chip. */
  techChip:
    'inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-secondary',
  /** Page footer. */
  footer: 'border-t border-line bg-surface/60 backdrop-blur-sm',
  /** Muted link in the footer. */
  footerLink:
    'inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink',
  /** "Back" link pinned to the top-left corner of auth pages (compact on phones). */
  backLink:
    'absolute top-3 left-3 sm:top-4 sm:left-4 z-20 inline-flex items-center gap-1 sm:gap-1.5 h-7 sm:h-9 px-2 sm:px-3 rounded-md sm:rounded-lg border border-line bg-surface/70 backdrop-blur-sm text-xs sm:text-sm font-medium text-ink-secondary shadow-sm transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
  /** Small round chip behind a social logo (logos are black SVGs). */
  socialIcon: 'h-6 w-6 p-1 rounded-md bg-white ring-1 ring-line',
};

/**
 * Sidebar navigation. The sidebar is dark in both themes, so these recipes
 * use fixed slate shades instead of the theme-aware tokens.
 */
export const sidebar = {
  container:
    'bg-slate-900 text-white border-r border-slate-800 dark:bg-slate-950',
  section: 'border-slate-800',
  brandTitle: 'font-semibold tracking-tight text-white text-base md:text-lg',
  brandSubtitle: 'text-slate-400 text-[11px] md:text-xs mt-0.5',
  link: 'flex w-full items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors duration-150',
  linkActive: 'bg-brand-600 text-white',
  linkIdle: 'text-slate-400 hover:bg-slate-800 hover:text-white',
  footerText: 'text-[11px] text-slate-500',
  overlay: 'fixed inset-0 bg-slate-900/60 z-10 lg:z-0 md:hidden',
};

/* =============================================================================
 * Loading placeholders
 * ========================================================================== */
export const skeleton = {
  /** Pulsing placeholder block. Size it with h-* / w-*. */
  block: 'animate-pulse rounded-md bg-skeleton',
  /** Placeholder colour without animation (parent already pulses). */
  fill: 'bg-skeleton',
};

/* =============================================================================
 * Raw colour values
 * -----------------------------------------------------------------------------
 * For APIs that need a real colour string rather than a class name
 * (charts, spinners, inline SVG). Keep in sync with index.css.
 * ========================================================================== */
export const palette = {
  brand: '#534ab7',
  brandLight: '#a7a1e3',
  white: '#ffffff',
};

/** Theme name as stored by `useTheme` ('light' or 'dark'). */
type ThemeMode = string;

/** Categorical series colours shared by all charts. */
const chartSeries = [
  '#534ab7',
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#f43f5e',
  '#8b5cf6',
];

/**
 * Chart colours and Recharts tooltip styles for the active theme mode.
 * Usage: `const chart = chartTheme(theme)` (theme from `useTheme`).
 */
export function chartTheme(mode: ThemeMode) {
  const isDark = mode === 'dark';
  const ink = isDark ? '#f1f5f9' : '#0f172a';
  const inkMuted = isDark ? '#94a3b8' : '#64748b';

  return {
    series: chartSeries,
    /** Main single-series colour. */
    primary: isDark ? '#7f77dd' : '#534ab7',
    /** Project-status colours used by the donut chart. */
    status: {
      active: '#10b981',
      support: '#f59e0b',
      completed: isDark ? '#7f77dd' : '#534ab7',
    },
    text: ink,
    textMuted: inkMuted,
    grid: isDark ? '#27304d' : '#e2e8f0',
    tooltip: {
      contentStyle: {
        backgroundColor: isDark ? '#151b32' : '#ffffff',
        border: `1px solid ${isDark ? '#27304d' : '#e2e8f0'}`,
        borderRadius: '8px',
        padding: '10px 14px',
        boxShadow:
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      labelStyle: {
        fontWeight: 600,
        color: ink,
        fontSize: '12px',
        marginBottom: '4px',
        letterSpacing: '0.05em',
      },
      itemStyle: {
        fontSize: '12px',
        padding: '3px 0',
        color: inkMuted,
      },
    },
  };
}
